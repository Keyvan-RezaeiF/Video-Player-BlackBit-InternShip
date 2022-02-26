const videoElem = document.querySelector('video')
const playBtn = document.querySelector('.gg-play-button')
const pauseBtn = document.querySelector('.gg-play-pause')
const fullScreenBtn = document.querySelector('.gg-assign')
const settings = document.querySelector('.gg-more')
const volume = document.querySelector('.gg-volume')
const buttons = document.querySelector('.buttons')
const videoContainer = document.querySelector('.video_container')
const timeDiv = document.querySelector('#time')
const controlsDiv = document.querySelector(".controls")
const coloredBar = document.querySelector('.colored_bar')
const seekBar = document.querySelector('.seek_bar')

const playVideo = () => {
  videoElem.play()
  playBtn.style.display = "none"
  pauseBtn.style.display = "block"
}

const pauseVideo = () => {
  videoElem.pause()
  pauseBtn.style.display = "none"
  playBtn.style.display = "block"
}

const expandScreen = () => {
  if (!videoElem.isFullscreen) {
    videoElem.requestFullscreen()
  }
}

const openSettings = () => {
  console.log("settings")
}

const toggleVolume = () => {
  if (videoElem.volume == 0) {
    videoElem.volume = 1
  } else {
    videoElem.volume = 0
  }
}

const convertToMinutes = (timeInMiliSeconds) => {
  const timeInSeconds = timeInMiliSeconds.toFixed(0)

  let hours = Math.floor(timeInSeconds / 3600)
  let minutes = Math.floor(timeInSeconds / 60) % 60
  let seconds = timeInSeconds % 60

  if (hours < 10) {
    hours = "0" + hours
  }
  if (minutes < 10) {
    minutes = "0" + minutes
  }
  if (seconds < 10) {
    seconds = "0" + seconds
  }

  let time = ""
  if (hours == "00") {
    time = minutes + ":" + seconds
  } else {
    time = hours + ":" + minutes + ":" + seconds
  }
  return time
}

const showTime = () => {
  const videoCurrentTime = convertToMinutes(videoElem.currentTime)

  // to prevent showing undefined for duration at first time
  videoElem.onloadedmetadata = function() {
    const videoDurationTime = convertToMinutes(videoElem.duration)
    timeDiv.innerText = `${videoCurrentTime}/${videoDurationTime}`
  };

  const videoDurationTime = convertToMinutes(videoElem.duration)
  timeDiv.innerText = `${videoCurrentTime}/${videoDurationTime}`
}

const updateTime = () => {
  setInterval(() => showTime(), 1000)
}

const showControls = () => {
  updateTime()
  controlsDiv.style.display = "flex"
}

const hideControls = () => {
  controlsDiv.style.display = "none"
}

const togglePlayingByMouse = () => {
  if (videoElem.paused) {
    videoElem.play()
    playBtn.style.display = "none"
    pauseBtn.style.display = "block"
  } else {
    videoElem.pause()
    pauseBtn.style.display = "none"
    playBtn.style.display = "block"
  }
}

const togglePlayingByKeyboard = (event) => {
  if (event.code == "Space") {
    if (videoElem.paused) {
      videoElem.play()
    } else {
      videoElem.pause()
    }
  }
}

const changeVolumeByScroll = (event) => {
  event= window.event || event;
  var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

  if (delta == 1 && videoElem.volume <= 0.95) { // scroll up
    videoElem.volume += 0.05
  } else if(delta == -1 && videoElem.volume >= 0.05) { // scroll down
    videoElem.volume -= 0.05
  }
  videoElem.volume = videoElem.volume.toFixed(2)
}

const updateSeekBar = () => {
  var colored = videoElem.currentTime / videoElem.duration
  coloredBar.style.width = colored * 100 + "%"
}

const changeVideoTime = (event) => {
  let toBeColored = event.offsetX / videoContainer.offsetWidth;
  videoElem.currentTime = toBeColored * videoElem.duration;
  coloredBar.style.width = toBeColored * 100 + '%';
}

controlsDiv.style.display = "none"
showTime()
videoElem.volume = 1
pauseBtn.style.display = "none"
coloredBar.style.width = "0%"

playBtn.addEventListener('click', playVideo)
pauseBtn.addEventListener('click', pauseVideo)
fullScreenBtn.addEventListener('click', expandScreen)
settings.addEventListener('click', openSettings)
volume.addEventListener('click', toggleVolume)
videoContainer.addEventListener('mouseover', showControls)
videoContainer.addEventListener('mouseout', hideControls)
videoElem.addEventListener('click', togglePlayingByMouse)
document.addEventListener('keydown', (event) => togglePlayingByKeyboard(event))
videoContainer.addEventListener('mousewheel', event => changeVolumeByScroll(event))
videoElem.addEventListener('timeupdate', updateSeekBar)
seekBar.addEventListener('click', (event) => changeVideoTime(event))