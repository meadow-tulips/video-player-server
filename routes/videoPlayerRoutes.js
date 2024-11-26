const {
  onPauseVideo,
  onPlayVideo,
  onVideoTransition,
  onLoadVideoRequest,
} = require("../controllers/videoPlayer");
const { VideoPlayerEvents } = require("../configs/events");

const handleConnection = (socket, io) => {
  console.log("User Connected");
  socket.on(VideoPlayerEvents.Pause, (...args) => onPauseVideo(io, ...args));
  socket.on(VideoPlayerEvents.Play, (...args) => onPlayVideo(io, ...args));
  socket.on(VideoPlayerEvents.Time, (...args) => onVideoTransition(io, ...args));
  socket.on(VideoPlayerEvents.Load, onLoadVideoRequest);
};

module.exports = handleConnection;
