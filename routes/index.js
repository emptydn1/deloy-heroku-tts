const express = require("express");
const router = express.Router();
const axios = require("axios");
const TextToSpeed = require("../utils/TextToSpeed");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
// const concatAudio = require("../utils/concatAudio");
const { v4: uuidv4 } = require("uuid");
const {
  sleep2,
  processLineByLine,
  // getListFile,
  checkFileExist,
  saveValueFile,
  folderExist,
  deleteFolder,
  readFileGetValue,
  // folderExistNew,
} = require("../utils/util");
const { next } = require("cheerio/lib/api/traversing");

let cacheTime;
let countUp = 0;

router.get("/rs", async (req, res) => {
  if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
    return res.send("wait");
  }
  // deleteFolder("file");
  // deleteFolder("../public");
  // cacheTime = Date.now();

  // // process.exit(1);
  // await sleep2(1000);
  axios({
    method: "delete",
    url: "https://api.heroku.com/apps/texttospeed/dynos/",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.heroku+json; version=3",
      Authorization: "Bearer 340baf82-993f-48c9-aecf-dc1cc27e58c8",
    },
  })
    .then((v) => console.log("author success"))
    .catch((e) => console.log(e.response.data));
  return res.send("ok");
  // // deleteFolder("fixFile");
});

router.get("/vlluon", async (req, res) => {
  console.log("vlluon");
  res.send("vlluon");
});

//get data from client
router.get("/", async (req, res) => {
  // folderExist("../public");
  // folderExist("../public/uploads");
  // deleteFolder("file");
  let valueOfMonth = await readFileGetValue("MONTH"),
    count_api = await readFileGetValue(),
    now = new Date(),
    stringText = "->\\/,.>+()_".charAt(
      Math.floor(Math.random() * "->\\/,.>+()_".length)
    ),
    stringText2 = stringText + stringText + stringText + stringText + "huy";

  if (now.getMonth() + 1 !== valueOfMonth) {
    await processLineByLine(0);
    await sleep2(2000);
    processLineByLine(now.getMonth() + 1, "MONTH");
  }

  const TTS = new TextToSpeed();

  const char = await axios({
    method: "post",
    url: "https://api.fpt.ai/hmi/tts/v5",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
      api_key: TTS.API[count_api],
      voice: "banmai",
    },
    data: stringText2,
  })
    .then((e) => {
      let temp = +e["headers"]["x-ratelimit-remaining-free-month"];
      let cal = temp + (TTS.API.length - count_api - 1) * 100000;
      return cal;
    })
    .catch((_) => console.log("check char error"));

  res.send(
    `${char
      .toFixed(2)
      .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
      .slice(0, -3)}`
  );
});

router.post("/", async (req, res) => {
  if (cacheTime && cacheTime > Date.now() - 30 * 1000) {
    return res.send("wait");
  }
  try {
    cacheTime = Date.now();
    const { textOrUrlManga, voice, speed, urlData, durationsTs, pa } = req.body;
    // console.log(textOrUrlManga, voice, speed, urlData, durationsTs, pa);

    if (pa === process.env.PW) {
      let count_api = await readFileGetValue(),
        $,
        html,
        strArr = [],
        str = "",
        errArr = [],
        strChar = "->\\/,.>+()_",
        promises = [],
        // arrListFileMp3,
        sdfghjkl = 0,
        abcdxyz = 0;

      const TTS = new TextToSpeed(
        textOrUrlManga,
        voice,
        speed,
        urlData,
        durationsTs
      );

      folderExist("file");
      folderExist("error");
      folderExist("../public");
      // folderExist("fixFile");

      const instance = axios.create({
        baseURL: "https://api.fpt.ai/hmi/tts/v5",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Cache-Control": "no-cache",
          api_key: TTS.API[count_api],
          voice: TTS.voice,
          speed: TTS.speed,
        },
      });

      if (urlData !== "text") {
        html = await axios.get(encodeURI(textOrUrlManga));
        $ = cheerio.load(html.data);
      }

      const handleContent = (e, index, querySelector) => {
        if (str.length < 3500) {
          str += e + " ";
          if (querySelector.length - 1 === index) {
            strArr.push(str);
            str = "";
          }
        } else {
          str += e + " ";
          strArr.push(str);
          str = "";
        }
      };

      const getContent = (urlData = "text", v = "") => {
        let querySelector,
          vnArr = null;
        if (urlData === "meobietbay") {
          querySelector = $("#content .article-content .entry-content > p");
        } else if (urlData === "docln") {
          querySelector = $("#chapter-content > p");
        } else if (urlData === "text") {
          vnArr = v.replace(/\n+/g, "\n").match(/[^\n]*\n|[^\n]+$/g);
          querySelector = vnArr ?? [];
        } else if (urlData === "truyenfull") {
          v = $("#chapter-c").text();
          vnArr = v.replace(/\n+/g, "\n").match(/[^,]*,|[^,]+$/g);
          querySelector = vnArr ?? [];
        }
        const sum = querySelector.length;
        if (sum)
          urlData !== "text" && urlData !== "truyenfull"
            ? querySelector.each((a, b) => {
                handleContent($(b).text(), a, querySelector);
              })
            : querySelector.forEach((a, b) => {
                handleContent(a, b, querySelector);
              });
      };

      getContent(TTS.urlData, TTS.textOrUrlManga);
      await sleep2(2000);

      let totalStrArr = strArr.reduce((x, y) => {
        return x + y.length;
      }, 0);

      console.table({
        // textOrUrlManga: TTS.textOrUrlManga,
        voice: TTS.voice,
        speed: TTS.speed,
        urlData: TTS.urlData,
        durationsTs: TTS.durationsTs,
        API: TTS.API.length,
        count_api,
        strArr: strArr.length,
        LastArr: strArr[strArr.length - 1],
        totalStrArr: totalStrArr,
        text: textOrUrlManga.length,
      });

      for (let x in strArr) {
        await sleep2(TTS.durationsTs);
        promises.push(instance.post("", strArr[x]));
        console.log("promises : ", x);
      }

      const recursionApi = async (params, apiArr, count = 0, ind) => {
        let onon = strChar.charAt(Math.floor(Math.random() * strChar.length));
        if (params.response) {
          if (
            (params.response.status === 429 ||
              params.response.status === 400 ||
              params.response.status === 502) &&
            count < apiArr.length
          ) {
            console.log(
              `%c${count}`,
              "color: #0be881",
              params.response.status,
              "recursionApi",
              ind
            );
            const myInterceptor = await instance.interceptors.request.use(
              (config) => {
                config.headers["api_key"] = apiArr[count];
                return config;
              },
              (err) => {
                console.log(err, "interceptors");
              }
            );
            // console.count(ratelimit);
            // console.count(count);
            return await instance
              .post(
                "",
                params.config.data + " --- " + onon + onon + onon + " -- "
              )
              .then((res) => {
                // if (count_api === count)
                //   ratelimit = +res["headers"][
                //     "x-ratelimit-remaining-free-month"
                //   ];
                console.log(
                  `%c${+res["headers"]["x-ratelimit-remaining-free-month"]}`,
                  "color:red",
                  "count recursionApi :",
                  count
                );
                res["count"] = count;
                return res;
              })
              .catch((error) => {
                instance.interceptors.request.eject(myInterceptor);
                // if (count_api === count)
                //   ratelimit -= params.config.data.length;

                // if (error.config.data.length > ratelimit) ++count;

                if (count === TTS.API.length - 1) {
                  count = TTS.API.length - 1;
                } else ++count;

                return recursionApi(error, apiArr, count);
              });
          }
        } else {
          return { error: params.config.data };
        }
      };

      const promisesRejected = promises.map(
        async (e, ind) =>
          await e.catch((x) => recursionApi(x, TTS.API, count_api, ind))
      );

      const handlePromiseAll = async (promisesRejeced, check = true) => {
        return await axios.all(promisesRejeced).then((res) => {
          // console.log(res, "vl luon");
          let setCountApi = res.map((x) => x?.count).filter((x) => x);
          let countApiNew = Math.min(...setCountApi);

          if (countApiNew !== Infinity && countApiNew > count_api)
            processLineByLine(countApiNew);

          return res.map((x, y) => {
            if (x?.error) return { async: "error", error: x.error };
            return {
              async: x.data.async,
              data: x.config.data,
              index: check === true ? undefined : check[y].index,
            };
          });
        });
      };

      const data = await handlePromiseAll(promisesRejected);
      saveValueFile(data, "value");

      errArr = await TTS.getFileMp3(data);

      while (sdfghjkl <= 40) {
        console.log(`%c ${sdfghjkl}`, `color: blue`);
        errArr = await TTS.getFileMp3(errArr, false);

        if (errArr.length) sdfghjkl++;
        else sdfghjkl = 41;
      }
      sdfghjkl = 0;

      const checkError = async () => {
        console.log("--------------------");
        TTS.durationsTs += 3000;
        if (errArr.length) {
          promises = [];
          let tempError = [...errArr],
            promisesErrorRejected = null,
            cncn = 0,
            zxzx = strChar.charAt(Math.floor(Math.random() * strChar.length));

          for (let x in errArr) {
            errArr[x].data += " " + zxzx + zxzx + zxzx + " ";
            await sleep2(TTS.durationsTs);
            console.log("promises : ", x);
            promises.push(instance.post("", errArr[x].data));
          }

          errArr = [];

          promisesErrorRejected = promises.map(
            async (e, ind) =>
              await e.catch((x) => recursionApi(x, TTS.API, count_api, ind))
          );

          const dataErrorHandled = await handlePromiseAll(
            promisesErrorRejected,
            tempError
          );

          errArr = await TTS.getFileMp3(dataErrorHandled);

          while (cncn <= 40) {
            console.log(`%c ${cncn}`, `color: blue`);
            errArr = await TTS.getFileMp3(errArr, false);
            if (errArr.length) cncn++;
            else cncn = 41;
          }

          if (abcdxyz > 0) {
            TTS.durationsTs *= 2;
            console.log(
              "turn off APP, your network or server side is bad",
              TTS.durationsTs
            );
          }
          abcdxyz++;
          await sleep2(TTS.durationsTs);
          await checkError();
        }
      };
      await sleep2(2000);
      await checkError();

      // arrListFileMp3 = await getListFile("fileMp3");
      const pathFileConvert = checkFileExist("countFile");
      const savePath = path.join(__dirname, `../public/${countUp}.mp3`);
      countUp++;
      await sleep2(2000);

      exec(
        `ffmpeg -f concat -i ${pathFileConvert} -c copy -y ${savePath}`,
        async (err, stdout, stderr) => {
          if (err) console.error(err);
        }
      );

      await sleep2(10000);

      console.log("ok");
      fs.readdir(path.join(__dirname, "../utils/file"), (err, files) => {
        if (err) throw err;

        for (const file of files) {
          if (file.includes("mp3"))
            fs.unlink(path.join(__dirname, "../utils/file", file), (err) => {
              if (err) throw err;
              console.log("removed");
            });
        }
      });
      return res.sendFile(savePath);
      // res.download(savePath, (err) => {
      // if (err) res.send("Error send file");
      // fs.unlinkSync(savePath);
      // });
      // concatAudio(arrListFileMp3)
      //   .concat(savePath)
      //   .on("start", function (command) {
      //     console.log("ffmpeg process started:", command);
      //   })
      //   .on("error", function (err, stdout, stderr) {
      //     console.error("Error:", err);
      //     console.error("ffmpeg stderr:", stderr);
      //   })
      //   .on("end", async () => {
      //     let folderNew = await folderExistNew();
      //     ///////////////////////////////////////////

      //     arrListFileMp3.map((e) => {
      //       let newPath = e.replace(
      //         /file([^file]*)$/,
      //         `fixFile/${folderNew}$1`
      //       );

      //       fs.rename(e, newPath, function (err) {
      //         if (err) throw err;
      //         console.log("Move complete.");

      //         res.download(savePath, (err) => {
      //           if (err) res.send("Error send file");
      //           fs.unlinkSync(savePath);
      //         });
      //       });
      //     });
      //   });
    } else {
      return res.send("false pw");
    }
  } catch {
    console.log("Error occured: retrying...............");
    next();
  }
});

module.exports = router;
