import React, { useState } from "react";
import axios from "axios";
import { Paper, LinearProgress, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  fixProgress: {
    height: 16,
    borderRadius: 999,
  },
}));

const Torrent = () => {
  const classes = useStyles();
  const [file, setFile] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleOnchange = async (e) => {
    try {
      setLoading(true);
      let formData = new FormData();
      formData.append("file", e.target.files[0]);

      let { data } = await axios({
        method: "post",
        url: "/torrent",
        data: formData,
        onUploadProgress: ({ loaded, total }) => {
          let progress = ((loaded / total) * 100).toFixed(2);
          setProgress(+progress);
        },
      });

      if (data) {
        setLoading(false);
        setFile(data);
      }
    } catch (_) {
      setLoading(false);
    }
  };

  return (
    <Paper className={classes.paper}>
      {/* <form enctype="multipart/form-data"> */}
      <LinearProgress
        className={classes.fixProgress}
        variant="determinate"
        value={progress}
      />
      <label htmlFor="fileInput">send file</label>
      <input
        id="fileInput"
        type="file"
        name="files"
        onChange={handleOnchange}
      />
      {loading ? "loading" : ""}
      <Typography variant="body2" color="textSecondary">
        {file}
      </Typography>
      {/* </form> */}
    </Paper>
  );
};

export default Torrent;
