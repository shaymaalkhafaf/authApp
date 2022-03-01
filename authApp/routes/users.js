var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Sequelize = require('sequelize');
const { User } = require('../models');

/* GET users listing. */
router.get('/', async function(req, res, next) {
res.render("index");
// const users = await User.findAll();
// res.json(users);
});

router.post('/', (req, res, next) => {
  const password = "hello"
  const saltRounds = bcrypt.genSaltSync(5);
  const hash = bcrypt.hashSync(password, saltRounds);

  console.log("my password", password);
  console.log("my hashed password", hash);

  // bcrypt.hash(password, saltRounds,(err, hash) => {

  // });
  res.send("user add")
})

router.post('/register',async (req, res, next) => {
  let {username, password, email } = req.body;
  const saltRounds = bcrypt.genSaltSync(5);
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  console.log(username, email, password);

  const newUser = await User.create({
    username: username,
    password: hashedPassword,
    email: email
  });

  res.json({
    id: newUser.id
  });
});






router.post('/login', async (req, res, next) => {
// const password = "glitter";
// const wrongPassword = "not glitter";
const {username, password} = req.body

const saltRounds = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(password, saltRounds);
const comparePass = bcrypt.compareSync(password, hash);

const users = await User.findOne({
  where: {
    username: username
  }
});

res.json(users);
console.log(users)
})

module.exports = router;
