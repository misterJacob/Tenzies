import React from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
      const allHeld = dice.every((die) => die.isHeld);
      const firstValue = dice[0].value;
      const allSameValue = dice.every(die => die.value === firstValue);
      if (allHeld && allSameValue) {
        setTenzies(true);
        console.log("You won!");
      }
    }, [dice]);


  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  // console.log(allNewDice());
  function rollDice() {
    if(!tenzies){
      setDice((oldDice) =>
        oldDice.map(die => {
          return die.isHeld ?
           die : 
           generateNewDie();
        })
      );
    }else{
      setTenzies(false)
      setDice(allNewDice())
    }

  }

  function holdDice(id) {

    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );

    console.log(id);
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <div className="main-tenzies">
      {tenzies && <Confetti/>}
      <div className=" tenzies-container">
        <div className="tenzies-box">
          <h2 className="title">Tenzies</h2>
          <p className="description">
            Roll until all dice are the same. Click each die to freeze it at its
            current value between rolls.
          </p>
          <div className="boxes">{diceElements}</div>
          <button 
          className="btn" 
          onClick={rollDice}
          >
           { tenzies ? "New Gam" : " Roll" }
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
