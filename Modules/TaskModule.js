const TaskModel = require('../Models/TaskModel');
const { ObjectId } = require('mongodb');
module.exports.addTask = async (req, res) => {
    try {
        const task = await new TaskModel({
            taskTitle: req.body.taskTitle,
            description: req.body.description,
            dueDate: req.body.dueDate,
            userId: req.body.currentUser._id,
            completed: req.body.completed
        })
        await task.save();
        return res.status(200).send({ msg: "task Details added successfully" });
    } catch (error) {
        console.error("Error in adding task", error);
        return res.status(400).send({ msg: "can't able to add the task Details" })
    }
}

module.exports.getTasks = async (req, res) => {
    try {

        const allTasks = await TaskModel.find({ userId: req.body.currentUser._id });
        return res.status(200).send(allTasks)
    } catch (error) {
        console.error("error in geting products", error);
        return res.status(400).send({ msg: "can't able to get the products" })
    }
}

module.exports.updateTask = async (req, res) => {
    try {
       
        const updated = await TaskModel.findByIdAndUpdate(req.params.id, { ...req.body,updatedAt:Date.now(),completed:req.body.completed })
        if (updated) {
            return res.status(200).json({ updated });
        }

    } catch (error) {
        console.error("error in Updating products", error);
        return res.status(400).send({ msg: "can't able to update the products" })
    }
};

module.exports.deleteTask = async (req, res) => {
    try {
        const isValid = ObjectId.isValid(req.params.id);

        if (isValid) {
            const remove = await TaskModel.deleteOne({ _id: new ObjectId(req.params.id) });
            if (remove) {
                return res.status(200).json({ remove });
            }
        }
        return res.status(404).send({ msg: "can't able to delete" })
    } catch (error) {
        console.error("error in deleting task", error);
        return res.status(400).send({ msg: "can't able to delete the task" })
    }
}

module.exports.getById = async(req,res)=>{
    try {
        const isValid = ObjectId.isValid(req.body.id);
        if(isValid){
          const singleTask = await TaskModel.find({_id:ObjectId(req.body.id)});
          if(singleTask){
            return res.status(200).json({singleTask})
          }
        }
        return res.status(404).send({msg:"can't able get that Task"})
    } catch (error) {
        console.error("error in getting that task", error);
        return res.status(400).send({ msg: "error in getting that particular task" }) 
    }

}