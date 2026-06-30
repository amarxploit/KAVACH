const express = require('express');
const router = express.Router({ mergeParams: true });
const chatController = require('../controllers/chat.controller');
const { validateMessageSend, validateChatParticipant } = require('../middlewares/chatValidation.middleware');

router.get('/', validateChatParticipant, chatController.getMissionChat);
router.post('/', validateMessageSend, chatController.createMessage);
router.get('/:messageId', validateChatParticipant, chatController.getMessageById);
router.delete('/:messageId', validateChatParticipant, chatController.softDeleteMessage);

module.exports = router;
