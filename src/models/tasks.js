import mongoose from "mongoose";

let TaskModel;

// Skema untuk model 'Task'
const taskSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
    },
    deadline: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    note: {
        type: String,
        default: "",
    },
    teacher_id: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    },
});

// Pastikan bahwa model 'Task' belum ada sebelum membuatnya
try {
    // Jika model 'Task' sudah ada, gunakan model yang sudah ada
    TaskModel = mongoose.model("Task");
} catch (error) {
    // Jika model 'Task' belum ada, buat model baru
    TaskModel = mongoose.model("Task", taskSchema);
}

export default TaskModel;
