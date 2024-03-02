const TaskModel = require('../model/TaskModel');
exports.addTask = async (req, res) => {
    try {
        const { title, description, dueDate } = req.body;
        const TitleinDB = await TaskModel.findOne({ title: title });
        if (TitleinDB) {
            return res.status(500).json({ error: "Task with this title is already added" });
        } else {
            const newTask = new TaskModel({
                title,
                description,
                dueDate,
            });

            const data = await newTask.save();
            res.status(201).json({ message: 'Task added successfully', data });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.GetTask = async (req, res) => {
    try {
        const task = await TaskModel.find();
        res.status(200).json(task);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}
exports.updateTask = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { title, description, dueDate } = req.body;

    // Find the task by ID
    const taskToUpdate = await TaskModel.findByIdAndUpdate({_id:taskId}, {title, description, dueDate}, {new: true});

    if (!taskToUpdate) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', data: taskToUpdate });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}

exports.DeleteTask = async (req, res) => {
    try {
        const taskId = req.params.id;

        // Find the task by ID and remove it
        const deletedTask = await TaskModel.findByIdAndDelete(taskId);
    
        if (!deletedTask) {
          return res.status(404).json({ error: 'Task not found' });
        }
    
        res.json({ message: 'Task deleted successfully', data: deletedTask });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });

    }
}
