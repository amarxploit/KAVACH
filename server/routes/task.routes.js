const express = require('express');
const router = express.Router({ mergeParams: true });
const taskController = require('../controllers/task.controller');
const { validateTaskCreate, validateTaskAction } = require('../middlewares/taskValidation.middleware');

router.get('/', taskController.getMissionTasks);
router.post('/', validateTaskCreate, taskController.createTask);
router.get('/:taskId', taskController.getTaskById);
router.patch('/:taskId', validateTaskAction, taskController.updateTask);
router.delete('/:taskId', validateTaskAction, taskController.deleteTask);
router.post('/:taskId/start', validateTaskAction, taskController.startTaskAction);
router.post('/:taskId/complete', validateTaskAction, taskController.completeTaskAction);

module.exports = router;
