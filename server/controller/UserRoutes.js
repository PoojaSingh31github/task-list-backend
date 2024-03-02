const UserModel = require('../model/UserModel')
const jwt = require('jsonwebtoken');
const bcryptjs = require("bcryptjs");

exports.Signup = async (req, res) => {
    try {
      const { name, username, email, password, address } = req.body;
      if (!name || !username || !password || !email || !address) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
      }
  
      const userInDB = await UserModel.findOne({ email: email });
  
      if (userInDB) {
        return res.status(500).json({ error: "User with this email is already registered" });
      }
  
      const hashedpassword = await bcryptjs.hash(password, 10);
  
      const user = new UserModel({ name, username, email, password: hashedpassword, address });
      const newUser = await user.save();
  
      if (newUser) {
        return res.status(201).json({ result: "User Signed up successfully" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "User registration is failed" });
    }
  };
  
  exports.signin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!password || !email) {
        return res.status(400).json({ error: "One or more mandatory fields are empty" });
      }
  
      const userInDB = await UserModel.findOne({ email: email });
  
      if (!userInDB) {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
  
      const didMatch = await bcryptjs.compare(password, userInDB.password);
  
      if (didMatch) {
        const jwtToken = jwt.sign({ _id: userInDB._id }, process.env.JWT_SECRET);
        const userInfo = { "email": userInDB.email, "fullname": userInDB.fullname,"id": userInDB._id, "isadmin":userInDB.isAdmin };
  
        return res.status(200).json({ result: { token: jwtToken, user: userInfo, message: "user successfully login"} });
      } else {
        return res.status(401).json({ error: "Invalid Credentials" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Server Error" });
    }
  };