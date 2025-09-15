import { useState } from "react";
import "./App.css";
import Game from "./Game";
import MainMenu from "./MainMenu";

function App() {
  const [state, setState] = useState(0);

  return (
    <>
      {state !== 0 ? (
        <Game state={state} setState={setState} />
      ) : (
        <MainMenu setState={setState} />
      )}
    </>
  );
}

export default App;
