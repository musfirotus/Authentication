const { authors, posts, comments } = require("../models");
const { registerValidation } = require("../../validation");
const bcrypt = require("bcryptjs");

const response = {
  status: false,
  message: "",
  data: [],
};



class LoginController {

    static async login(req, res) {
        res.send('Login!');
    }

    static async register(req, res) {
      const { username, password, email, salt } = req.body;

      // validate before become author
      const { error } = registerValidation(req.body);
      if(error) return res.status(400).json(error.details[0].message)

      // Check if it existing author's email
      const emailExist = await authors.findOne({ where: { email: email } })

      // Check if it existing author's username
      const usernameExist = await authors.findOne({ where: { username: username } })

      // Hash passwords
      const salted = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salted);
      
      try {
        if (usernameExist) res.status(404).json('Username already exists')
        else if (emailExist) res.status(404).send('Email already exists')
        else {
          const savedAuthor = await authors.create({
            username, password, email, salt: hashedPassword
          });
          response.data = {
            Username: savedAuthor.username,
            Salt: savedAuthor.salt,
            Email: savedAuthor.email,
          };
          response.status = true;
          response.message = "Berhasil tambah data"
          res.status(201).json(response);
        }
      } catch (err) {
        res.status(400).send(err);
      }
    }
}

module.exports = LoginController;
