const videoElem = document.querySelector('video')
const playBtn = document.querySelector('.play_btn')
const pauseBtn = document.querySelector('.pause_btn')
const fullScreenBtn = document.querySelector('.full_screen')
const volumeUp = document.querySelector('.volume_2')
const volumeDown = document.querySelector('.volume_1')
const volumeMute = document.querySelector('.volume_0')
const volumeOff = document.querySelector('.volume_mute')
const videoContainer = document.querySelector('.video_container')
const timeDiv = document.querySelector('#time')
const controlsDiv = document.querySelector(".controls")
const coloredBar = document.querySelector('.colored_bar')
const seekBar = document.querySelector('.seek_bar')
const nextBtn = document.querySelector('.next_btn')
const prevBtn = document.querySelector('.prev_btn')
const repalyBtn = document.querySelector('.replay_img')
const nextAfterFinishBtn = document.querySelector('.next_video_img')
const afterFinishDiv = document.querySelector('.after_finish')
const volumeInput = document.querySelector('#vol_range')
const prevImg = document.querySelector('#prev_img')
const nextImg = document.querySelector('#next_img')
const adBanner = document.querySelector('.ad_container')
const closeAdBtn = document.querySelector('.close_ad_btn')
const settings = document.querySelector('#settings')
const settingsBtn = document.querySelector('.settings_btn')
const speedBtn = document.querySelector('#speed_menu')
const speedMenu = document.querySelector('#speed_sub_menu')
const qualityBtn = document.querySelector('#quality_menu')
const qualityMenu = document.querySelector('#quality_sub_menu')
const initialQuality = document.querySelector('#initial_quality')

const playVideo = () => {
  hideAdBanner()
  videoElem.play()
  hideThumblains()
  playBtn.style.display = "none"
  pauseBtn.style.display = "block"
}

const pauseVideo = () => {
  videoElem.pause()
  showAdBanner()
  pauseBtn.style.display = "none"
  playBtn.style.display = "block"
}

const expandScreen = () => {
  if (!videoElem.isFullscreen) {
    videoElem.requestFullscreen()
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
    console.log(videoElem.duration)
    const videoDurationTime = convertToMinutes(videoElem.duration)
    timeDiv.innerText = `${videoCurrentTime} / ${videoDurationTime}`
  };

  // const videoDurationTime = convertToMinutes(videoElem.duration)
  // timeDiv.innerText = `${videoCurrentTime} / ${videoDurationTime}`
}

const updateTime = () => {
  setInterval(() => showTime(), 1000)
}

const showControls = () => {
  updateTime()
}

const togglePlayingByMouse = () => {
  if (videoElem.paused) {
    hideAdBanner()
    videoElem.play()
    playBtn.style.display = "none"
    pauseBtn.style.display = "block"
  } else {
    videoElem.pause()
    showAdBanner()
    pauseBtn.style.display = "none"
    playBtn.style.display = "block"
    showControls()
  }
  hideThumblains()
}

const togglePlayingByKeyboard = (event) => {
  if (event.code == "Space") {
    if (videoElem.paused) {
      hideAdBanner()
      videoElem.play()
      playBtn.style.display = "none"
      pauseBtn.style.display = "block"
    } else {
      videoElem.pause()
      showAdBanner()
      pauseBtn.style.display = "none"
      playBtn.style.display = "block"
      showControls()
    }
    hideThumblains()
  }
}

const changeVolumeByScroll = (event) => {
  event = window.event || event;
  let delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));

  lastVolume = videoElem.volume
  if (delta == 1 && videoElem.volume <= 0.95) { // scroll up
    videoElem.volume += 0.05
  } else if (delta == -1 && videoElem.volume >= 0.05) { // scroll down
    videoElem.volume -= 0.05
  }
  videoElem.volume = videoElem.volume.toFixed(2)
  volumeInput.value = videoElem.volume
  changeVolumeIcon()
}

const changeVolumeByRange = (newVolume) => {
  lastVolume = videoElem.volume
  videoElem.volume = newVolume
  changeVolumeIcon()
}

const changeVolumeIcon = () => {
  if (videoElem.volume >= 0.5) {
    volumeUp.style.display = "block"
    volumeDown.style.display = "none"
    volumeOff.style.display = "none"
    volumeMute.style.display = "none"
  } else if (videoElem.volume > 0) {
    volumeUp.style.display = "none"
    volumeDown.style.display = "block"
    volumeOff.style.display = "none"
    volumeMute.style.display = "none"
  } else if (videoElem.volume == 0) {
    volumeUp.style.display = "none"
    volumeDown.style.display = "none"
    volumeOff.style.display = "none"
    volumeMute.style.display = "block"
  }
}

const toggleVolumeMenu = (event) => {
  if (event.target.innerText == "volume_up" ||
    event.target.innerText == "volume_down" ||
    event.target.innerText == "volume_mute") {
    event.target.style.display = "none"
    volumeOff.style.display = "block"
    lastVolume = videoElem.volume
    videoElem.volume = 0
    volumeInput.value = videoElem.volume
  } else {
    volumeOff.style.display = "none"
    videoElem.volume = lastVolume
    changeVolumeIcon()
    volumeInput.value = videoElem.volume
  }
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

const hideThumblains = () => {
  prevImg.style.display = "none"
  nextImg.style.display = "none"
}

const showThumblains = () => {
  let prevImgIndex, nextImgIndex
  if (currentVideoIndex == 0) {
    prevImgIndex = videos.length - 1
    nextImgIndex = currentVideoIndex + 1
  } else if (currentVideoIndex == videos.length - 1) {
    prevImgIndex = currentVideoIndex - 1
    nextImgIndex = 0
  } else {
    prevImgIndex = currentVideoIndex - 1
    nextImgIndex = currentVideoIndex + 1
  }
  prevImg.src = `./images/${posters[prevImgIndex]}`
  prevImg.style.display = "block"
  nextImg.src = `./images/${posters[nextImgIndex]}`
  nextImg.style.display = "block"
}

const checkIfVideoFinished = () => {
  setInterval(() => {
    if (videoElem.currentTime == videoElem.duration) {
      pauseBtn.style.display = "none"
      playBtn.style.display = "block"
      videoElem.style.opacity = "0.3"
      afterFinishDiv.style.display = "flex"
      showThumblains()
    } else {
      videoElem.style.opacity = "1"
      afterFinishDiv.style.display = "none"
    }
  }, 100)
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
      lastVolume = videoElem.volume
      videoElem.volume += 0.05
    }
    videoElem.volume = videoElem.volume.toFixed(2)
    changeVolumeIcon()
    volumeInput.value = videoElem.volume
  } else if (event.code == "ArrowDown") {
    if (videoElem.volume >= 0.05) {
      lastVolume = videoElem.volume
      videoElem.volume -= 0.05
    }
    videoElem.volume = videoElem.volume.toFixed(2)
    changeVolumeIcon()
    volumeInput.value = videoElem.volume
  }
}

const resetVideo = () => {
  videoElem.src = `./videos/${videos[currentVideoIndex]}`
  showTime()
  pauseBtn.style.display = "none"
  playBtn.style.display = "block"
  coloredBar.style.width = "0%"
  afterFinishDiv.style.display = "none"
  videoElem.style.opacity = "1"
  settings.style.display = ""
}

const showVideoPoster = () => {
  videoElem.poster = `./images/${posters[currentVideoIndex]}`
}

const playNextVideo = () => {
  currentVideoIndex += 1
  currentVideoIndex %= videos.length
  hideThumblains()
  hideAdBanner()
  resetVideo()
  showVideoPoster()
}

const playPrevVideo = () => {
  currentVideoIndex -= 1
  if (currentVideoIndex == -1) {
    currentVideoIndex = videos.length - 1
  }
  hideThumblains()
  hideAdBanner()
  resetVideo()
  showVideoPoster()
}

const replayVideo = () => {
  videoElem.src = `./videos/${videos[currentVideoIndex]}`
  videoElem.currentTime = 0
  showTime()
  playVideo()
  pauseBtn.style.display = "block"
  playBtn.style.display = "none"
  coloredBar.style.width = "0%"
  afterFinishDiv.style.display = "none"
  videoElem.style.opacity = "1"
  hideThumblains()
}

const toggleMenuOptions = (event, selectedMenu) => {
  if (selectedMenu.style.display == "") {
    selectedMenu.style.display = "block"
  } else if (selectedMenu.style.display == "block") {
    selectedMenu.style.display = ""
  }
}

const changeSpeed = (event) => {
  const selectedItem = event.target
  if (selectedItem.innerText == "Normal") {
    videoElem.playbackRate = "1"
  } else {
    videoElem.playbackRate = selectedItem.innerText
  }
  const parentsChildren = selectedItem.parentElement.children
  for (child of parentsChildren) {
    child.classList.remove('active')
  }
  selectedItem.classList.add('active')
}

const changeQuality = (event) => {
  // To be completed later
}

const showAdBanner = () => {
  adBanner.style.display = "block"
}

const hideAdBanner = () => {
  adBanner.style.display = "none"
}

// Initialization

const videos = ['khaarmaadar.mp4', 'dance.mp4', 'ha.mp4', 'jumong.mp4',
                'kelas_uni.mp4', 'kheiliHmAwli.mp4', 'monica.mp4','navid.mp4',
                'rohani.mp4', 'ronaldo.mp4', 'tasirgozar.mp4', 'zakhmekari.mp4']
let currentVideoIndex = 0
videoElem.src = `./videos/${videos[0]}`

const posters = ['khaarmadar.jpg', 'dance.jpg', 'ha.jpg', 'jumong.jpg',
                 'kelas_uni.jpg', 'kheiliHmAwli.jpg', 'monica.jpg','navid.jpg',
                 'rohani.jpg', 'ronaldo.jpg', 'tasirgozar.jpg', 'zakhmekari.jpg']
videoElem.poster = `./images/${posters[0]}`

// controlsDiv.style.display = "none"
showTime()
videoElem.volume = 1
let lastVolume = videoElem.volume
pauseBtn.style.display = "none"
coloredBar.style.width = "0%"
afterFinishDiv.style.display = "none"

checkIfVideoFinished()

// Event Listeners

playBtn.addEventListener('click', playVideo)
pauseBtn.addEventListener('click', pauseVideo)
fullScreenBtn.addEventListener('click', expandScreen)
volumeUp.addEventListener('click', event => toggleVolumeMenu(event))
volumeDown.addEventListener('click', event => toggleVolumeMenu(event))
volumeMute.addEventListener('click', event => toggleVolumeMenu(event))
volumeOff.addEventListener('click', event => toggleVolumeMenu(event))
videoContainer.addEventListener('mouseover', showControls)
videoElem.addEventListener('click', togglePlayingByMouse)
document.addEventListener('keydown', (event) => togglePlayingByKeyboard(event))
videoElem.addEventListener('mousewheel', event => changeVolumeByScroll(event))
videoElem.addEventListener('timeupdate', updateSeekBar)
seekBar.addEventListener('click', (event) => changeVideoTime(event))
document.addEventListener('keydown', (event) => goBackOrForward(event))
nextBtn.addEventListener('click', playNextVideo)
prevBtn.addEventListener('click', playPrevVideo)
repalyBtn.addEventListener('click', replayVideo)
nextAfterFinishBtn.addEventListener('click', playNextVideo)
closeAdBtn.addEventListener('click', hideAdBanner)
prevImg.addEventListener('click', playPrevVideo)
nextImg.addEventListener('click', playNextVideo)
settingsBtn.addEventListener('click', (event) => toggleMenuOptions(event, settings))
speedBtn.addEventListener('click', (event) => toggleMenuOptions(event, speedMenu))
speedMenu.addEventListener('click', (event) => changeSpeed(event))
qualityBtn.addEventListener('click', (event) => toggleMenuOptions(event, qualityMenu))
qualityMenu.addEventListener('click', (event) => changeQuality(event))