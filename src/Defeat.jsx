import defeatMessages from "./defeatMessages.json";
import defeatImage from "./assets/images/defeatBackground.png";
import "./Defeat.css";
import { useState, useEffect } from "react";

function Defeat({
  ref,
  setState,
  pauseDefeatSound,
  playMainMenuMusic,
  setMainMenuMusicIsPlaying,
}) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const randomMessage =
      defeatMessages[Math.floor(Math.random() * defeatMessages.length)].message;
    setMessage(randomMessage);
  }, []);

  const handlerClick = () => {
    pauseDefeatSound();
    setMainMenuMusicIsPlaying(true);
    playMainMenuMusic();
    setState(0);
  };

  return (
    <dialog closedby="none" ref={ref} className="defeat">
      <img src={defeatImage} alt="Defeat background" className="defeat-img" />
      <div className="defeat-container">
        <p className="defeat-message">{message}</p>
        <button className="defeatButton" onClick={handlerClick}>
          Main Menu
        </button>
      </div>
    </dialog>
  );
}

export default Defeat;
