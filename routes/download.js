const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const archiver = require("archiver");

let tempCount = 0;
router.get("/:id", async (req, res) => {
  let pathFolder = path.join(__dirname, "..", "public", `${req.params.id}`);
  if (!(Object.keys(req.query).length === 0)) {
    pathFolder += req.query.a;
  }

  const output = fs.createWriteStream(
    path.join(__dirname, "..", "public", "/") + tempCount + ".zip"
  );
  const archive = archiver("zip", { zlib: { level: 9 } });

  console.log("downloading....................", pathFolder);

  output.on("close", function () {
    console.log(
      "archiver has been finalized and the output file descriptor has closed."
    );

    tempCount++;
    console.log("download done");
    return res.send(`${tempCount - 1}`);
    // fs.unlink(tempName, (err) => {
    //     if (err) throw err;
    //     console.log("removed", tempName);
    // });
  });

  archive.on("error", function (err) {
    throw err;
  });

  archive.pipe(output);
  archive.directory(pathFolder);

  await archive.finalize();
});

module.exports = router;
