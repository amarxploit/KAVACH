const taskRepo = require('../repositories/task.repository');

const getMissionTasks = async (req, res) => {
    try {
        const data = await taskRepo.getByMissionId(req.params.missionId);
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const getTaskById = async (req, res) => {
    try {
        const data = await taskRepo.getById(req.params.taskId);
        if (!data) return res.status(404).json({ success: false, message: "Task not found." });
        res.status(200).json({ success: true, data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const createTask = async (req, res) => {
    try {
        const data = await taskRepo.create(req.params.missionId, req.body);
        res.status(201).json({ success: true, message: "Task assigned.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const updateTask = async (req, res) => {
    try {
        const data = await taskRepo.update(req.params.taskId, req.body);
        if (!data) return res.status(404).json({ success: false, message: "Task not found." });
        res.status(200).json({ success: true, message: "Task updated.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const startTaskAction = async (req, res) => {
    try {
        const data = await taskRepo.startTask(req.params.taskId);
        res.status(200).json({ success: true, message: "Task started.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const completeTaskAction = async (req, res) => {
    try {
        const data = await taskRepo.completeTask(req.params.taskId);
        res.status(200).json({ success: true, message: "Task completed.", data });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const success = await taskRepo.delete(req.params.taskId);
        if (!success) return res.status(404).json({ success: false, message: "Task not found." });
        res.status(200).json({ success: true, message: "Task deleted." });
    } catch (e) {
        res.status(500).json({ success: false, error: e.message });
    }
};

module.exports = { getMissionTasks, getTaskById, createTask, updateTask, startTaskAction, completeTaskAction, deleteTask };
