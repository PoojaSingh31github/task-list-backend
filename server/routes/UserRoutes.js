const express= require('express');
const mongoose=require('mongoose');
const { Signup, signin } = require('../controller/UserRoutes');
const router= express.Router();

router.post('/signup',Signup);
router.post('/signin',signin);

module.exports= router;