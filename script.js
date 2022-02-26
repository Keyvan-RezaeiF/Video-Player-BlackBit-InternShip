const videoElem = document.querySelector('video')
const playBtn = document.querySelector('.gg-play-button')
const pauseBtn = document.querySelector('.gg-play-pause')
const fullScreenBtn = document.querySelector('.gg-assign')
const settings = document.querySelector('.gg-more')

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

playBtn.addEventListener('click', playVideo)
pauseBtn.addEventListener('click', pauseVideo)
fullScreenBtn.addEventListener('click', expandScreen)
settings.addEventListener('click', openSettings)
