import { useState, useEffect } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png", matched: false },
  { "src": "/img/potion-1.png", matched: false },
  { "src": "/img/ring-1.png", matched: false },
  { "src": "/img/scroll-1.png", matched: false },
  { "src": "/img/shield-1.png", matched: false },
  { "src": "/img/sword-1.png", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  // store the players choices 
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffle cards 
  const shuffleCards = () => {
    // add 2x cards
    /*math.random > returns +/- number
    - number stay the same order, else switch order around
    * map > return an object. spread card property & add property id
    */
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map( card => ({ ...card, id: Math.random }))

    //reset
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  const handleChoice = (card) => {
    // if choiceOne empty, update choice2 else choice1
    // if choice1 != empty is true, update choice2 else false, update choice1
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    // console.log('1: '+ choiceOne,'2: '+ choiceTwo)
  }

  // Compare choices
  // param( func(), dependecey array)
  /* useEffect -> fires automatically whenever a dependency is changed. 
  In this case choice1 and choice2 */
  useEffect(() => {
    // if both not null
    if(choiceOne && choiceTwo) {
      // stop other cards from flipping until check completed
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        // update: set the card src by checking...
        setCards(prevCards => {
          // return a new array as an object 
          // .map only works for array so need preCards
          return prevCards.map(card => {
            // check if match, change 2 of the cards in the array
            if(card.src === choiceOne.src) return { ...card, matched: true }
            else return card
          })
        })
        resetTurn()
      } else {
        // setTimeout(func, milliseconds); 1000 = 1sec
        setTimeout(() => resetTurn(), 1000)
      }
      
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }  

  // start game automatically when page first lands
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        { cards.map(card => (
          <SingleCard
           key={card.id} card={card} 
           handleChoice={handleChoice}
           flipped={card === choiceOne || card === choiceTwo || card.matched}
           disabled={disabled}
          />
        ) ) }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
  /* cards.map: use => () instead of => {}
  * singleCard> key and card are props needed in it's script
  * flipped -> iterate through if card is chosen, flip the card or is already matched
  * disabled -> stop card from flipping
  */
}

export default App