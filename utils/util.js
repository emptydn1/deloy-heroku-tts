const fs = require("fs");
const readline = require("readline");
const path = require("path");

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const sleep2 = (timeountMS) =>
  new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
  });

const contentHandle = (dataContent, addData = "") => {
  console.log(`${addData}`);
  console.log(`--------------------------------`);
  console.log(`---------${dataContent}---------`);
};

const readFileGetValue = async (valueFix = "COUNT_API") => {
  const urlEnv = __dirname + "/save.txt";
  const fileStream = fs.createReadStream(urlEnv);
  let temp;
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (let line of rl) {
    if (line.includes(valueFix)) {
      let b = line.replace(`${valueFix}=`, "");
      temp = parseInt(b);
      break;
    }
  }

  return temp;
};

const format2 = (n) =>
  n
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
    .slice(0, -3);

//edit file env
const processLineByLine = async (value, valueFix = "COUNT_API") => {
  const urlEnv = __dirname + "/save.txt";
  console.log(urlEnv);
  const fileStream = fs.createReadStream(urlEnv);
  let temp = "";
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (let line of rl) {
    if (line.includes(valueFix)) line = `${valueFix}=${value}`;
    temp += line + "\n";
  }

  fs.writeFile(urlEnv, temp, (err) => console.log(err, "processLineByLine"));
};

const saveValueFile = (arrData, nameFile) => {
  const file = fs.createWriteStream(__dirname + `/error/${nameFile}.txt`);
  file.on("error", function (err) {
    console.log("err");
  });
  arrData.forEach((value, x) => {
    if (value.error) file.write(`ERROR : ${value.error}\n\n\n`);
    file.write(`${x}-------${value.async}\n${value.data}\n\n\n`);
  });
  file.end();
  file.on("finish", function () {
    console.log("save value done");
  });
};

//get all file address relative
// const _getAllFilesFromFolder = function (dir) {
//   let results = [];

//   fs.readdirSync(dir).forEach(function (file) {
//     file = dir + "/" + file;
//     const stat = fs.statSync(file);

//     if (stat && stat.isDirectory()) {
//       results = results.concat(_getAllFilesFromFolder(file));
//     } else results.push(file);
//   });
//   return results;
// };

// _getAllFilesFromFolder(__dirname).forEach((e) => {
//   if (e.includes("mp3")) filesMp3.push(e);
// });

//get all file absolute
// const getListFile = (namefile) => {
//   return sleep(3000).then((_) => {
//     const stream = fs.createWriteStream(__dirname + `/file/${namefile}.txt`);
//     fs.readdirSync(__dirname + "/file").forEach((x, index) => {
//       if (x.includes("mp3")) stream.write(`file ${index}.mp3\n`);
//     });
//   });
// };

//old
const checkFileExist = (name) => {
  if (fs.existsSync(__dirname + `/file/${name}.txt`)) {
    name += "1";
    return checkFileExist(name);
  } else {
    const stream = fs.createWriteStream(__dirname + `/file/${name}.txt`);
    fs.readdirSync(__dirname + "/file").forEach((x, index) => {
      if (x.includes("mp3")) stream.write(`file ${index}.mp3\n`);
    });
    return __dirname + `/file/${name}.txt`;
  }
};

//new check new module using fluent-ffmpeg
// const checkFileExist = (name) => {
//   let arrFileMp3 = [];
//   fs.readdirSync(__dirname + "/file").forEach((x, index) => {
//     arrFileMp3.push(__dirname + `/file/${index}.mp3`);
//   });
//   return arrFileMp3;
// };

// const getListFile = (namefile) => {
//   return sleep(3000).then((_) => {
//     return checkFileExist(namefile);
//   });
// };

const _getAllFilesFromFolder = function (dir, deco = "/") {
  let results = [];

  fs.readdirSync(dir).forEach(function (file) {
    if (file === "node_modules") return;
    file = dir + deco + file;
    const stat = fs.statSync(file);

    if (stat && stat.isDirectory()) {
      results = results.concat(_getAllFilesFromFolder(file));
    } else results.push(file);
  });
  return results;
};

const takePositionFolder = (ps) => {
  let te;
  _getAllFilesFromFolder(__dirname).forEach((e) => {
    if (e.includes(ps)) te = e;
  });
  return te;
};

const deleteFolder = (nam) => {
  const delFolder = path.join(__dirname, `${nam}`);
  fs.rmdir(delFolder, { recursive: true }, function (err) {
    if (err) console.log(err);
    console.log("directory removed!");
  });
};

//xem xet error
// const removeDir = function (folder) {
//   const path = __dirname + `/${folder}`;
//   if (fs.existsSync(path)) {
//     const files = fs.readdirSync(path);

//     if (files.length > 0) {
//       files.forEach(function (filename) {
//         if (fs.statSync(path + "/" + filename).isDirectory()) {
//           removeDir(path + "/" + filename);
//         } else {
//           fs.unlinkSync(path + "/" + filename);
//         }
//       });
//       fs.rmdirSync(path);
//     } else {
//       fs.rmdirSync(path);
//     }
//   } else {
//     console.log("Directory path not found.");
//   }
// };

const folderExist = (nameFolder) => {
  const folder = path.join(__dirname, `./${nameFolder}`);
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  } else {
    console.log("folder exist");
  }
};

const folderExistNew = (a = "fix") => {
  const folder = path.join(__dirname, `./fixFile`);
  let tete = a;
  if (fs.existsSync(`${folder}/${tete}`)) {
    tete += "1";
    return folderExistNew(tete);
  } else {
    fs.mkdirSync(`${folder}/${tete}`);
    return tete;
  }
};

module.exports = {
  sleep,
  sleep2,
  processLineByLine,
  // getListFile,
  saveValueFile,
  folderExist,
  checkFileExist,
  folderExistNew,
  _getAllFilesFromFolder,
  takePositionFolder,
  contentHandle,
  readFileGetValue,
  deleteFolder,
  format2,
};
