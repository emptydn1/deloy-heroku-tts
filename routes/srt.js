const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { _getAllFilesFromFolder } = require("../utils/util");
const { exec } = require("child_process");

const checkFolder = (x, pathFolder = path.join(__dirname, "..", "public")) => {
  let tete = x;
  if (fs.existsSync(`${pathFolder}/${tete}`)) {
    tete += "1";
    return checkFolder(tete);
  } else {
    fs.mkdirSync(`${pathFolder}/${tete}`);
    return `${pathFolder}/${tete}`;
  }
};

const getAllFromFolder = async (dir, deco = "/") => {
  let results = [];
  const pathnewfolder = await checkFolder(`temp`);

  fs.readdirSync(dir).forEach((file) => {
    if (file === "node_modules") return;
    let tempFile = file;
    file = dir + deco + file;

    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      checkFolder(tempFile, pathnewfolder);
      results = results.concat(_getAllFilesFromFolder(file));
    } else {
      results.push(file);
    }
  });
  return { results, pathnewfolder };
};

router.get("/:id", async (req, res) => {
  const pathFolder = path.join(__dirname, "..", "public", req.params.id);
  const value = await getAllFromFolder(pathFolder);
  const { results, pathnewfolder } = value;
  let count = 1;
  let checkEx = "srt";
  //   let r2 = results.map((e) => {
  //     return e.replace(/.mp4|.srt/, "");
  //   });
  // if(req.query)
  if (!(Object.keys(req.query).length === 0)) {
    checkEx = req.query.a;
  }

  fs.readdirSync(pathnewfolder).forEach((file) => {
    if (file === "node_modules") return;
    let tpFile = file;
    file = pathnewfolder + "/" + file;

    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      let tenFolder = file;

      results.find((e, index) => {
        if (e.includes(tpFile) && e.includes(".mp4")) {
          e = e.replace(/.mp4|.srt|.vtt/, "");
          if (checkEx === "srt") {
            exec(
              `ffmpeg -nostdin -i "${e}.mp4" -f srt -i "${e}.srt" -c:v copy -c:a copy -c:s mov_text "${
                tenFolder + "/" + count
              }.mp4"`,
              async (err, stdout, stderr) => {
                if (err) console.error(err);
                console.log("ok");
              }
            );
          } else if (checkEx === "vtt") {
            exec(
              `ffmpeg -nostdin -i "${e}.mp4" -i "${e}.vtt" -map 0:v -map 0:a -map 1 -metadata:s:s:0 language=eng -c:v copy -c:a copy -c:s srt "${
                tenFolder + "/" + count
              }.mkv"`,
              async (err, stdout, stderr) => {
                if (err) console.error(err);
                console.log("ok");
              }
            );
          }
          count++;
        }
      });
    }
  });
  // -nostdin ignore "press q to stop"
  // `ffmpeg -nostdin -i "${e}.mp4" -f srt -i "${e}.srt" -c:v copy -c:a copy -c:s mov_text "${
  //   tenFolder + "/" + count
  // }.mp4"`
  res.send("ok srt");
});

module.exports = router;
