const { all } = require('express/lib/application');
const multer = require('multer');
const router = require("express").Router();
const usersModel = require("../models/users");
var uniqid = require('uniqid');
var fs = require('fs');

var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_APISECRET,
});

const upload = multer();

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});


router.post('/addPicture', async function (req, res, next) {

  var token = await req.body.user[0];

  var imagePath = './tmp/' + uniqid() + '.jpg';

  var file = await req.files.file.mv(imagePath);

  var result = await cloudinary.uploader.upload(imagePath);

  var user = await usersModel.findOne({ token: token })

  user.pictures.push({
    url: result.url,
    desc: "",
    date: new Date,
    public_path: result.public_id,
  });

  var userSaved = await user.save();

  fs.unlinkSync(imagePath);

  if (userSaved) {
    res.json({ data: userSaved, result: true });
  } else {
    res.json({ result: false })
  }

});

router.get('/allUserPictures', async function (req, res, next) {
  let allPictures = await usersModel.find({ token: req.query.token });
  
  if (allPictures) {
    res.json({ allPictures: allPictures, result: true });
  }
});

router.get('/allPictures', async function (req, res, next) {
  let allPictures = await usersModel.find();

  if (allPictures) {
    res.json({ allPictures: allPictures })
  }
})

router.delete('/deletePicture', async function (req, res, next) {

  var user = await usersModel.findOne({ token: req.query.token });

  var index = req.query.index;

  //Supprimer photo dans cloudinary grâce à son index
  await cloudinary.uploader.destroy(user.pictures[index].public_path);

  user.pictures.pull({ _id: req.query.id });

  var userSaved = await user.save();

  if (userSaved) {
    res.json({ result: true })
  }
});

router.post('/addDescription', async function (req, res, next) {

  var user = await usersModel.updateOne(
    { token: req.body.token },
    {
      $set:
      {
        [`pictures.${req.body.id}.desc`]: req.body.desc,
      }
    }
  );

  if (user.modifiedCount !== 0) {
    res.json({ result: user })
  }
})


module.exports = router;