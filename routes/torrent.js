const express = require("express");
const router = express.Router();
const uploadMiddelware = require("../middlewares/uploaderMiddleware");
const WebTorrent = require("webtorrent");
const path = require("path");
const fs = require("fs");

router.post("/", uploadMiddelware.single("file"), async (req, res, next) => {
  let handler;
  try {
    handler = setInterval(() => {
      axios
        .get(`https://${process.env.domain}.herokuapp.com/api/vlluon`)
        .then((re) => console.log("wake", re.data));
    }, 25 * 60 * 1000);
    let pathname = path.join(__dirname, "..", "public");
    const client = new WebTorrent();
    console.log("waiting....................");
    client.add(req.file.path, { path: pathname }, function (torrent) {
      torrent.on("download", function (bytes) {
        console.log("just downloaded: " + bytes);
        console.log("total downloaded: " + torrent.downloaded);
        console.log("download speed: " + torrent.downloadSpeed);
        console.log("progress: " + torrent.progress);
        console.log((torrent.progress * 100).toFixed());
      });
      torrent.on("done", function () {
        fs.writeFile(pathname + `/${req.file.originalname}.txt`, "", (err) => {
          if (err) {
            console.error(err);
            return;
          }
          //file written successfully
        });
        clearInterval(handler);
        console.log("torrent downsload finished");
      });
    });
    res.json(req.file.filename);
  } catch {
    clearInterval(handler);
    console.log("torrent clear");
    next();
  }
});

module.exports = router;
