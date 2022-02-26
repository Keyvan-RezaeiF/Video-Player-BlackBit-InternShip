const videoElem = document.querySelector('video')
const playBtn = document.querySelector('.gg-play-button')
const pauseBtn = document.querySelector('.gg-play-pause')
const fullScreenBtn = document.querySelector('.gg-assign')
const settings = document.querySelector('.gg-more')
const volume = document.querySelector('.gg-volume')
const buttons = document.querySelector('.buttons')
const videoContainer = document.querySelector('.video_container')

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

const showButtons = () => {
  buttons.style.display = "flex"
}

const hideButtons = () => {
  buttons.style.display = "none"
}

const togglePlaying = () => {
  if (videoElem.paused) {
    videoElem.play()
  } else {
    videoElem.pause()
  }
}

buttons.style.display = "none"

playBtn.addEventListener('click', playVideo)
pauseBtn.addEventListener('click', pauseVideo)
fullScreenBtn.addEventListener('click', expandScreen)
settings.addEventListener('click', openSettings)
volume.addEventListener('click', toggleVolume)
videoContainer.addEventListener('mouseover', showButtons)
videoContainer.addEventListener('mouseout', hideButtons)
videoElem.addEventListener('click', togglePlaying)