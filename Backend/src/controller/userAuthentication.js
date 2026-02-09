const User = require('../models/user');
const validator = require('../utils/validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//register
const register = async (req, res) => {
    try {
        //validation remaining
        // validator(req.body);
        const emailId = req.body.identity.auth.profile.emailId;
        const password = req.body.identity.auth.password;

        //hashing the password
        req.body.identity.auth.password = await bcrypt.hash(password, 10);

        //create userId
        const user = await User.create(req.body);
        const token = jwt.sign({ emailId }, process.env.Secret_Key, { expiresIn: 60 * 60 })

        // const reply

        res.cookie('token', token, { maxAge: 60 * 60 * 1000 });

        res.status(201).send("Registered Successfully");

    }
    catch (error) {
        res.status(401).send("Error: " + error.message);
    }
}

const login = async (req, res) => {
  try {
    const emailId = req.body.identity?.auth?.profile?.emailId;
    const password = req.body.identity?.auth?.password;

    if (!emailId || !password) { 
      throw new Error("Invalid Credentials");
    }

    const user = await User.findOne({
      "identity.auth.profile.emailId": emailId
    });

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const match = await bcrypt.compare(
      password,
      user.identity.auth.password
    );

    if (!match) {
      throw new Error("Invalid Credentials");
    }

    const token = jwt.sign(
      { emailId },
      process.env.Secret_Key,
      { expiresIn: 60 * 60 }
    );

    res.cookie("token", token, { maxAge: 60 * 60 * 1000 });
    res.status(200).send("Logged in successfully");

  } catch (error) {
    res.status(401).send("Error: " + error.message);
  }
};


const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            sameSite: "strict",
        });

        res.status(200).send("Logged out successfully");
    } catch (err) {
        res.status(503).send("Error occurred: " + err.message);
    }
};

module.exports = { register, login, logout };