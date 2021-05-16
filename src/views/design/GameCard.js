import React, {useState, useEffect} from "react";
import './gameCard.css'
import "./AnswerBox.css"

/**
 * setFlip exchanges the answer and question on click. 
 */

//styling is handled in the cardRender.css file
export default function GameCard({flashcard, set_length, current_place}) {
    var starred = false;

    return(
        <div className = "cardGameContainer">
            {/* <div>huhu</div> */}
                <div className= "cardGame">
                    <div className = "id-front"> 
                        {current_place + 1} / {set_length}
                    </div>
                    <div className = "id-back"> 
                        {current_place + 1} / {set_length}
                    </div>
                    <div className='front'>
                        {flashcard.question}
                    </div>
                   
                </div>
                <input className="answerGame"
                       placeholder = "Your answer..."/> 
        </div>
    );
}