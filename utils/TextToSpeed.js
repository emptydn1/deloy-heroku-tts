const axios = require("axios");
const Voice = require("./Voice");
const fs = require("fs");
const { sleep2 } = require("./util");

class TextToSpeed extends Voice {
  // #API = JSON.parse(process.env.API);
  #API = [
    "KofPtOsoYBiD08YqX5FbbYI7tSJuKFKu",
    "Do4Q6u29LQtbkEybtNvHjR8VvQHorrzz",
    "dHhgy8DuNHEYB4Hcrkr8Ppr1BbXEU6iG",
    "zvqHddkpkdyeJqzy8U4TOer784wT2N3H",
    "izN0N3BkvXLZmIpJOlPrFYxW1BSqwPRa",
    "6eaGiF0ukJQwB7sjINhOXCUTxf8pJa2H",
    "WKW7g4ZdYJp6w6swL8XeH6FQJYaZhcQT",
    "TTyCIuEYEQgKirWhtBTmwfL0FEQICiB0",
    "mhWsOMS8soi3s8lTcbsVCs8dOdngBJdG",
    "JL7xvSS6amlm6vHwXTMid64kxQVEgHdu",
    "EHKHi5GQVI8nDElu9NYAdZExheJeayus",
    "nWjxTs2ozBTem14FLQahFBEHYi1SPWSN",
    "qsgauPDLWZa1U45ijldofqOBVIiDzA24",
    "BM8t8nJSBncrnX9yLOtjAfebT3CwgTvU",
    "CUyHyf91QbsjK8qkWKLHq443iNGShl7o",
    "2JriPK5orTQfdflwDAJlMt7uAZoAYPhA",
    "mHWectbq9MheqEco16Vy8B129n5SDpxb",
    "NeaejCTgnhqiWkuF2myOh8PnfuOtDe4T",
    "22MYnk1hUcWNCEpHtf16O8iCW7i1UMgF",
    "VWln0lewIfxbRYBb0iBFaW3REGtemHWj",
    "oLQgHvIQqFXPexPu9MRR0Ub1xXw55RbC",
    "nDBGpA62Ju6MC3vb97XKuGk3k00kKaIg",
    "9RrUXBCOKIjFT0jAIFX8N4FY9vJFMHEL",
    "TjlJJki428XVFLgt5br2QN0D5GgrBAaS",
    "nVskMRGtZNYjQRMdXGHcylJBgUw3HA4g",
    "0hqGv0RWQCTanWrHy128XPtMDONP3yDl",
    "kR7Pgse0OnjtWVN0hNSXtPWf5mgQCIJk",
    "jlGXv0ErPwnKZU0sVJ9y5GCL6D3wa4E6",
    "lc8q8cOrFNPhZbVzkCL0nhRBlGPRIwiW",
    "9ON4SOqhE0mmZ65mFBdzqJqaV5Ax72Hl",
    "Iuh8TstSHIaoVXoSFnwCYEQbKihFvhPN",
    "LmvGc4iWzipMz65rbi0IuYcceb85rzPj",
    "YRFhlNTD1QQckLp5s0tJtuwOXEvwan21",
    "tYGaoqSVfTG64EdgdsE1SjCMabw05Zfn",
    "BWb4KWEhMto18W04Ik8bK63MNG5iXSU2",
    "9vcXcMlNE1b3eeWOAbnACEJHnPaM6uh2",
    "Rkr8vzUK3LkfcacHwF3ZedAV00UXDxrz",
    "B5NfwURfAbb9aP6QfY7QITZqpPp9vvBm",
    "UgejN2DFxTnJCquK7wN3hTokiZxWjKAw",
    "w6IWrgxHpu5agrMRC143eCX5Q96K69J4",
    "x4xkE8d1yijeHD2LMvkva1lZdWrXDSOX",
    "BxU8rO1f2x0A43ZBVlK0fcFQL8I23tsa",
    "8p3sbrz5tzH6AlICJwmgLdqFXKgfjQXn",
    "cp2WBThH9S8nqkqxCqaUR7dfUZx5kbyI",
    "2kZcOFZLLD2unweANnqWD6UNMEYd9YXR",
    "0AHuvyfQj6QyiiAAtB0MbfjwdcfegLGT",
    "1f8rW1lluSiBDwe83b91rQXWBxl1ss1F",
    "4zBwTMEyjs0i1T1UwdilimNpm8gSMis5",
    "8pYk5jB9aUoBjkEtuxRY0wbmV30C0LP3",
    "EzqDwmhvPafyTvLQJGwYzHpbz1sggHMZ",
    "i5wKENS8fAxpmbBEJ7ctbS9zWTJw5ZZD",
    "3UB0VAsnMtd2gUhYXCQnnjLObog2BQI0",
    "cIi82BjRu3Z3bleD9igc83KStKRTX4D4",
    "W2I9qabhhgU9kRbSMR6HSH6eR8XD2uQq",
    "3CiPUk43o6T1QhFM1KqN864viZKFdye2",
    "WHrMmf2QxFF9sbTU2hK25CmAyCVvW9Hm",
    "OhmoUvnEpl0GasqjYzwgA3yOJuFYZ5uN",
    "WMuCOv0hAJci5c4ST15Dbj2DqQ9aX6th",
    "ZZHUdD1qzuXjRZgKbSTHvjZG94OJr0hN",
    "QIw0Qm5bcqqTQDsAN9rcekPADn0W9gWM",
    "O9uNGTovfQy0kdPa6PTJf3j4X8311AJR",
    "SoYNXJKzR3yMdCWrd6Ns6cxVEVbNvGWz",
    "JUol0uMlCWCdYIM46OAXJtAYfjh0dYdK",
    "thQphC5AAoWGcG0yOGvK24lJO4oqwvwc",
    "xVLBQqr7qMzSLOGfsLue7wkmfm6Eg0wv",
    "IrX5ruqYztsd8g1SO0HFiMRmO3c8EJc0",
    "OqzINb0dSYJhhQe02TmUosQAeXNKfS6t",
    "SV1YqNNv9Ljbzv1fTJDax6JtJUahqo8K",
    "7A089R41x3fzfrNna4VNEjmyyVqstxwh",
    "tRbKFP9WjKKSVNmQlexAn54g3ZbMU9Jj",
    "TPapPZ80OQKB8z4AN5gQ84JL5yoGyUf1",
    "dQcKlBx7ZlFLgiwb3lXpHVGORRcEs7m4",
    "dZbc97vRJ8FMMJ98awsnurfZe01YBnNw",
    "PfINaTd6wfhcJD8rL3TRJYUjPj32Bb9O",
    "BPCztyBe0VI30F1CoQEEgK70HeoCXo02",
    "0ncQbcAosVjbXa3j2vNTbrqDOQB2mfn6",
    "3QXDp90a115naGxUdTyEG1OsHKWLmKps",
    "CHQr9BttJhhGOK2hxAVeiTtDcIaOMVle",
    "m9qUsMPO6WuvCffyA4463KN8686Y5jQy",
    "xV27cnPvIyD3Pg349qwoGHBZjuMeCswa",
    "OHzafgGY38UJz3MFU2q9kjDyo9L3YPvp",
    "9e13zs8LjIKSP11OYCsgo8JHAeUYeMEV",
    "loDOBM6LW1pbutqwP7HoZ75Zn4puh6xv",
    "OxqZQd17FGs4VCvq6O4noYZ41lUslK4x",
    "7U92wDX28mf5QMpTt54rnJijCOHj3nXi",
    "NTy3x18L097ZxUW7IqbeYaNmonbPGc29",
    "jEtHpjF6TQyV4uGhuoHdLNfqoinOIQEj",
    "YxJRlK0qzPpiOskTWD1VPD4sMIQjdqkp",
    "Srj6iuIS9T4VucpWvuHJQkh1qtiQMbS5",
    "JWCviHz9kU3zkxs2AHF1vn4pyID7iHyB",
    "jQVqbSqzAbKMwYieVTAD9VZUSWZ5lk3p",
    "GEdC8ZEAr6fLLryFlEWbKDhaBTJH7Yjc",
    "ednsXPr1XA5hG5IRENoVxyj5RAZ2lx0m",
    "EqF06Jyw0wk5Brt5tOlFEVZXTIOwd3cs",
    "aLxe4FUdFFNYP6dcRwmIGafOH4c2EwvU",
    "VdFEJWyWKXk6A0wsInf7VZDHMDH2AopY",
    "YMMeaGfNOX4oBmqhzHp8pn40ewt556ki",
    "UrbauVk1Pe6Zx1ln2Vp5A68kHTvqxaQj",
    "FJZPL90xgBgVQNwVqhC8qPWFWc7BN8Ov",
    "XQkIR0X0Cym4l5Pkdwt8S7gijpak0BC2",
    "ONcD8GxuT4UKcWjTqoLbapZwbhnu4GLG",
    "0c9dv0Va85avrGrHpYUNrHZtm8CGn3y2",
  ];
  #streamError;

  constructor(textOrUrlManga, voice, speed, urlData, durationsTs) {
    super(textOrUrlManga, voice, speed, urlData, durationsTs);
    this.#streamError = fs.createWriteStream(
      __dirname + `/error/fileMp3Error.txt`
    );
  }

  get API() {
    return this.#API;
  }
  set API(API) {
    this.#API = API;
  }

  async getFileMp3(arr, field = true) {
    let errArr;
    errArr = field ? [] : arr;
    if (errArr)
      for (let x in arr) {
        await sleep2(this.durationsTs);
        const xArr = arr[x];
        console.log("get file: ", xArr.index ?? x);
        const stream = fs.createWriteStream(
          __dirname + `/file/${xArr.index ?? x}.mp3`
        );

        //handle side node back end
        await axios
          .get(xArr.async, {
            responseType: "stream",
            adapter: require("axios/lib/adapters/http"),
          })
          .then(async (res) => {
            await new Promise((resolve) => {
              errArr = errArr.filter((e) => e.index !== xArr.index);

              res.data.pipe(stream).on("finish", () => {
                console.log("download mp3 finish");
                resolve();
              });
            });
          })
          .catch(async (err) => {
            await new Promise((resolve) => {
              xArr["index"] =
                typeof xArr["index"] === "undefined" ? x : xArr["index"];
              if (!errArr.some((e) => e.index === xArr.index))
                errArr.push(xArr);
              console.log(
                `${err.response?.status}`,
                `${(xArr["index"] =
                  typeof xArr["index"] === "undefined"
                    ? x
                    : xArr["index"])}.mp3`,
                errArr.length
              );

              this.#streamError.write(
                `${xArr.index ?? x}--${xArr.async}\n${xArr.data}\n\n--\n`,
                (_) => {
                  resolve();
                }
              );
            });
          });
      }
    return errArr;
  }

  toString() {
    console.log(
      this.textOrUrlManga,
      this.voice,
      this.speed,
      this.urlData,
      this.durationsTs
    );
  }
}

// const a = new TextToSpeed(1, 2, 3, 4, 5);
// a.toString();

module.exports = exports = function (
  textOrUrlManga,
  voice,
  speed,
  urlData,
  durationsTs
) {
  return new TextToSpeed(textOrUrlManga, voice, speed, urlData, durationsTs);
};
