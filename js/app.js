
 const btnPlay = document.querySelector('.controls_play');
 const btnBack = document.querySelector('.controls_back');
 const btnNext = document.querySelector('.controls_next');
 const audioSong = document.querySelector('.audio');
 const isPlaying = true;
 btnPlay.addEventListener('click', play);               
 function play() {            
     if (isPlaying) {
         audioSong.play(); 
         isPlaying = false;               
     }else {
         audioSong.pause();     
         isPlaying = true;           
     }
     console.log(isPlaying)
 }