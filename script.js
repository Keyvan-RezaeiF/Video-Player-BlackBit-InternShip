const videoElem = document.querySelector('video')
const playBtn = document.querySelector('.gg-play-button-o')
const pauseBtn = document.querySelector('.gg-play-pause-o')
const fullScreenBtn = document.querySelector('.gg-assign')
const settingsBtn = document.querySelector('.gg-more')
const volume = document.querySelector('.gg-volume')
const buttons = document.querySelector('.buttons')
const videoContainer = document.querySelector('.video_container')
const timeDiv = document.querySelector('#time')
const controlsDiv = document.querySelector(".controls")
const coloredBar = document.querySelector('.colored_bar')
const seekBar = document.querySelector('.seek_bar')
const nextBtn = document.querySelector('.gg-play-track-next-o')
const prevBtn = document.querySelector('.gg-play-track-prev-o')
const reaplyBtn = document.querySelector('.replay_img')
const nextAfterFinishBtn = document.querySelector('.next_video_img')
const afterFinishDiv = document.querySelector('.after_finish')
const speedBtn = document.querySelector('#speed_menu')
const qualityBtn = document.querySelector('#quality_menu')
const speedMenu = document.querySelector('#speed_sub_menu')
const qualityMenu = document.querySelector('#quality_sub_menu')
const moreBtn = document.querySelector('.gg-more')
const moreOptions = document.querySelector('.more_options')
const initialSpeed = document.querySelector('#initial_speed')
const initialQuality = document.querySelector('#initial_quality')

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
    setTimeout(hideControls, 2000)
  } else {
    videoElem.pause()
    pauseBtn.style.display = "none"
    playBtn.style.display = "block"
    showControls()
  }
}

const togglePlayingByKeyboard = (event) => {
  if (event.code == "Space") {
    if (videoElem.paused) {
      videoElem.play()
      setTimeout(hideControls, 2000)
    } else {
      videoElem.pause()
      showControls()
    }
  }
}

const changeVolumeByScroll = (event) => {
  event = window.event || event;
  let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

  if (delta == 1 && videoElem.volume <= 0.95) { // scroll up
    videoElem.volume += 0.05
  } else if (delta == -1 && videoElem.volume >= 0.05) { // scroll down
    videoElem.volume -= 0.05
  }
  videoElem.volume = videoElem.volume.toFixed(2)
}

const updateSeekBar = () => {
  let colored = videoElem.currentTime / videoElem.duration
  coloredBar.style.width = colored * 100 + "%"
}

const changeVideoTime = (event) => {
  let toBeColored = event.offsetX / videoContainer.offsetWidth;
  videoElem.currentTime = toBeColored * videoElem.duration;
  coloredBar.style.width = toBeColored * 100 + '%';
}

const checkIfVideoFinished = () => {
  setInterval(() => {
    if (videoElem.currentTime == videoElem.duration) {
      pauseBtn.style.display = "none"
      playBtn.style.display = "block"
      videoElem.style.opacity = "0.3"
      afterFinishDiv.style.display = "flex"
      // go to next video after finishing current video
      // timeoutId = setTimeout(playNextVideo, 3000)
      // clearTimeout(timeoutId)
    }
  }, 1000)
}

const goBackOrForward = (event) => {
  if (event.code == "ArrowRight") {
    videoElem.currentTime += 5  
    updateTime()
  } else if (event.code == "ArrowLeft") {
    videoElem.currentTime -= 5
    updateTime()
  } else if (event.code == "ArrowUp") {
    if (videoElem.volume <= 0.95) {
      videoElem.volume += 0.05
    }
    videoElem.volume = videoElem.volume.toFixed(2)
  } else if (event.code == "ArrowDown") {
    if(videoElem.volume >= 0.05) {
      videoElem.volume -= 0.05
    }
    videoElem.volume = videoElem.volume.toFixed(2)
  }
}

const resetVideo = () => {
  videoElem.src = `./videos/${videos[currentVideoIndex]}`
  controlsDiv.style.display = "none"
  showTime()
  pauseBtn.style.display = "none"
  playBtn.style.display = "block"
  coloredBar.style.width = "0%"
  afterFinishDiv.style.display = "none"
  videoElem.style.opacity = "1"
  moreOptions.style.display = ""
}

const playNextVideo = () => {
  currentVideoIndex += 1
  currentVideoIndex %= videos.length
  resetVideo()
}

const playPrevVideo = () => {
  currentVideoIndex -= 1
  if (currentVideoIndex == -1) {
    currentVideoIndex = videos.length - 1
  }
  resetVideo()
}

const replayVideo = () => {
  videoElem.src = `./videos/${videos[currentVideoIndex]}`
  videoElem.currentTime = 0
  controlsDiv.style.display = "none"
  showTime()
  playVideo()
  pauseBtn.style.display = "block"
  playBtn.style.display = "none"
  coloredBar.style.width = "0%"
  afterFinishDiv.style.display = "none"
  videoElem.style.opacity = "1"
}

const toggleMenuOptions = (event, selectedMenu) => {
  if (selectedMenu.style.display == "") {
    selectedMenu.style.display = "block"
  } else if (selectedMenu.style.display == "block") {
    selectedMenu.style.display = ""
  }
}

const changeSelectedColor = (selectedElem) => {
  const parentsChildren = selectedElem.parentElement.children
  for (child of parentsChildren) {
    child.style.backgroundColor = "rgba(0, 0, 0, 0.4)"
  }
  selectedElem.style.backgroundColor = "rgba(0, 0, 0)"
}

const changeSpeed = (event) => {
  videoElem.playbackRate = event.target.innerText
  changeSelectedColor(event.target)
}

const changeQuality = (event) => {
  // To be completed later
}

// Initialization

const videos = ['dance.mp4', 'ha.mp4', 'jumong.mp4', 'kelas_uni.mp4',
                'khaarmaadar.mp4', 'kheiliHmAwli.mp4', 'monica.mp4',
                'navid.mp4', 'rohani.mp4', 'ronaldo.mp4', 'tasirgozar.mp4',
                'zakhmekari.mp4']
let currentVideoIndex = 0
videoElem.src = `./videos/${videos[0]}`

controlsDiv.style.display = "none"
showTime()
videoElem.volume = 1
pauseBtn.style.display = "none"
coloredBar.style.width = "0%"
afterFinishDiv.style.display = "none"

changeSelectedColor(initialSpeed)
changeSelectedColor(initialQuality)

checkIfVideoFinished()

// Event Listeners

playBtn.addEventListener('click', playVideo)
pauseBtn.addEventListener('click', pauseVideo)
fullScreenBtn.addEventListener('click', expandScreen)
volume.addEventListener('click', toggleVolume)
videoContainer.addEventListener('mouseover', showControls)
videoContainer.addEventListener('mouseout', hideControls)
videoElem.addEventListener('click', togglePlayingByMouse)
document.addEventListener('keydown', (event) => togglePlayingByKeyboard(event))
videoContainer.addEventListener('mousewheel', event => changeVolumeByScroll(event))
videoElem.addEventListener('timeupdate', updateSeekBar)
seekBar.addEventListener('click', (event) => changeVideoTime(event))
document.addEventListener('keydown', (event) => goBackOrForward(event))
nextBtn.addEventListener('click', playNextVideo)
prevBtn.addEventListener('click', playPrevVideo)
reaplyBtn.addEventListener('click', replayVideo)
nextAfterFinishBtn.addEventListener('click', playNextVideo)
qualityBtn.addEventListener('click', (event) => toggleMenuOptions(event, qualityMenu))
speedBtn.addEventListener('click', (event) => toggleMenuOptions(event, speedMenu))
settingsBtn.addEventListener('click', (event) => toggleMenuOptions(event, moreOptions))
speedMenu.addEventListener('click', (event) => changeSpeed(event))
qualityMenu.addEventListener('click', (event) => changeQuality(event))