$(function () {
    var audio = new (Audio)
    console.log(audio);
    var timeBarRange = document.createElement('input')
    console.log(timeBarRange);
    timeBarRange.type = 'range';
    timeBarRange.value = '0';
    timeBarRange.step = '1';
    timeBarRange.min = '0';
    timeBarRange.max = '100';
    $('body').append(audio);
    $('.music_timeBar .range').append(timeBarRange)
    var srcMusic = [
        'SaiLamCuaAnh.mp3',
        'TinhYeuMauHong.mp3',
        'DongPhaiMoDangAi.mp3',
        'ThuongTham.mp3',
        'DuongToiChoEmVe.mp3'
    ];
    var srcAvatar = [
        'SaiLamCuaAnh.jpg',
        'TinhYeuMauHong.jpg',
        'DongPhaiMoDangAi.jpg',
        'ThuongTham.jpg',
        'DuongToiChoEmVe.jpg'
    ];
    var nameMusic = [
        'Sai lầm của anh',
        'Tình yêu màu hồng',
        'Đông phai mờ dáng ai',
        'Thương thầm',
        'Đường tôi chở em về'
    ];
    var indexMusic = 0;
    var lengthMusic = srcMusic.length;
    $('audio').attr('src', 'source/' + srcMusic[indexMusic]);
    $('.music_avatar .img img').attr('src', 'images/' + srcAvatar[indexMusic]);
    $('.music_name strong').text(nameMusic[indexMusic]);
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
        $('.music_name strong').text(nameMusic[indexMusic]);
        pause();
        console.log('stt:' + indexMusic + "_" + srcMusic[indexMusic])
        $('audio').attr('src', 'source/' + srcMusic[indexMusic]);
        $('.music_avatar .img img').attr('src', 'images/' + srcAvatar[indexMusic]);
    }
    //play pause
    var isPlaying = true;
    $('.controls_play').click(function () {    
        isPlaying ? play() : pause();
    })
    function play() {
        audio.play();
        $('.music_avatar .img').addClass('active_avatar');
        $('.controls_play i').addClass('bx-pause');
        $('.controls_play i').removeClass('bx-play');
        isPlaying = false;
    }
    function pause() {
        audio.pause();
        $('.music_avatar .img').removeClass('active_avatar');
        $('.controls_play i').removeClass('bx-pause');
        $('.controls_play i').addClass('bx-play');
        isPlaying = true;
    }
    //next song back song
    $('.controls_next').click(function () {
        changeMusic(1);
        play();
    })
    $('.controls_back').click(function () {
        changeMusic(-1);
        play();
    })
    //volume
    $('.volume .tang').click(function () {
        changeVolume(1);
    })
    $('.volume .giam').click(function () {
        changeVolume(-1);
    })
    function changeVolume(dr) {
        if (dr === 1) {
            if (audio.volume < 1) {
                audio.volume += 0.1;
            } else {
                audio.volume = 1;
            }
        } else if (dr === -1) {
            if (audio.volume > 0) {
                audio.volume -= 0.1;
            } else {
                audio.volume = 0;
            }
        }
        // document.querySelector('.rangeVolume p').style.display = 'block';
        // var haha = setInterval(() => {
        //     var ha = document.querySelector('.rangeVolume p').style.display = 'none';
        //     console.log('haha')
        //     clearInterval(ha)
        // }, 5000);
    }

    //thanh tua        
    audio.ontimeupdate = function () {
        const audioPercent = Math.floor(audio.currentTime / audio.duration * 100);
        timeBarRange.value = audioPercent;
        $('.time_end span').text(Math.floor(audio.duration))
        $('.time_start span').text(Math.floor(audio.currentTime))
        if (audio.currentTime >= audio.duration) {
            changeMusic(1);
            play();
        }
    }
    timeBarRange.onchange = function (e) {
        audio.currentTime = audio.duration / 100 * e.target.value;
    }
})    