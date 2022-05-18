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
    like: 0,
  });

  var userSaved = await user.save();



  if (userSaved) {
    fs.unlinkSync(imagePath);
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
    res.json({ allPictures: allPictures})
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

router.get('/likePicture', async (req, res, next) => {

  let token = req.query.token;
  let idPicture = req.query.idPicture;

  //L'utilisateur connecté susceptible de liké
  let user = await usersModel.findOne({ token: token });
  //Tout les users
  let allUser = await usersModel.find();
  
  //Boucler pour trouver l'ID du propriétaire de la photo liké
  let userPictureIdFound = "";

  for (let i = 0; i < allUser.length; i++) {
    for (let j = 0; j < allUser[i].pictures.length; j++) {
      if (allUser[i].pictures[j]._id.toString() === idPicture) {
        userPictureIdFound = allUser[i]
      }
    }
  }


  //User de la photo liké
  let userPicture = await usersModel.findOne({ _id: userPictureIdFound })
  //Photo liké
  let pictureLiked = userPictureIdFound.pictures.find(pic => pic._id.toString() === idPicture);
  //Nombre de likes de la photo liké
  let numberLikes = pictureLiked.like;

  // est-ce l'id est présent dans les photos 
  const idFound = user.picturesLiked.find(id => id === idPicture)

  //si l'id est pas trouvé
  if (!idFound) {

    //Ajouter l'id
    let indexPictureLiked = userPicture.pictures.indexOf(pictureLiked.toString());
    user.picturesLiked.push(idPicture);
    numberLikes = numberLikes + 1;

    let userPictureLiked = await usersModel.updateOne(
      {
        _id: userPictureIdFound._id
      },
      {
        $set:
        {
          [`pictures.${indexPictureLiked}.like`]: numberLikes,
        }
      }
    );
  } else {

    let indexPictureLiked = userPicture.pictures.indexOf(pictureLiked.toString());
    //Supprimé l'id de la photo
    numberLikes = numberLikes - 1;
    var index = user.picturesLiked.indexOf(idFound);
    user.picturesLiked.splice(index, 1);

    let userPictureLiked = await usersModel.updateOne(
      {
        _id: userPictureIdFound._id
      },
      {
        $set:
        {
          [`pictures.${indexPictureLiked}.like`]: numberLikes,
        }
      }
    );
  }

  var userSaved = await user.save();

  res.json({ result: true, picturesLiked: userSaved.picturesLiked })
})

router.get('/allPicturesLiked', async (req, res, next) => {
  var user = await usersModel.findOne({ token: req.query.token });

  if (user) {
    res.json({ result: true, allPicturesLiked: user.picturesLiked })
  };
})

module.exports = router;
