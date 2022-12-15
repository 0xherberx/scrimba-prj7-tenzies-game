import React from "react"
import Die from "./components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

/*
 * Challenge1: Start a brand new React app!
 * - Create a separate App component
 * - Import and render the App component here
 * - In the App component, render a <main> element
 * - Style everything to look like the slide
 * 
 * Challenge2:
 * - Create a Die component that takes a `value` prop
 * - Render 10 instances of the Die component (manually)
 *      - Provide a number between 1-6 for the value on each
 *        for now
 * - Style the <main> and <Die> components 
 *   to look like they do in the slide
 *      - Hints: Create a container to hold the 10 instances
 *        of the Die component, and use CSS Grid to lay them
 *        out evenly in 2 rows of 5 columns
 *      - Use flexbox on main to center the dice container
 *        in the center of the page
 * 
 * Challenge3:
 * Create state to hold our array of numbers. (Initialize
 * the state by calling our `allNewDice` function so it 
 * loads all new dice as soon as the app loads)
 * 
 * Map over the state numbers array to generate our array
 * of Die elements and render those in place of our
 * manually-written 10 Die elements.
 * 
 * Challenge4: Update the `holdDice` function to flip
 * the `isHeld` property on the object in the array
 * that was clicked, based on the `id` prop passed
 * into the function.
 * 
 * Hint: as usual, there's > 1 way to accomplish this.
 * I'll be using `dice.map()` and checking for the `id`
 * of the die to determine which one to flip `isHeld` on,
 * but you can do whichever way makes the most sense to you.
 * 
 * Challenge5: Update the `rollDice` function to not just roll
 * all new dice, but instead to look through the existing dice
 * to NOT role any that are being `held`.
 * 
 * Hint: this will look relatively similiar to the `holdDice`
 * function below. When creating new dice, remember to use
 * `id: nanoid()` so any new dice have an `id` as well.
 * 
 * Challenge6:
 * 1. Add new state called `tenzies`, default to false. It
 *    represents whether the user has won the game yet or not.
 * 2. Add an effect that runs every time the `dice` state array 
 *    changes. For now, just console.log("Dice state changed").
 * 
 * Challenge7: Check the dice array for these winning conditions:
 * 1. All dice are held, and
 * 2. all dice have the same value
 * 
 * If both conditions are true, set `tenzies` to true and log
 * "You won!" to the console
 * 
 * Challenge8: Tie off loose ends!
 * 1. If tenzies is true, Change the button text to "New Game"
 * 2. If tenzies is true, use the "react-confetti" package to
 *    render the <Confetti /> component 🎉
 * 
 *    Hint: don't worry about the `height` and `width` props
 *    it mentions in the documentation.
 */

export default function App() {
  const [dice, setDice] = React.useState(() => allNewDice())
  const [tenzies, setTenzies] = React.useState(() => false)
  const [numOfRolls, setNumOfRolls] = React.useState(() => 0)
  const [startTime, setStartTime] = React.useState(() => 0)
  const [timeToWin, setTimeToWin] = React.useState(() => 0.0)
  const [bestTime, setBestTime] = React.useState(() => parseFloat(localStorage.getItem("bestTime")) || 0.0)

  React.useEffect(() => {   
    const allHeld = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue) {
      setTenzies(true)
      console.log(startTime)
      const durationTimeInSeconds = (new Date().getTime() - startTime) / 1000
      setTimeToWin(durationTimeInSeconds)
      console.log(`You won with ${numOfRolls} rolls in ${durationTimeInSeconds}s!`)
    }
    console.log("numOfRolls: "+numOfRolls)   
    console.log("bestTime: "+bestTime)  
    /*
    for(let i = 0; i < dice.length; i++) {
      if(dice[i].isHeld !== true) {
        return
      }
      if(i > 0 && dice[i-1].value !== dice[i].value) {
        return
      }
    }
    setTenzies(true)
    console.log("You won!")
    */
  }, [dice])

  React.useEffect(() => {
    if(numOfRolls===0) {
      console.log("numOfRolls==0")
      setStartTime(new Date().getTime())
    }
  }, [numOfRolls])

  React.useEffect(() => {
    if(timeToWin != 0 && (bestTime==0 || timeToWin < bestTime)) {
      console.log("new best time")
      localStorage.setItem("bestTime", JSON.stringify(timeToWin))
      setBestTime(timeToWin)
    }
  }, [timeToWin])

  function generateNewDie() {
    return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = []
    for(let i =0 ; i < 10; i++) {
      //const randomNum = Math.floor(1 + (Math.random() * 5))
      //const randomNum = Math.ceil(Math.random() * 6)
      newDice.push(generateNewDie())
    }    
    return newDice
  }
    
  function holdDice(id) {
    console.log(id)
    setDice(prevDice => prevDice.map(die => (
      die.id===id ?
        {...die, isHeld: !die.isHeld} :
        die
    )))
  }

  const diceElements = dice.map(die => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))

  function rollDice(event) {
    if(tenzies) {
      setNumOfRolls(0)
      setTenzies(false)    
      setDice(allNewDice())
    } else {
      setNumOfRolls(prevNumOfRolls => prevNumOfRolls+1)
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ?
          die :
          generateNewDie()
      }))            
    }    
  }

  console.log(dice)
 
  return (
    <main className="main--tenzies">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze
      it at its current value between rolls.</p>
      <div className="dice--container">
        {diceElements}
      </div>
      <button
        className="roll-dice"
        onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>      
    </main>
  )
}