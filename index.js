const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const fs = require('fs')
const app = express();
app.use(cors());

app.get("/", (req, res) => {
  res.writeHead(200, { "content-type": "text/html" });
  fs.createReadStream("index.html").pipe(res);
})

app.get("/download", (req, res) => {
  try {
    var URL = req.query.URL;
  
    stream = ytdl(URL);
  
    res.header("Content-Disposition", `attachment; filename="audio.mp3"`);
    ffmpeg({ source: stream })
      .withAudioCodec("libmp3lame")
      .toFormat("mp3")
      .pipe(res, { end: true });
  }
  catch {}
})


app.listen(4000, () => {
  console.log("Server Works !!! At port 4000");
});
