import React from "react";
import {
  AppBar,
  Toolbar,
  Grid,
  InputBase,
  IconButton,
  Badge,
  makeStyles,
  Tooltip,
  Typography,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#fff",
  },
  searchInput: {
    opacity: "0.6",
    // padding: `0px ${theme.spacing(1)}px`,
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#f2f2f2",
    },
    "& .MuiSvgIcon-root": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <AppBar position="static" elevation={0} className={classes.root}>
      <Toolbar>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h6" style={{ color: "#000" }}>
              ChatBot
            </Typography>
          </Grid>
          <Grid item sm></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
