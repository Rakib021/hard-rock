const searchBtn =()=>{
    const searchText = document.getElementById("search-field").value;
     const url = `https://api.lyrics.ovh/suggest/:${searchText}`;

     
      fetch(url)
      .then(res =>res.json())
      .then(data =>displaySong(data.data))
      .catch(error=>displayError('Something went wrong!! please try again'));


}
//using asiyc await for fetch
/* const searchBtn =async()=>{
    const searchText = document.getElementById("search-field").value;
     const url = `https://api.lyrics.ovh/suggest/:${searchText}`;

     const res = await fetch(url);
     const data =await res.json();
     displaySong(data.data);
}
 */

const displaySong= songs =>{
    const songsContainer = document.getElementById("song-container");
    songsContainer.textContent ='';
 songs.forEach(song => {
    //  console.log(song)
     const div = document.createElement('div');
     div.innerHTML =`
     <div class="single-result row align-items-center my-3 p-3">
        <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
              <p class="author lead">Album by <span>${song.artist.name}</span></p>
              <audio controls>
                 <source src="${song.preview}" type="audio/mpeg">

               </audio>
            </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick ="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>
                </div>`;
               songsContainer.appendChild(div); 
 })

}
const getLyric = async (artist,title)=>{

const url = `https://api.lyrics.ovh/v1/:${artist}/:${title}`;
try{
    const res = await fetch(url);
const data = await res.json();
displayLyrics(data.lyrics);
}
catch(error){
    displayError("i failed load lyrics!! please try later");
}
/* fetch(url)
.then(res =>res.json())
.then(data => displayLyrics(data.lyrics)) */
}

const displayLyrics = lyric=>{
    const songLyrics = document.getElementById("song-lyrics");
    songLyrics.innerText= lyric;
}
const displayError = error =>{
    const errorMsg = document.getElementById("error-msg");
    errorMsg.innerText=error;
}