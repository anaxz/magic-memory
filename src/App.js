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
      } else {
        console.log('not match')
      }
      resetTurn()
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }  

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        { cards.map(card => (
          <SingleCard
           key={card.id} card={card} 
           handleChoice={handleChoice}
           flipped={card === choiceOne || card === choiceTwo}
          />
        ) ) }
      </div>

    </div>
  );
  /* cards.map: use => () instead of => {}
  * singleCard> key and card are props needed in it's script
  * flipped -> iterate through card is chosen, flip
  */
}

export default App