console.log('Welcome to Spotify');

let song_index = 0;
let audio_element = new Audio('/songs/1.mp3');
let masterPlay = document.getElementById('master_play');
let progress_bar = document.getElementById('progress_bar');
let playingSong = document.getElementById('playing');
let songItems = Array.from(document.getElementsByClassName('song-item'));
let currentSong = document.getElementById('current_song');

// SONG LIST:
let songs = [
    {song_name:"Flare - Slowed", file_path:"/songs/1.mp3", cover_path:"/covers/1.jpg"},
    {song_name:"Viva La Vida", file_path:"/songs/2.mp3", cover_path:"/covers/2.jpg"},
    {song_name:"Way down we go", file_path:"/songs/3.mp3", cover_path:"/covers/3.jpg"},
    {song_name:"Daylight", file_path:"/songs/4.mp3", cover_path:"/covers/4.jpg"},
    {song_name:"The Search", file_path:"/songs/5.mp3", cover_path:"/covers/5.jpg"},
    {song_name:"Dont you worry child", file_path:"/songs/6.mp3", cover_path:"/covers/6.jpg"},
    {song_name:"Brother", file_path:"/songs/7.mp3", cover_path:"/covers/7.jpg"},
    {song_name:"Bones", file_path:"/songs/8.mp3", cover_path:"/covers/8.jpg"},
    {song_name:"Fire again", file_path:"/songs/9.mp3", cover_path:"/covers/9.jpg"},
    {song_name:"Rolling in the deep", file_path:"/songs/10.mp3", cover_path:"/covers/10.jpg"}
];

//SETTING SONG COVERS:
songItems.forEach((element , i)=>{
    // console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].cover_path;
    element.getElementsByTagName("span")[1].innerText = songs[i].song_name;
});

// PLAY/PAUSE MUSIC:
masterPlay.addEventListener('click' , ()=>{
    //PRESS PLAY:
    if(audio_element.paused||audio_element.currentTime==0){
        audio_element.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playingSong.style.opacity = 1;
        currentSong.innerText = songs[song_index].song_name;
        currentSong.style.opacity = 1;

        //CHANGE SONG PLAY ICON:
        let songPlayedId = document.getElementById(song_index+1);
        // console.log(songPlayedId);
        songPlayedId.classList.remove('fa-circle-play');
        songPlayedId.classList.add('fa-circle-pause');
    }
    //PRESS PAUSE:
    else{
        audio_element.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        playingSong.style.opacity = 0;
        pauseAllSongs();
        currentSong.style.opacity = 0;
    }
});

//SONG PROGRESS:
audio_element.addEventListener('timeupdate',()=>{
    //CALCULATE PROGRESS:
    let progress = parseInt((audio_element.currentTime/audio_element.duration)*100);
    //UPDATE SLIDER:
    progress_bar.value = progress;
});

//SLIDER PROGRESS UPDATED
progress_bar.addEventListener('change',()=>{
    //CALCULATE SLIDER:
    let newProgress = (progress_bar.value/100)*audio_element.duration;
    console.log(newProgress);
    //UPDATE PROGRESS:
    audio_element.currentTime = newProgress;
})

//PAUSE ALL OTHER SONGS:
pauseAllSongs = ()=>{
    Array.from(document.getElementsByClassName("play_song")).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    });
};

//PLAY/PAUSE INDIVIDUAL SONGS:
Array.from(document.getElementsByClassName("play_song")).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        // console.log(e.target.id+' '+(song_index+1));
        if(song_index+1==e.target.id && !audio_element.paused)
        {
            audio_element.pause();
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            masterPlay.classList.remove('fa-circle-pause');
            masterPlay.classList.add("fa-circle-play");
            playingSong.style.opacity = 0;
            currentSong.style.opacity = 0;
        }
        else
        {
            //CONVERT ALL OTHERS INTO PLAY BUTTONS:
            pauseAllSongs();
            //CONVERT INTO PAUSE BUTTON:
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            song_index = parseInt(e.target.id)-1;
            audio_element.src = songs[song_index].file_path;
            audio_element.play();
            masterPlay.classList.remove('fa-circle-play');
            masterPlay.classList.add("fa-circle-pause");
            playingSong.style.opacity=1;
            currentSong.innerText = songs[song_index].song_name;
            currentSong.style.opacity = 1;
        }
    });
});


//PREVIOUS BUTTON:
document.getElementById('prev_song').addEventListener('click',()=>{
    audio_element.pause();

    //CHANGE PLAY/PAUSE BUTTON BEFORE MOVING TO PREV SONG
    let currentSongPlaying = document.getElementById(song_index+1);
    // console.log(songPlayedId);
    currentSongPlaying.classList.remove('fa-circle-pause');
    currentSongPlaying.classList.add('fa-circle-play');

    if(song_index>0){song_index--;}
    audio_element.src = songs[song_index].file_path;
    audio_element.currentTime=0;
    audio_element.play();
    
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    playingSong.style.opacity = 1;
    currentSong.innerText = songs[song_index].song_name;
    currentSong.style.opacity = 1;

    //CHANGE SONG PLAY ICON:
    let songPlayedId = document.getElementById(song_index+1);
    // console.log(songPlayedId);
    songPlayedId.classList.remove('fa-circle-play');
    songPlayedId.classList.add('fa-circle-pause');
});

//NEXT BUTTON:
document.getElementById('next_song').addEventListener('click',()=>{
    audio_element.pause();

    //CHANGE PLAY/PAUSE BUTTON BEFORE MOVING TO NEXT SONG
    let currentSongPlaying = document.getElementById(song_index+1);
    // console.log(songPlayedId);
    currentSongPlaying.classList.remove('fa-circle-pause');
    currentSongPlaying.classList.add('fa-circle-play');

    if(song_index>9){
        song_index=0;
    }
    else{
        song_index += 1;
    }
    audio_element.src = songs[song_index].file_path;
    audio_element.currentTime=0;
    audio_element.play();

    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    playingSong.style.opacity = 1;
    currentSong.innerText = songs[song_index].song_name;
    currentSong.style.opacity = 1;

    //CHANGE SONG PLAY ICON:
    let songPlayedId = document.getElementById(song_index+1);
    // console.log(songPlayedId);
    songPlayedId.classList.remove('fa-circle-play');
    songPlayedId.classList.add('fa-circle-pause');

});
