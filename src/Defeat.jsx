import defeatMessages from "./defeatMessages.json";
import defeatImage from "./assets/images/defeatBackground.png";
import "./Defeat.css";
import { useState, useEffect } from "react";

function Defeat({ ref }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const randomMessage =
      defeatMessages[Math.floor(Math.random() * defeatMessages.length)].message;
    setMessage(randomMessage);
  }, []);

  return (
    <dialog open ref={ref} className="defeat">
      <img src={defeatImage} alt="Defeat background" className="defeat-img" />
      <p className="defeat-message">{message}</p>
      <button className="defeatButton">Main menu</button>
    </dialog>
  );
}

export default Defeat;
