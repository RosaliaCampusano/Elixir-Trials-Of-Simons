import { useEffect, useState } from "react";
import "./App.css";
import mainMenuMusic from "./assets/sounds/main-menu.mp3";
import useSound from "use-sound";

function MainMenu({ setState }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [play, { stop }] = useSound(mainMenuMusic, { volume: 0.25 });

  useEffect(() => {
    isMusicPlaying ? stop() : play();
  }, [isMusicPlaying]);

  return (
    <>
      <div className="main-menu">
        <div className="main-menu-container">
          <h1>The Elixir Trials of Simon</h1>
          <h2>Knock the door and fate awaits inside the inn</h2>
          <button
            className="button-menu-music"
            onClick={() => {
              setIsMusicPlaying(!isMusicPlaying);
            }}
          ></button>
          <div className="fire-animation"></div>
        </div>
        <button
          className="door-button"
          onClick={() => {
            setState(1);
          }}
        ></button>
      </div>
    </>
  );
}

export default MainMenu;
