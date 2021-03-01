exports.validateOnSendMessage = async (req, res, next) => {
  if (!req.body.message || req.body.message == "") {
    return res.status(400).json({
      success: false,
      message: "Message Can't be Empty",
    }); // Return error
  }

  next();
};
