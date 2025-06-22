// src/App.tsx
import { AllSongs } from "./components/AllSongs";
import { Navbar } from "./components/Navbar";
import Player from "./components/Player";
import { PlayerProvider } from "./context/PlayerContext";

function App() {
  return (
    <PlayerProvider>
      <Navbar />
      <div className="bg-gray-100 flex flex-col md:flex-row-reverse p-2 gap-2">
        <Player />
        <AllSongs />
      </div>
    </PlayerProvider>
  );
}

export default App;
