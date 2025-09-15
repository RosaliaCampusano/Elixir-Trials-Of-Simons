import "./App.css";

function MainMenu({ setState }) {
  return (
    <>
      <div className="main-menu">
        <h1>The Elixir Trials of Simon</h1>
        <h2>Knock the door and fate awaits inside the inn</h2>
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
