import React, { useState, useEffect, useRef } from "react";
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
    width: "450px",
    margin: theme.spacing(5),
    padding: theme.spacing(5),
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    maxWidth: "350px",
  },
  submitBoxContainer: {
    // width: "450px",
    // margin: theme.spacing(2),
    // padding: theme.spacing(2),
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
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
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
          message: "You Asked a Question",
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

  useEffect(() => {
    scrollToBottom();
  }, [allMessages]);

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      spacing={0}
      direction="column"
    >
      <Grid item>
        <Typography variant="h5">Ask Your Quries.</Typography>
      </Grid>
      <Grid item>
        <Paper
          className={classes.pageContent}
          style={{ height: "350px", overflowY: "scroll" }}
        >
          <Grid container spacing={0} direction="column">
            {allMessages.map((value, index) => (
              <Grid key={value} item>
                {index % 2 == 0 ? (
                  <Paper
                    className={classes.paper}
                    style={{ float: "left", backgroundColor: "#dddddd" }}
                  >
                    {value}
                  </Paper>
                ) : (
                  <Paper
                    className={classes.paper}
                    style={{ float: "right", backgroundColor: "#fff" }}
                  >
                    {value}
                  </Paper>
                )}
              </Grid>
            ))}
            <div ref={messagesEndRef} />
          </Grid>
        </Paper>
      </Grid>
      <Grid item>
        <Form
          onSubmit={handleSubmit}
          // className={classes.submitBoxContainer}
          style={{ marginTop: "-41px" }}
        >
          <Grid container justify="center" alignContent="center">
            <Grid item xs={12}>
              <Controls.Input
                name="message"
                label="Write Here..*"
                value={message}
                onChange={handleInputChange}
                error={errors.message}
              />
            </Grid>
            <Grid item>{loading ? <CircularProgress size={20} /> : <></>}</Grid>
            <Grid item>
              <Controls.Button type="submit" disabled={loading} text="Submit" />

              <Controls.Button
                text="Reset"
                disabled={loading}
                color="default"
                onClick={resetForm}
              />
            </Grid>
          </Grid>
        </Form>
        <Notification notify={notify} setNotify={setNotify} />
      </Grid>
    </Grid>
  );
}
