const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const { validateNotificationCreate } = require('../middlewares/notificationValidation.middleware');

router.get('/', notificationController.getAllNotifications);
router.post('/', validateNotificationCreate, notificationController.createNotification);
router.get('/:id', notificationController.getNotificationById);
router.delete('/:id', notificationController.deleteNotification);
router.patch('/:id/read', notificationController.markAsReadAction);
router.get('/user/:userId', notificationController.getUserNotifications);

module.exports = router;
