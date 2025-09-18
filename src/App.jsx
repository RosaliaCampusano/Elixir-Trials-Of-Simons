import "./App.css";
import Game from "./Game";
import { useState } from "react";
import useSound from "use-sound";
import MainMenu from "./MainMenu";
import gameMusic from "./assets/sounds/game-music.mp3";
import mainMenuMusic from "./assets/sounds/main-menu.mp3";
import talkingSound from "./assets/sounds/sounds_talking.mp3";

function App() {
  const [state, setState] = useState(0);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  // === Background sounds ===
  const [playMainMenuMusic, { stop: stopMainMenuMusic }] = useSound(
    mainMenuMusic,
    {
      volume: 0.2,
      loop: true,
    }
  );
  const [playGameMusic, { pause: pauseGameMusic }] = useSound(gameMusic, {
    volume: 0.2,
    loop: true,
  });
  const [playTalkingSound, { pause: pauseTalkingSound }] = useSound(
    talkingSound,
    { volume: 0.1, loop: true }
  );

  const startGame = () => {
    stopMainMenuMusic();
    playGameMusic();
    playTalkingSound();
    setState(1);
  };

  return (
    <>
      {state === 0 ? (
        <MainMenu
          startGame={startGame}
          playMainMenuMusic={playMainMenuMusic}
          stopMainMenuMusic={stopMainMenuMusic}
          isMusicPlaying={isMusicPlaying}
          setIsMusicPlaying={setIsMusicPlaying}
        />
      ) : (
        <Game
          state={state}
          setState={setState}
          playGameMusic={playGameMusic}
          pauseGameMusic={pauseGameMusic}
          playTalkingSound={playTalkingSound}
          pauseTalkingSound={pauseTalkingSound}
          playMainMenuMusic={playMainMenuMusic}
          setMainMenuMusicIsPlaying={setIsMusicPlaying}
        />
      )}
    </>
  );
}

export default App;
