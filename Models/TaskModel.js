const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskTitle: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    dueDate: { type: String, required: true, trim: true },
    completed: { type:Boolean },
    userId: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

const TaskModel = mongoose.model("Tasks", TaskSchema);
module.exports = TaskModel;