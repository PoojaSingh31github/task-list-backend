const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const UserModel = require('../model/UserModel')

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;
    // bearer bmkhvdfgkdsz 
    if (!authorization) {
        return res.status(401).json({ error: "User not logged in" });
    }
    const token = authorization.replace("bearer ", "");
    try {
        const payload = await jwt.verify(token, process.env.JWT_SECRET);
        const { _id } = payload;
        const dbUser = await UserModel.findById(_id);
        if (!dbUser) {
            return res.status(404).json({ error: "User not found" });
        }
        req.user = dbUser;
        next();
    } catch (error) {
        return res.status(401).json({ error: "User not logged in" });
    }
};