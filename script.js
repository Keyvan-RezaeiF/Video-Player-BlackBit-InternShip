const videoElem = document.querySelector('video')
const playBtn = document.querySelector('.gg-play-button')
const pauseBtn = document.querySelector('.gg-play-pause')
const fullScreenBtn = document.querySelector('.gg-assign')
const settings = document.querySelector('.gg-more')
const volume = document.querySelector('.gg-volume')
const buttons = document.querySelector('.buttons')
const videoContainer = document.querySelector('.video_container')
const timeDiv = document.querySelector('#time')

const playVideo = () => {
  videoElem.play()
}

const pauseVideo = () => {
  videoElem.pause()
}

const expandScreen = () => {
  videoElem.requestFullscreen()
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
  let minutes = Math.floor(timeInSeconds / 60)
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

  const time = hours + ":" + minutes + ":" + seconds
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

const showButtons = () => {
  updateTime()
  buttons.style.display = "flex"
}

const hideButtons = () => {
  buttons.style.display = "none"
}

const togglePlayingByMouse = () => {
  if (videoElem.paused) {
    videoElem.play()
  } else {
    videoElem.pause()
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

buttons.style.display = "none"
showTime()

playBtn.addEventListener('click', playVideo)
pauseBtn.addEventListener('click', pauseVideo)
fullScreenBtn.addEventListener('click', expandScreen)
settings.addEventListener('click', openSettings)
volume.addEventListener('click', toggleVolume)
videoContainer.addEventListener('mouseover', showButtons)
videoContainer.addEventListener('mouseout', hideButtons)
videoElem.addEventListener('click', togglePlayingByMouse)
document.addEventListener('keydown', (event) => togglePlayingByKeyboard(event))