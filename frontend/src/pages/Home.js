import React, { useState, useEffect } from "react";
import Controls from "../components/controls/Controls";
import {
  Grid,
  Paper,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Form } from "../components/useForm";
import Notification from "../components/Notification";

import { askQuestion, getIntroMessage } from "../services/chatService";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(5),
  },
}));

export default function Home(props) {
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const classes = useStyles();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name == "message") {
      setMessage(value);
    }
  };

  const validate = () => {
    let temp = { ...errors };

    temp.message = message ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    return Object.values(temp).every((x) => x == "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let data = {
        message: message.trim(),
      };
      setLoading(true);
      let result = await askQuestion(data);
      setLoading(false);
      if (result.success) {
        setNotify({
          isOpen: true,
          message: result.message,
          type: "success",
        });
        let prevMessages = [...allMessages];
        prevMessages.push(message);
        prevMessages.push(result.message);
        setAllMessages(prevMessages);
        setMessage("");
      } else {
        setNotify({
          isOpen: true,
          message: result.message,
          type: "error",
        });
      }
    }
  };

  const resetForm = () => {
    setMessage("");
    setErrors({});
  };

  useEffect(async () => {
    let result = await getIntroMessage();
    console.log(result);
    if (result.success) {
      let prevMessages = [...allMessages];
      prevMessages.push(result.message);
      setAllMessages(prevMessages);
    } else {
      setNotify({
        isOpen: true,
        message: result.message,
        type: "error",
      });
    }
  }, []);

  return (
    <Paper className={classes.pageContent}>
      <Typography variant="h5">ChatBot</Typography>
      <Grid
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          width: "300px",
          backgroundColor: "yellow",
          overflowY: "scroll",
        }}
      ></Grid>
      <Form onSubmit={handleSubmit}>
        <Grid container>
          <Grid item xs={12}>
            <Controls.Input
              name="message"
              label="Write Here..*"
              value={message}
              onChange={handleInputChange}
              error={errors.message}
            />

            <div style={{ display: "flex", alignItems: "center" }}>
              {loading ? <CircularProgress size={20} /> : <></>}

              <Controls.Button type="submit" disabled={loading} text="Submit" />

              <Controls.Button
                text="Reset"
                disabled={loading}
                color="default"
                onClick={resetForm}
              />
            </div>
          </Grid>
        </Grid>
      </Form>
      <Notification notify={notify} setNotify={setNotify} />
    </Paper>
  );
}
