import soundButton from "./assets/images/sound-button.png";
import pauseButton from "./assets/images/pause-button.png";

import "./App.css";

function MainMenu({
  startGame,
  playMainMenuMusic,
  stopMainMenuMusic,
  isMusicPlaying,
  setIsMusicPlaying,
}) {
  const toggleMusic = () => {
    if (isMusicPlaying) {
      stopMainMenuMusic();
      setIsMusicPlaying(false);
    } else {
      playMainMenuMusic();
      setIsMusicPlaying(true);
    }
  };

  return (
    <>
      <div className="main-menu">
        <button
          className="music-button"
          onClick={toggleMusic}
          style={{
            backgroundImage: isMusicPlaying
              ? `url(${soundButton})`
              : `url(${pauseButton})`,
          }}
        ></button>
        <div className="main-menu-container">
          <h1>The Elixir Trials of Simon</h1>
          <h2>Knock the door and fate awaits inside the inn</h2>
          <div className="fire-animation"></div>
        </div>
        <button
          className="door-button"
          onClick={() => {
            startGame();
          }}
        ></button>
      </div>
    </>
  );
}

export default MainMenu;
