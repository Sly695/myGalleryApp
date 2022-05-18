const router = require("express").Router();
const usersModel = require("../models/users");
const multer = require('multer');
let bcrypt = require('bcrypt');
let uid2 = require('uid2');
var cloudinary = require('cloudinary').v2;

const upload = multer()

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signup", async (req, res) => {

  let error = [];
  let result = false;
  let hash = bcrypt.hashSync(req.body.password, 10);

  let data = await usersModel.findOne({
    email: req.body.email,
  });

  if (data != null) {
    error.push("Utilisateur déjà présent");
  }

  if (
    req.body.username == "" ||
    req.body.email == "" ||
    req.body.password == ""
  ) {
    error.push("Champs vides");
  }

  if (error.length == 0) {
    let newUser = new usersModel({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      token: uid2(32),
      date_inscription: new Date,
      pictures: [],
      avatar: [],
    });

    var userSaved = await newUser.save();

    if (userSaved) {
      result = true;
    }
  }

  res.json({ userSaved, result, error });

});

router.post("/signin", async (req, res) => {

  let error = [];
  let user = "";
  let result = false;

  if (req.body.email == "" || req.body.password == "") {
    error.push("Champs vides");
  }

  if (error.length == 0) {
    user = await usersModel.findOne({
      email: req.body.email,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        result = true;
      } else {
        result = false;
        error.push("Mot de passe incorrect");
      }
    } else {
      error.push("Email incorrect");
    }

  };

  res.json({ error, user, result })
})

router.get('/avatar', async (req, res, next) => {

  const token = req.query.token;

  var user = await usersModel.findOne({ token: token })

  if (user.avatar.length === 0) {
    res.json({ result: false })
  } else {
    res.json({ result: true, response: user.avatar })
  }

})

router.post('/deleteUser', async (req, res, next) => {
  const token = req.body.token;

  const userFind = await usersModel.findOne({token : token})


  //Supprimer les photos du cloudinary
  for(var i = 0; i < userFind.pictures.length; i++){
    await cloudinary.uploader.destroy(userFind.pictures[i].public_path);  
  }

  //Supprimer le user en base de données
  const user = await usersModel.deleteOne({ token: token });

  if (user.deletedCount > 0) {
    res.json({ result: true });
  }

})

router.post('/updateUser', async (req, res, next) => {

  var file = "";
  var pseudo = await req.body.user[0];
  var email = await req.body.user[1];
  var token = await req.body.user[2];

  const userSaved = await usersModel.findOne({ token : token });

  if (pseudo == "") {
    pseudo = userSaved.username;
  }
  
  if (email == "") {
    email = userSaved.email;
  }
  
  if(req.body.file) {
    file = userSaved.avatar;
  } else {
    file = await req.files.file;
  }

  const user = await usersModel.updateOne(
    {
      token: token,
    },
    {
      username: pseudo,
      email: email,
      avatar: file,
    }
  )

  if (user.modifiedCount > 0) {
    res.json({ result: true, userSaved, req : req.body})
  } else if (user.modifiedCount === 0) {
    res.json({ result: true, userSaved, req : req.body})
  }

  if(req.body.file === null ){

  }

})


module.exports = router;