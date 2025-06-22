import { createContext, useContext, useReducer } from "react";
import type { Song } from "../types";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type State = {
  songs: Song[];
  currentSong: Song | null;
  isPlaying: boolean;
};

export type Action =
  | { type: "SET_SONGS"; payload: Song[] }
  | { type: "SET_CURRENT_SONG"; payload: Song }
  | { type: "TOGGLE_PLAY_PAUSE" }
  | { type: "SET_IS_PLAYING"; payload: boolean };

const initialState: State = {
  songs: [],
  currentSong: null,
  isPlaying: false,
};

function playerReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SONGS":
      return { ...state, songs: action.payload };
    case "SET_CURRENT_SONG":
      return { ...state, currentSong: action.payload, isPlaying: true };
    case "TOGGLE_PLAY_PAUSE":
      return { ...state, isPlaying: !state.isPlaying };
    case "SET_IS_PLAYING":
      return { ...state, isPlaying: action.payload };
    default:
      return state;
  }
}

const PlayerContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useLocalStorage('songs',playerReducer, initialState);

  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
