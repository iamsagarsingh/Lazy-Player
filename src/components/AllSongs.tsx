import { useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";
import songs from "../data/songs.json";
import type { Song } from "../types";

export const AllSongs = () => {
  const { state, dispatch } = usePlayer();

  useEffect(() => {
    dispatch({ type: "SET_SONGS", payload: songs as Song[] });
  }, [dispatch]);

  const handleClick = (song: Song) => {
    dispatch({ type: "SET_CURRENT_SONG", payload: song });
  };
  return (
    <div className="rounded shadow w-full p-3 bg-gray-100">
       <h2 className="text-lg font-semibold mb-4">All Songs</h2>
      <ul>
        {state.songs.map((song) => {
          return (
            <li
              className={`p-2 my-3 rounded cursor-pointer shadow-sm hover:bg-blue-100 transition ${
                state.currentSong?.id === song.id
                  ? "bg-blue-200 font-bold"
                  : "bg-white"
              }`}
              key={song.id}
              onClick={() => handleClick(song)}
            >
              <div className="flex items-center gap-2">
                <div className="w-[2rem]">
                  <img src={song.thumbnail} alt="thumbnail" />
                </div>
                {song.title}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
