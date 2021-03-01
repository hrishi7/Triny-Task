const { sessionPath, sessionClient } = require("../config/dialogflowConfig");

exports.getIntroMessageToUser = async (req, res, next) => {
  try {
    res
      .status(200)
      .json({ success: true, message: "Hi I am the Bot, Can i Help You?" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

exports.sendMessageToBot = async (req, res, next) => {
  try {
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.message,
          // The language used by the client (en-US)
          languageCode: "en-US",
        },
      },
    };

    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    // console.log("Detected intent");
    const result = responses[0].queryResult;
    // console.log(`  Query: ${result.queryText}`);
    // console.log(`  Response: ${result.fulfillmentText}`);
    res.status(200).json({
      success: true,
      message: `${result.fulfillmentText}`,
    });
    // if (result.intent) {
    //   console.log(`  Intent: ${result.intent.displayName}`);
    // } else {
    //   console.log(`  No intent matched.`);
    // }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
