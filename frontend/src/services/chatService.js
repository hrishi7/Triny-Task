import { proxy } from "../proxy";
import axios from "axios";

export async function askQuestion(data) {
  try {
    let result = await axios.post(
      `${proxy}/api/dialogflow/send-message-to-bot`,
      data
    );
    return result.data;
  } catch (error) {
    return {
      success: false,
      message: "Message send Failed Due to Server error",
    };
  }
}

export async function getIntroMessage() {
  try {
    let result = await axios.get(`${proxy}/api/dialogflow/get-intro`);
    return result.data;
  } catch (error) {
    return {
      success: false,
      message: "Getting messages Failed Due to Server error",
    };
  }
}
