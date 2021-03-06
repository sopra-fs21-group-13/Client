import React, {useState, useEffect} from "react";
import './cardRender.css'
import Star from './Star.png';
import StarActive from './StarActive.png';

/**
 * setFlip exchanges the answer and question on click. 
 */

//styling is handled in the cardRender.css file
export default function CardRender({flashcard, set_length, current_place, markedCards}) {
    var starred = false;

    
    const [flip, setFlip] = useState(false);
    const [star_active, setStar] = useState(starred);

 
    if(markedCards.includes(flashcard.cardId)){
        starred = true;
        console.log(flashcard.cardId);
    }

    const starState = starred ? StarActive : Star;

    
    //stars the card and pushes its id into the markedCards array. (which is a reference to the state in LearnPage.js)
    //if it is de-starred, then its id is deleted from the array
    function pressStar(){
        setStar(!star_active);
        if(!starred){
        markedCards.push(flashcard.cardId);}
        else{
        markedCards.splice(markedCards.indexOf(flashcard.cardId),1);
        }
    }

    return(
        <div className = "cardContainer">
            <div className = "cardAdjust">
            <div
                className={`card ${flip ? 'flip' : ''}`}
                onClick={() => {setFlip(!flip);}}
            >   
                <div className = "id-front"> 
                    {current_place + 1} / {set_length}
                </div>
                <div className = "id-back"> 
                    {current_place + 1} / {set_length}
                </div>
                
                <div className='front'>
                    {flashcard.question}
                </div>
                <div className='back'> {flashcard.answer} </div>
            </div>
            <div className={`star-container ${flip ? 'flip-star' : ''}`}>
                <button class = "star-front"
                    onClick = {() => {pressStar();}}
                >
                    <img class = "star-front-image"
                        src = {starState} />
                </button>
                <button class = "star-back"
                    onClick = {() => pressStar()}
                >
                    <img class = "star-back-image"
                        src = {starState} />
                </button>
            </div>
            </div>
        </div>
    );
}