const songs = [
	{
		name: `хворий фонк`,
		artist: `UNKNOWN`,
		path: `music/хворий фонк.mp3`,
		cover: `img/unknown 2.jpg`
	}, 
	{
		name: `Ревную`,
		artist: `LIZA EVANS`,
		path: `music/Ревную.mp3`,
		cover: `img/liza evans.jpg`
	}, 
	{
		name: `Phonk Web`,
		artist: `DXRK`,
		path: `music/Phonk Web.mp3`,
		cover: `img/dxrk.jpg`
	}, 
	{
		name: `На грани болевого порога`,
		artist: `PLANKA`,
		path: `music/На грани болевого порога.mp3`,
		cover: `img/planka.jpg`
	}, 
	{
		name: `Rory in early 20s`,
		artist: `UNKNOWN`,
		path: `music/Rory in early 20s.mp3`,
		cover: `img/unknown 2.jpg`
	},

	// new 
	{
		name: `Я хотел бы знать`,
		artist: `Кравц`,
		path: `music/я хотел бы знать.mp3`,
		cover: `img/kravts.jpg` //none
	}, 
	{
		name: `Чайный пьяница`,
		artist: `GUF`,
		path: `music/ЧП.mp3`,
		cover: `img/GUF.jpg` //none
	},
	{
		name: `Boys don't cry`,
		artist: `Gone Fludd`,
		path: `music/Boys dont cry.mp3`,
		cover: `img/gone fludd 1.jpg` //none
	},
	{
		name: `Дрипсэт`,
		artist: `Gone Fludd`,
		path: `music/Дрипсет.mp3`,
		cover: `img/gone fludd 2.jpg` // none
	}, 
	{
		name: `Lost Soul (slowed)`,
		artist: `NBSPLV`,
		path: `music/lostsoul.mp3`,
		cover: `img/NBSPLV.jpg` // none
	}
	
	
]

const audio = document.querySelector('audio')
const inputSlider = document.querySelector('.input-slider')
const inputVolume = document.querySelector('.input-volume')

const playBtn = document.querySelector('.fa-circle-play')
const pauseBtn = document.querySelector('.fa-circle-pause')
const backwardBtn = document.querySelector('.fa-backward-step')
const forwardBtn = document.querySelector('.fa-forward-step')

const time = (t) => {
	let min = Math.floor(t / 60)
	if (min < 10) min = `0` + min

	let sec = Math.floor(t % 60)
	if (sec < 10) sec = `0` + sec
	return `${min} : ${sec}`
}

const setMusic = (key) => {
	const song = songs[key]
	audio.src = song.path
	document.querySelector('.img img').src = song.cover
	document.querySelector('.name h1').innerHTML = song.artist
	document.querySelector('.name p').innerHTML = song.name
	setTimeout(() => {
		inputSlider.max = audio.duration
		document.querySelector('.time-two').innerHTML = time(audio.duration)
	}, 300)
	audio.volume = inputVolume.value / 100
}

setMusic(0)
playBtn.onclick = () => {
	audio.play()
	playBtn.classList.add('button-hide')
	pauseBtn.classList.remove('button-hide')
}

pauseBtn.onclick = () => {
	audio.pause()
	pauseBtn.classList.add('button-hide')
	playBtn.classList.remove('button-hide')
}

inputVolume.addEventListener('input', () => {
	audio.volume = inputVolume.value / 100
})

let music = 0

backwardBtn.onclick = () => {
	if (music <= 0) music = songs.length - 1

	else music--
	setMusic(music)
	playBtn.click()
}

forwardBtn.onclick = () => {
	if (music >= songs.length - 1) music = 0

	else music++
	setMusic(music)
	playBtn.click()
}

setInterval(() => {
	inputSlider.value = audio.currentTime
	document.querySelector('.time-one').innerHTML = time(audio.currentTime)
	if (audio.currentTime == inputSlider.max) forwardBtn.click()
}, 500)

inputSlider.addEventListener('change', () => {
	audio.currentTime = inputSlider.value
})