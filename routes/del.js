const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");

router.get("/:id", async (req, res) => {
  const pathFolder = path.join(__dirname, "..", "public", req.params.id);
  console.log(req.params.id);
  fs.unlink(pathFolder, (err) => {
    if (err) console.log("error");
    console.log("removed", pathFolder);
  });
  res.send("ok del");
});

module.exports = router;
