import React from 'react';
import './SingleCard.css';

//param = pass in the props
export default function SingleCard({ card, handleChoice, flipped, disabled }){

  const handleClick = () => {
    if(!disabled){
      handleChoice(card)
    }
  }

  return (
    <div className="card" >
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/img/cover.png" 
          onClick={handleClick} alt="card back" 
        />
      </div>
    </div>
  )
  /* flipped -> set flipped if true else empty string
   * 
  */
}
