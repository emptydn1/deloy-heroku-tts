const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const axios = require("axios");
const morgan = require("morgan");
const serveIndex = require("serve-index");
require("dotenv").config();

const indexRouter = require("./routes/index");
const torrentRouter = require("./routes/torrent");
const downloadRouter = require("./routes/download");
const delRouter = require("./routes/del");
const srtRouter = require("./routes/srt");

(function wake() {
  try {
    const handler = setInterval(() => {
      axios
        .get("https://ttss1.herokuapp.com/api/vlluon")
        .then((re) => console.log("wake", re.data));
    }, 25 * 60 * 1000);
  } catch (err) {
    console.log("Error occured: retrying...............");
    clearInterval(handler);
    return setTimeout(() => wake(), 10000);
  }
})();

app.use(cors());
app.use(morgan("dev"));
app.use("/public", express.static(path.join(__dirname, "public")));
app.use(
  "/files",
  express.static("public"),
  serveIndex("public", { icons: true })
);

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

//routes
app.use("/api", indexRouter);
app.use("/torrent", torrentRouter);
app.use("/download", downloadRouter);
app.use("/del", delRouter);
app.use("/srt", srtRouter);

if (true || process.env.PRODUCT === "production") {
  app.use(express.static(path.join(__dirname, "fe-wb", "dist")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(path.join(__dirname, "fe-wb", "dist", "index.html"))
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("runing app");
  });
}

//handle error
app.use((req, res, next) => {
  res.statusCode = 404;
  next(new Error("not found"));
});

app.use((err, req, res, next) => {
  res.status(res.statusCode !== 200 ? 500 : res.statusCode);
  res.json({
    message: err.message,
    stack: err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
