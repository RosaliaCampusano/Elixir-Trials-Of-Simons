import { useState, useEffect, useRef } from "react";
import useSound from "use-sound";
import simonPotions from "./assets/sounds/potions.mp3";
import Defeat from "./Defeat";
import "./Game.css";

function Game({ state, setState }) {
  //Colors
  const blueRef = useRef(null);
  const yellowRef = useRef(null);
  const greenRef = useRef(null);
  const redRef = useRef(null);

  const defeatRef = useRef(null);

  //Sounds
  const [play] = useSound(simonPotions, {
    sprite: {
      one: [0, 500],
      two: [1000, 500],
      three: [2000, 500],
      four: [3000, 500],
      error: [4000, 500],
    },
  });

  const potions = [
    {
      color: "#0e3e5eff",
      ref: yellowRef,
      sound: "one",
    },
    {
      color: "#811b0bff",
      ref: blueRef,
      sound: "two",
    },
    {
      color: "#2e540bff",
      ref: redRef,
      sound: "three",
    },
    {
      color: "#bd5b15ff",
      ref: greenRef,
      sound: "four",
    },
  ];

  //Speed game and internal calculation
  const minNumber = 0;
  const maxNumber = 3;
  const speedGame = 400;

  //State of game
  const [sequence, setSequence] = useState([]); // Almacenara la secuencia que va generando el juego
  const [currentGame, setCurrentGame] = useState([]); //la secuencia que va ejecutando el juego
  const [isAllowedToPlay, setIsAllowedToPlay] = useState(false); //booleano para permitir pulsar la tecla
  const [speed, setSpeed] = useState(speedGame); //almacena los cambios de velocidad , se gestiona de forma progresiva
  const [turn, setTurn] = useState(0); //almacena el numero de turno que estas ejecutando
  const [pulses, setPulses] = useState(0); //almacena las pulsaciones
  const [success, setSuccess] = useState(0); //almacena el numero de aciertos
  const [isGameOn, setIsGameOn] = useState(false); //si el juego debe iniciarse
  const [isDefeat, setDefeat] = useState(false);

  const initGame = () => {
    randomNUmber();
    setIsGameOn(true);
  };

  const randomNUmber = () => {
    setIsAllowedToPlay(false);
    const randomNUmber = Math.floor(
      Math.random() * (maxNumber - minNumber + 1) + minNumber
    );
    setSequence([...sequence, randomNUmber]);
    setTurn(turn + 1);
  };

  const handlerClick = (index) => {
    if (isAllowedToPlay) {
      play({ id: potions[index].sound });
      potions[index].ref.current.style.filter = "blur(15px)";
      potions[index].ref.current.style.opacity = 1;
      potions[index].ref.current.style.transition = "all 0.3s ease-out";
      setTimeout(() => {
        potions[index].ref.current.style.filter = "none";
        potions[index].ref.current.style.opacity = 0;
        potions[index].ref.current.style.scale = 1;
        setCurrentGame([...currentGame, index]);
        setPulses(pulses + 1);
      }, speed / 2);
    }
  };

  useEffect(() => {
    if (pulses > 0) {
      if (Number(sequence[pulses - 1] === Number(currentGame[pulses - 1]))) {
        setSuccess(success + 1);
      } else {
        const index = sequence[pulses - 1];
        if (index) potions[index].ref.current.style.opacity = 0;
        play({ id: "error" });
        setTimeout(() => {
          if (index) potions[index].ref.current.style.opacity = 0;
          setDefeat(true);
          defeatRef.current.showModal();
        }, speed * 2);
        setIsAllowedToPlay(false);
      }
    }
  }, [pulses]);

  useEffect(() => {
    if (!isGameOn) {
      setSequence([]);
      setCurrentGame([]);
      setIsAllowedToPlay(false);
      setSpeed(speedGame);
      setSuccess(0);
      setPulses(0);
      setTurn(0);
    }
  }, [isGameOn]);

  useEffect(() => {
    if (success === sequence.length && success > 0) {
      setSpeed(speed - sequence.length * 2);
      setTimeout(() => {
        setSuccess(0);
        setPulses(0);
        setCurrentGame([]);
        randomNUmber();
      }, 500);
    }
  }, [success]);

  useEffect(() => {
    if (!isAllowedToPlay) {
      sequence.map((item, index) => {
        setTimeout(() => {
          play({ id: potions[item].sound });
          potions[item].ref.current.style.filter = "blur(15px)";
          potions[item].ref.current.style.opacity = 1;
          potions[item].ref.current.style.transition = "all 0.3s ease-out";
          setTimeout(() => {
            potions[item].ref.current.style.filter = "none";
            potions[item].ref.current.style.opacity = 0;
          }, speed / 2);
        }, speed * index);
      });
    }
    setIsAllowedToPlay(true);
  }, [sequence]);

  useEffect(() => {
    if (state === 1 && !isGameOn) {
      initGame();
    }
  }, []);

  return (
    <>
      <div className="game-container" style={{ opacity: isDefeat ? 0.5 : 1 }}>
        <div className="header">{/*  <h1>Turn {turn}</h1> */}</div>
        <div className="potions-container">
          {potions.map((item, index) => {
            return (
              <div
                key={index}
                ref={item.ref}
                className={`potions-${index}`}
                style={{
                  backgroundColor: `${item.color}`,
                  opacity: 0,
                  transition: "all 0.3s ease-out",
                }}
                onClick={() => handlerClick(index)}
              ></div>
            );
          })}
        </div>
        <Defeat ref={defeatRef} setState={setState} />
      </div>
    </>
  );
}

export default Game;
