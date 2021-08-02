import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../axios/axios";
import { Typography, Paper, Grid, Slider } from "@material-ui/core";
import { data, urlManga, duration } from "../data";
import useWindowSize from "../utils/useWindowSize";
import useForm from "../utils/useForm";
import Controls from "../components/controls/Controls";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  },
  heightSlide: {
    padding: "15px 0px",
  },
  widthMax: {
    width: "100%",
  },
  urldata: {
    flexDirection: "row",
    flexWrap: "nowrap",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "wrap",
    },
  },
}));

let init = {
  voice: "banmai",
  durationsTs: 6000,
  speed: 1,
  urlData: "text",
  textOrUrlManga: "",
  pa: "",
};

const TTSpages = ({ char }) => {
  const classes = useStyles();
  const width = useWindowSize();
  const [blob, setblob] = useState("");

  const { values, setValues, handleChange, handleSubmit, loading, setLoading } =
    useForm(
      init,
      async (values) => {
        try {
          setLoading(true);
          const temp = await axios.post("/", values, { responseType: "blob" });

          if (temp.data) {
            setLoading(false);
            let url = window.URL.createObjectURL(temp.data);
            setblob(url);
            // let a = document.createElement("a");
            // a.href = url;
            // a.download = "output.mp3";
            // a.click();
          }
        } catch (err) {
          console.log(err);
          setLoading(false);
          console.log("err download mp3");
        }
        // setLoading(false);
      },
      (e, s) => {
        const { name, value } = e.target;
        let temp = { n: name, v: value };
        if (name === "durationsTs") {
          temp.n = name;
          temp.v = +value;
        }
        if (typeof value === "undefined") {
          temp.n = "speed";
          temp.v = s;
        }
        return temp;
      }
    );

  const handleText = (e) => {
    const { name, value } = e;
    setValues({ ...values, [name]: value });
  };

  const handleReset = () => {
    axios
      .get("/rs")
      .then((e) => console.log(e))
      .catch((_) => console.log("err reset"));
  };

  console.log(values);
  return (
    <Grid container justify={width === "sm" ? "center" : "flex-start"}>
      {/* <Grid item xs={12} sm={10} md={7}> */}
      <Paper className={classes.paper}>
        {loading ? <Controls.Loading /> : <></>}
        <form onSubmit={handleSubmit}>
          <Grid container item>
            <Controls.RadioGroups
              name="voice"
              onChange={handleChange}
              value={values.voice}
              items={data}
            />
          </Grid>

          <Grid
            container
            item
            justify="space-between"
            className={classes.heightSlide}
          >
            <h3>Character remain: {char ?? "null"} Characters</h3>
            <Controls.Input
              init={{ pa: values.pa }}
              label="PassWord"
              variant="outlined"
              name="pa"
              type="password"
              fn={handleText}
            />
            <Controls.Select
              name="durationsTs"
              value={values.durationsTs}
              onChange={handleChange}
              items={duration}
            />
          </Grid>

          <Grid container item>
            <Controls.RadioGroups
              aria-label="urlData"
              name="urlData"
              onChange={handleChange}
              value={values.urlData}
              items={urlManga}
              style={classes.urldata}
            />
          </Grid>

          <Grid
            container
            item
            alignItems="center"
            justify="space-evenly"
            spacing={5}
            className={classes.heightSlide}
          >
            <Grid item xs={2} lg={1}>
              <Typography id="non-linear-slider" gutterBottom>
                speed
              </Typography>
            </Grid>
            <Grid item xs={10} lg={11}>
              <Slider
                name="speed"
                value={values.speed}
                min={-3}
                step={1}
                max={3}
                defaultValue={1}
                onChange={handleChange}
                valueLabelDisplay="on"
                aria-labelledby="non-linear-slider"
              />
            </Grid>
          </Grid>

          <Controls.Textarea
            className={classes.widthMax}
            fn={handleText}
            label="text or link"
            name="textOrUrlManga"
            init={{ textOrUrlManga: values.textOrUrlManga }}
          />

          <Grid
            container
            item
            justify="flex-end"
            className={classes.heightSlide}
          >
            <Controls.AudioPlay src={blob} controls autoPlay />
            <Controls.Button
              color="primary"
              size="large"
              text="Submit"
              type="submit"
            />
            <Controls.Button text="Default" onClick={handleReset} />
          </Grid>
        </form>
      </Paper>
      {/* </Grid> */}
    </Grid>
  );
};

export default TTSpages;
