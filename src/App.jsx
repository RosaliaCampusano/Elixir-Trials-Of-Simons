import "./App.css";
import Game from "./Game";
import { useState, useEffect } from "react";
import useSound from "use-sound";
import MainMenu from "./MainMenu";
import mainMenuMusic from "./assets/sounds/main-menu.mp3";
import gameMusic from "./assets/sounds/game-music.mp3";
import talkingSound from "./assets/sounds/sounds_talking.mp3";

function App() {
  const [state, setState] = useState(0);
  // === Background sounds ===
  const [
    playMainMenuMusic,
    { stop: stopMainMenuMusic, isPlaying: isMainMenuPlaying },
  ] = useSound(mainMenuMusic, { volume: 0.25, loop: true });
  const [
    playGameMusic,
    { pause: pauseGameMusic, isPlaying: isGameMusicPlaying },
  ] = useSound(gameMusic, { volume: 0.2, loop: true });
  const [
    playTalkingSound,
    { pause: pauseTalkingSound, isPlaying: isTalkingPlaying },
  ] = useSound(talkingSound, { volume: 0.1, loop: true });

  const startGame = () => {
    stopMainMenuMusic();
    playGameMusic();
    playTalkingSound();
    setState(1);
  };

  useEffect(() => {
    if (state === 0 && !isMainMenuPlaying) {
      playMainMenuMusic();
    }
  }, [state, playMainMenuMusic, isMainMenuPlaying]);

  return (
    <>
      {state === 0 ? (
        <MainMenu startGame={startGame} />
      ) : (
        <Game
          state={state}
          setState={setState}
          playGameMusic={playGameMusic}
          pauseGameMusic={pauseGameMusic}
          playTalkingSound={playTalkingSound}
          pauseTalkingSound={pauseTalkingSound}
        />
      )}
    </>
  );
}

export default App;
