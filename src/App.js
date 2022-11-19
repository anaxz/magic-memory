import { useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "/img/helmet-1.png" },
  { "src": "/img/potion-1.png" },
  { "src": "/img/ring-1.png" },
  { "src": "/img/scroll-1.png" },
  { "src": "/img/shield-1.png" },
  { "src": "/img/sword-1.png" }
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

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

  console.log(cards, turns)

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        { cards.map(card => (
          <SingleCard key={card.id} card={card} />
        ) ) }
      </div>

    </div>
  );
  /* cards.map: use => () instead of => {}
  * singleCard> key and card are props needed in it's script
  */
}

export default App