const videoElem = document.querySelector('video')
const playBtn = document.querySelector('.gg-play-button')
const pauseBtn = document.querySelector('.gg-play-pause')

const playVideo = () => {
  videoElem.play()
}

const pauseVideo = () => {
  videoElem.pause()
}

playBtn.addEventListener('click', playVideo)
pauseBtn.addEventListener('click', pauseVideo)
