import React, { useState, useEffect } from "react"
import Upload from './Upload'
import svg2 from '../files/svg2.svg'
import Loading from "./Loading";
import config from '../config.json'

const AudioPlaylist = ({ files, trackIndex, setTrackIndex }) => {
  const [source, setSource] = useState(null);
  const [trackLoop, setTrackLoop] = useState('shuffle');

  let audioElement = document.getElementById("audio-player");

  // Toggling CSS for the audio which is currently played
  const renderAudio = (elementId) => {
    const currentlyPlaying = document.getElementsByClassName("playing");
    if(currentlyPlaying.length)
      currentlyPlaying[0].classList.toggle("playing");
    const audioContainer = document.getElementById(elementId);
    audioContainer.classList.toggle("playing");
  }

  // Converting the buffer string into audio content
  function getSound(audioJson) {
    const binaryString = window.atob(audioJson.content);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
  
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const arrayBuffer = bytes.buffer;
    const blob = new Blob([arrayBuffer], {type: 'audio/mp3'});
    return URL.createObjectURL(blob);
  }

  // Handling the looping of playlist
  const handleEnded = () => {
    if(trackLoop == 'shuffle') {
      if(trackIndex < files.length-1)
        setTrackIndex(trackIndex + 1);
      else
        setTrackIndex(0);
      audioElement.autoplay = true;
    } else if (trackLoop == 'repeat') {
      setTrackIndex(0);
      audioElement.autoplay = true;
    } else {
      audioElement.autoplay = false;
    }
  }

  // Change the loop type of playlist (shuffle/repeat/no loop)
  let changeLoop = (loopType) => {
    if (loopType == 'repeat') {
      audioElement.loop = true;
      audioElement.play();
    } else {
      audioElement.loop = false;
    }
    console.log(loopType);
    setTrackLoop(loopType);
  }

  useEffect(() => {
    audioElement = document.getElementById("audio-player");
    localStorage.setItem('track', trackIndex);
    setSource(getSound(files[trackIndex]));
    renderAudio(files[trackIndex]._id);
  }, [trackIndex])

  return (
      <div className="p-2 d-flex flex-column gap-2" id="audio-player-container">

        {/* Component to show and play the song and it's information */}
        <p><b>Now Playing:</b></p>
        <p id="now-playing"><b><u>{files[trackIndex].title}</u></b></p>
        <div className="bg-light rounded">
          {/* Built-in HTML audio player */}
          <audio id="audio-player" className="w-100" onEnded={handleEnded} controls src={source} />
        </div>

        {files[trackIndex].credits && <p><span style={{color: 'teal'}}>By: </span>{files[trackIndex].credits}</p>}

        <div className="d-flex gap-2">
          {/* Selecting the loop type */}
          <select className="bg-dark text-light rounded w-50" onChange={(e) => changeLoop(e.target.value)}>
            <option value={'shuffle'}> 🔀 shuffle </option>
            <option value={'repeat'}> 🔁 repeat </option>
            <option value={'unloop'}> ⛔ unloop </option>
          </select>
          {/* Component to upload new audio */}
          <Upload width={'w-50'}/>
        </div>
      </div>
  )
}

const Playlist = () => {
  const [files, setFiles] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [trackIndex, setTrackIndex] = useState(localStorage.getItem('track') ? parseInt(localStorage.getItem('track')) : 0);

  useEffect(() => {
    async function getAudioFiles() {
      let response = await fetch(config['backend-server'] + 'get-audio-files');
      if(response.ok) {
        let result = await response.json();
        setFiles(result);
        setLoading(false);
      }
    }

    getAudioFiles();
  }, [])

  return (
    <div className="d-flex flex-column gap-2">
      { isLoading ? <Loading/> :
          <>
          <div className="sticky-top bg-dark py-2">
            { files.length && 
              <AudioPlaylist 
                files={files} 
                trackIndex={trackIndex} 
                setTrackIndex={setTrackIndex}/>
            }
            
            { !files.length && 
              <>
                <p>No Music available..</p>
                <p>Feel free to upload</p>
                <Upload width = {'w-100'}/>
              </>
            }
          </div>

          <div className="d-flex flex-column gap-1">
            { files && files.map((audio, index) => (
              <div className="d-flex flex-row bg-audio-title gap-2 rounded" id={audio._id} key={audio._id}>
                <div className="d-flex flex-row w-100 overflow-hidden" onClick={() => setTrackIndex(index)}>
                  <img className="image m-0 rounded-start" src={'https://www.svgrepo.com/show/495926/audio-square.svg'}/>
                  <div className="d-flex flex-column gap-1 p-2 border-end w-100">
                    <p className="p-0 m-0 fs-16"><b>{audio.title}</b></p>
                    <p className="p-0 m-0 fs-12">{audio.credits}</p>
                  </div>
                </div>
                <img id="playing-indication" className="w-20 m-2" src={svg2}/>
              </div>
            ))
            }
          </div>
          </>
      }
    </div>
  )
};

export default Playlist;