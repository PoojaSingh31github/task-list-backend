const express = require('express');
const mongoose = require('mongoose');
const { addTask, GetTask, updateTask, DeleteTask } = require('../controller/TaskController');
const router = express.Router();
const auth = require('../Middleware/protectedRoutes');

router.post('/addTask', auth, addTask);
router.get('/alltasks', GetTask);
router.put('/updateTask/:id', auth, updateTask);
router.delete('/deleteTask/:id', auth, DeleteTask);




module.exports = router;