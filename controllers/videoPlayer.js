const path = require("path");
var { VideoMap } = require("../configs/memoryRepository");
const { VideoPlayerEvents } = require("../configs/events");

function onPlayVideo(io, url) {
  io.emit(VideoPlayerEvents.Play, {
    url,
    time: VideoMap[url].time ?? 0,
  });
}

function onPauseVideo(io, url, time) {
  VideoMap = {
    ...VideoMap,
    [url]: {
      ...VideoMap[url],
      time: time,
    },
  };

  io.emit(VideoPlayerEvents.Pause, { url, time });
}

function onLoadVideoRequest() {
  const socket = this;
  const videoPath = path.join(
    socket.handshake.headers.host,
    "static",
    "sample_video_3.mp4"
  );
  // const videoPathUrl = `http://${videoPath}`;
  const videoPathUrl = `http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4`;
  VideoMap = {
    ...VideoMap,
    [videoPathUrl]: {
      url: videoPathUrl,
      time: VideoMap[videoPathUrl]?.time ?? 0,
    },
  };

  socket.emit(VideoPlayerEvents.Download, { url: videoPathUrl });
}

function onVideoTransition(io, url, time) {
  console.log(url, time);
  VideoMap = {
    ...VideoMap,
    [url]: {
      ...VideoMap[url],
      time: time,
    },
  };

  io.emit(VideoPlayerEvents.Time, { url, time });
}

module.exports = {
  onPlayVideo,
  onPauseVideo,
  onLoadVideoRequest,
  onVideoTransition,
};
