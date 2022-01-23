"use strict";
const $ = document.querySelector.bind(document);
const eleAvatar = $('.music_avatar .img');
const eleAvatarImg = $('.music_avatar .img img');
const musicName = $('.music_name strong');
const rangeVolume = $('#rangeVolume');
const controlsPlay = $('.controls_play i')
const audio = new(Audio);
// const audio = $('.range audio');
// const range = $('.music_timeBar .range .inputRange');
$('body').append(audio);
const range = document.createElement('input');
range.type = 'range';
range.value = 0;
range.min = 0;
range.max = 100;
range.step = 1;
$('.range').append(range)
const music = [
    {
        name: 'Sai lầm của anh',
        src: 'SaiLamCuaAnh.mp3',
        img: 'SaiLamCuaAnh.jpg',
        nameSinger: 'Lê Bảo Bình',
    },
    {
        name: 'Tình yêu màu hồng',
        src: 'TinhYeuMauHong.mp3',
        img: 'TinhYeuMauHong.jpg',
        nameSinger: 'Hồ Văn Quí',
    },
    {
        name: 'Đông phai mờ dáng ai',
        src: 'DongPhaiMoDangAi.mp3',
        img: 'DongPhaiMoDangAi.jpg',
        nameSinger: 'Datkka',
    },
    {
        name: 'Thương thầm',
        src: 'ThuongTham.mp3',
        img: 'ThuongTham.jpg',
        nameSinger: 'Hoài Bảo',
    },
    {
        name: 'Đường tôi chở em về',
        src: 'DuongToiChoEmVe.mp3',
        img: 'DuongToiChoEmVe.jpg',
        nameSinger: 'Phát Huy',
    }
]
let indexMusic = 0;
const lengthMusic = music.length;
audio.setAttribute('src', 'source/' + music[indexMusic].src);
eleAvatarImg.setAttribute('src', 'images/' + music[indexMusic].img);
musicName.innerText = music[indexMusic].name;
function changeMusic(dr) {
    if (dr === 1) {        
        indexMusic++;
        if (indexMusic >= lengthMusic) {
            indexMusic = 0;
        }
    } else if (dr === -1) {
        indexMusic--;
        if (indexMusic < 0) {
            indexMusic = lengthMusic - 1;
        }
    }    
    musicName.innerText = music[indexMusic].name;
    pause();
    audio.setAttribute('src', 'source/' + music[indexMusic].src);
    eleAvatarImg.setAttribute('src', 'images/' + music[indexMusic].img);
    renderList();
}
//play pause
let isPlaying = true;
$('.controls_play').onclick = function () {
    isPlaying ? play() : pause();
}
const RotateAvatar = eleAvatar.animate([
    { transform: 'rotate(0deg)' },
    { transform: 'rotate(360deg)' },
], {
    duration: 10000,
    iterations: Infinity
});
RotateAvatar.pause();
function play() {
    audio.play();
    // eleAvatar.animate([
    //     { transform: 'rotate(360deg)' }
    // ], {
    //     duration: 1000,
    //     iterations: Infinity
    // });       
    RotateAvatar.play();
    controlsPlay.classList.add('bx-pause');
    controlsPlay.classList.remove('bx-play');
    isPlaying = false;
}
function pause() {
    audio.pause();
    RotateAvatar.pause();
    controlsPlay.classList.remove('bx-pause');
    controlsPlay.classList.add('bx-play');
    isPlaying = true;
}
//next song back song
$('.controls_next').onclick = function () {
    changeMusic(1);
    play();
}
$('.controls_back').onclick = function () {
    changeMusic(-1);
    play();
}
//volume
$('.volume .tang').onclick = function () {
    changeVolume(1);
}
$('.volume .giam').onclick = function () {
    changeVolume(-1);
}
function changeVolume(dr) {
    if (dr === 1) {
        if (audio.volume < 1) {
            audio.volume += 0.1;
        }    
    } else if (dr === -1) {
        if (audio.volume > 0) {
            audio.volume -= 0.1;
        }
    }
    rangeVolume.value = Math.floor(audio.volume * 100)
    rangeVolume.style.left = 0;    
    if (rangeVolume.style.left == '0px') {
        setTimeout(function () {
            rangeVolume.style.left = '-100px';                                    
        },3000)                
    }    
    // document.querySelector('.rangeVolume p').style.display = 'block';
    // const haha = setInterval(() => {
    //     const ha = document.querySelector('.rangeVolume p').style.display = 'none';
    //     console.log('haha')
    //     clearInterval(ha)
    // }, 5000);
}
//thanh tua   
audio.ontimeupdate = function () {
    const audioPercent = Math.floor(audio.currentTime / audio.duration * 100);
    range.value = audioPercent;
    const minutesCurrentTime = Math.floor(audio.currentTime / 60);
    const secondsCurrentTime = audio.currentTime % 60;
    const minutesDuration = Math.floor(audio.duration / 60);
    const secondsDuration = audio.duration % 60;
    $('.time_end span').innerText = `${isNaN(minutesDuration) ? '3' : Math.floor(minutesDuration)}:${isNaN(secondsDuration) ? '00' : Math.floor(secondsDuration)}`
    $('.time_start span').innerText = `${Math.floor(minutesCurrentTime)}:${Math.floor(secondsCurrentTime)}`
}
audio.onended = function () {
    changeMusic(1);
    play();
}
range.oninput = function (e) {
    audio.currentTime = audio.duration / 100 * e.target.value;
}
//map list card music
const eleSong = $('.listSong');
function renderList() {
    const htmls = music.map((song, index) => {
        return (
            `
                <div class='itemSong ${index == indexMusic ? 'active' : ''}' data-index='${index}'>
                    <div class='songImg'>
                        <img src=images/${song.img} />
                    </div>
                    <div class='songText'>
                        <strong>${song.name}</strong>
                        <p>${song.nameSinger}</p>
                    </div>    
                </div>
            `
        )
    })
    const html = htmls.join("");
    eleSong.innerHTML = html;
}
renderList()
eleSong.onclick = function (e) {
    if (!e.target.closest('.itemSong.active')) {
        const index = e.target.closest('.itemSong').dataset.index;
        indexMusic = Number(index) - 1;
        changeMusic(1);
        play();
    }
}
