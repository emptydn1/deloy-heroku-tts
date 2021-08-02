import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  blur: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: "#000",
    opacity: 0.5,
  },
  center: {
    position: "relative",
    left: "50%",
    top: "50%",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.blur}>
      <CircularProgress className={classes.center} />
    </div>
  );
};

export default Loading;
