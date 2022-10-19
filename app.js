const express = require("express");
const { json, urlencoded } = require("body-parser");
const compression = require("compression");
const cors = require("cors");

const Multer = require("multer");

const Storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      (file.fieldname + "-" + uniqueSuffix + "-" + file.originalname).replace(
        /\s/g,
        ""
      )
    );
  },
});

require("./src/config/makeBucket");

const App = express();

App.use(cors());
App.use(compression());
App.use(json());
App.use(urlencoded({ extended: false }));

const Upload = Multer({ storage: Storage });

const cpUpload = Upload.fields([{ name: "file", maxCount: 10 }]);

App.use((_, res, next) => {
  setTimeout(() => {
    return res.status(408).send({
      state: false,
      message: "Timeout",
    });
  }, 60000);
  next();
});

App.post("/uploads", cpUpload, async function (req, res) {
  const FileNames = req.files.file.map((d) => d.filename);
  const Path = req.files.file.map((d) => d.path);

  const { MinioClient, bucket } = require("./src/config/minio");
  const fs = require("fs");
  const response = new Promise(async (resolve) => {
    const SubmitData = [];

    for (let idx = 0; idx < Path.length; idx++) {
      // const element = array[idx];
      const objectFileName = FileNames[idx];
      const file = Path[idx];

      const fileData = fs.readFileSync(file);
      const submitFileDataResult = await MinioClient.putObject(
        bucket,
        objectFileName,
        fileData
      ).catch((e) => {
        console.log("Error while creating object from file data: ", e);
        throw e;
      });
      SubmitData.push(submitFileDataResult);
      fs.unlink(file, (err) => {
        if (err) throw err;
        console.log(`${file} was deleted`);
      });
    }
    resolve(SubmitData);
  });

  return res.status(200).send({
    state: true,
    message: "Success upload File",
    data: {
      files: FileNames,
      submit: await response,
    },
  });
});

App.get("/public/:file", async (req, res) => {
  const params = req.params.file;
  const { MinioClient, bucket } = require("./src/config/minio");
  await MinioClient.getObject(bucket, params, function (err, stream) {
    if (err) {
      return res.status(500).send({
        state: false,
        message: "Gagal mengambil gambar",
        error: err.message,
      });
    }
    stream.pipe(res);
  });
});

module.exports = App;
