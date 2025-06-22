import { useEffect, useRef, useState } from "react";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { RxTrackNext } from "react-icons/rx";
import { RxTrackPrevious } from "react-icons/rx";
import { usePlayer } from "../context/PlayerContext";
// import { CiMusicNote1 } from "react-icons/ci";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const {state,dispatch} = usePlayer()
  const {isPlaying,currentSong} = state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const formatTime = (time: number) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};


  // 🔁 Play song when currenSong change
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && currentSong) {
        audio.src = currentSong.url
        if(isPlaying){
        audio.play().catch((err) => {
        console.error("Playback failed:", err);
      });
        }
    }
    return () => {
      // ⛔ Stop previous audio when switching to next
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [currentSong]);

   // Sync playback on play/pause
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    dispatch({type:"TOGGLE_PLAY_PAUSE"})
  };

  const playNext = () => {
    const songs = state.songs;
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    dispatch({ type: 'SET_CURRENT_SONG', payload: songs[nextIndex] });
  };

  const playPrevious = () => {
    const songs = state.songs;
    const currentIndex = songs.findIndex(s => s.id === currentSong?.id);
    const previousIndex = (currentIndex - 1 + songs.length) % songs.length;
    dispatch({ type: 'SET_CURRENT_SONG', payload: songs[previousIndex] });
  };

  if (!currentSong) return null;

  return (
    <div className="h-max rounded shadow w-full p-3 text-center bg-white">
      <h2 className="text-2xl font-semibold mb-2">{currentSong.title}</h2>
      <div className="w-full flex items-center justify-center pt-4 md:pt-2">
        <img src={currentSong.thumbnail} alt="cover" className="w-5/7 md:w-4/7 rounded-full"/>
      </div>
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
      />

      <div className="w-full px-4 mt-4">
        <input
          type="range"
          min={0}
          max={duration}
          value={currentTime}
          step="0.1"
          onChange={(e) => {
            const newTime = parseFloat(e.target.value);
            if (audioRef.current) {
              audioRef.current.currentTime = newTime;
              setCurrentTime(newTime);
            }
          }}
          className="w-full accent-blue-500"
        />

        <div className="flex justify-between text-sm mt-1 text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={playPrevious}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          <RxTrackPrevious />
        </button>
        <button
          onClick={togglePlay}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {isPlaying ? <CiPause1 /> : <CiPlay1 />}
        </button>
        <button
          onClick={playNext}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          <RxTrackNext />
        </button>
      </div>
    </div>
  );
};

export default Player;
