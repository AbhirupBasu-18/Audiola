//initializing the variables

let songNumber=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('progressBar');
let songIn=document.getElementById("songInfo");
let gifinfo=document.getElementById("gif");
let loopSign=document.getElementById("loopicon");
let name1=document.getElementById("info");
let loop=0;

//initializing the songlist
let song=[
    {songname:"Kesariya",filepath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {songname:"Vaaste",filepath:"songs/2.mp3",coverPath:"covers/2.jpg"},
    {songname:"Apna Bana Le",filepath:"songs/3.mp3",coverPath:"covers/3.jpg"},
    {songname:"Maan Meri Jaan",filepath:"songs/4.mp3",coverPath:"covers/4.jpg"},
    {songname:"Calm Down",filepath:"songs/5.mp3",coverPath:"covers/5.jpg"},
    {songname:"Rasiya",filepath:"songs/6.mp3",coverPath:"covers/6.jpg"},
    {songname:"Pasoori",filepath:"songs/7.mp3",coverPath:"covers/7.jpg"},
    {songname:"Shape of You",filepath:"songs/8.mp3",coverPath:"covers/8.jpg"},
    {songname:"Mood",filepath:"songs/9.mp3",coverPath:"covers/9.jpg"},
    {songname:"Shayad",filepath:"songs/10.mp3",coverPath:"covers/10.jpg"},
    {songname:"Stay",filepath:"songs/11.mp3",coverPath:"covers/11.jpg"},
]
gifinfo.style.opacity=0;
//Play/Pause Clicks
masterPlay.addEventListener('click',(e)=>{
    makeAllPlays();
    let index=songNumber+1;
    let needed=document.getElementById(`${index}`);
   // console.log("hi");
    if(audioElement.paused){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        name1.innerText=song[songNumber].songname;
        gifinfo.style.opacity=1;
        needed.classList.remove('fa-circle-play');
        needed.classList.add('fa-circle-pause');
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gifinfo.style.opacity=0;
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
    }
});

//Listen to events

//progressBar
function x(){
    //console.log(audioElement.currentTime);    
    let progress1=parseFloat(((audioElement.currentTime*1.00)/audioElement.duration)*100).toFixed(2);
    myProgressBar.value=0.00;
    if(isNaN(progress1)){
        myProgressBar.value=0.00;
    }
    else{
        myProgressBar.value=progress1;
    }
    //console.log(myProgressBar.value);
    var s=audioElement.currentTime;
    var m = Math.floor(s / 60);
    m = (m >= 10) ? m : "0" + m;
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : "0" + s;
    //return m + ":" + s;
    document.getElementById('start').innerHTML=m + ":" + s;
    //console.log("timeupdate:",audioElement.currentTime);
    
}
audioElement.addEventListener('loadedmetadata', function() {
    var s=audioElement.duration;
    var m = Math.floor(s / 60);
    m = (m >= 10) ? m : "0" + m;
    s = Math.floor(s % 60);
    s = (s >= 10) ? s : "0" + s;
    document.getElementById('duration1').innerHTML=m + ":" + s;
});

myProgressBar.addEventListener('change',async(e)=>{
    audioElement.removeEventListener('timeupdate',x, { passive: true });
    const data=await jobDone();
    //console.log(data);
    audioElement.addEventListener('timeupdate',x);
    //console.log("hi");
    /*let promise=new Promise((resolve, reject) => {
        audioElement.removeEventListener('timeupdate',x, { passive: true });
        console.log(e);
        let r=false;
        var progress=myProgressBar.value;
        audioElement.currentTime=parseInt((progress*audioElement.duration)/100);
        resolve();
}).then(()=>{
    audioElement.addEventListener('timeupdate',x);
});   */

});
audioElement.addEventListener('timeupdate',x);
//audioElement.addEventListener('timeupdate',x);
function jobDone(){
        //console.log("mychange:",audioElement.currentTime);
        //audioElement.removeEventListener('timeupdate',x, { passive: true });
        //console.log("hi");
        let r=false;
        let progress=parseFloat(1.00*myProgressBar.value).toFixed(2);
        console.log(progress);
        myProgressBar.value=progress;
        audioElement.currentTime=parseFloat((progress*audioElement.duration)/100);
        console.log(audioElement.currentTime);
        return Promise.resolve('Some Data');
}

//audioElement.addEventListener('timeupdate',x);

//loop

loopSign.addEventListener('click',()=>{
    if(loop==0){
        loop=1;
        loopSign.classList.add('fa-spin');
    }
    else{
        loop=0;
        loopSign.classList.remove('fa-spin');
    }
});
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
    element.classList.add('fa-circle-play');
    })
};
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        //console.log(e.target);
        makeAllPlays();
        let index=e.target.id;
        //console.log(index);
        if(audioElement.paused){
            if(index!=songNumber+1){
                audioElement.src=`songs/${index}.mp3`;
                audioElement.currentTime=0;
                audioElement.play();
                songNumber=index-1;
                name1.innerText=song[songNumber].songname;
                gifinfo.style.opacity=1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
            }
            else{
                audioElement.play();
                //songNumber=index-1;
                name1.innerText=song[songNumber].songname;
                gifinfo.style.opacity=1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
            }
            
        }
        else{
            if(index!=songNumber+1){
                audioElement.currentTime=0;
                audioElement.src=`songs/${index}.mp3`;
                
                audioElement.play();
                songNumber=index-1;
                name1.innerText=song[songNumber].songname;
                gifinfo.style.opacity=1;
                masterPlay.classList.remove('fa-circle-play');
                masterPlay.classList.add('fa-circle-pause');
                e.target.classList.remove('fa-circle-play');
                e.target.classList.add('fa-circle-pause');
            }
            else{
                audioElement.pause();
                name1.innerText=song[songNumber].songname;
                gifinfo.style.opacity=0;
                masterPlay.classList.remove('fa-circle-pause');
                masterPlay.classList.add('fa-circle-play');
                e.target.classList.remove('fa-circle-pause');
                e.target.classList.add('fa-circle-play');
            }
            
        }
    })
})

//Loop and on end move to next song
    audioElement.onended = function() {
        if(loop){
            audioElement.currentTime=0;
            audioElement.play();
        }
        else{
        songNumber=(songNumber+1)%11;
        let index=songNumber+1;
        audioElement.currentTime=0;
        audioElement.src=`songs/${index}.mp3`;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        name1.innerText=song[songNumber].songname;
        gifinfo.style.opacity=1;
        //console.log("hi");
        }
    };
    
//Next Button
document.getElementById('next').addEventListener('click',()=>{
    myProgressBar.value="100";
    makeAllPlays();
    songNumber=(songNumber+1)%11;
    let index=songNumber+1;
    let needed=document.getElementById(`${index}`);
    audioElement.currentTime=audioElement.duration;
    audioElement.src=`songs/${index}.mp3`;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    name1.innerText=song[songNumber].songname;
    gifinfo.style.opacity=1;
    needed.classList.remove('fa-circle-play');
     needed.classList.add('fa-circle-pause');
});

//Previous Button
document.getElementById('prev').addEventListener('click',()=>{
    console.log(myProgressBar.value);
    myProgressBar.value="0";
    makeAllPlays();
    songNumber=(songNumber+11-1)%11;
    let index=songNumber+1;
    let needed=document.getElementById(`${index}`);
    audioElement.currentTime=0;
    audioElement.src=`songs/${index}.mp3`;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    name1.innerText=song[songNumber].songname;
    gifinfo.style.opacity=1;
    needed.classList.remove('fa-circle-play');
    needed.classList.add('fa-circle-pause');
});