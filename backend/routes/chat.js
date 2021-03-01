const router = require("express").Router();
const {
  getIntroMessageToUser,
  sendMessageToBot,
} = require("../controllers/chat");

const { validateOnSendMessage } = require("./validation/chat");

/**
 * @description   this route is used to get Introduction Message to User
 * @route   GET      /api/dialogflow/get-intro
 * @access  Public
 */

router.get("/get-intro", getIntroMessageToUser);

/**
 * @description   this route is used to send message from user to the bot
 * @route   POST      /api/dialogflow/send-message-to-bot
 * @access  Public
 */
router.post("/send-message-to-bot", validateOnSendMessage, sendMessageToBot);

module.exports = router;
