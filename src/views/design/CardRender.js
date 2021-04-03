import React, {useState} from "react";
import './cardRender.css'

/**
 * setFlip exchanges the answer and question on click. 
 */

//styling is handled in the cardRender.css file
export default function CardRender({flashcard, set_length, current_place}) {
    const [flip, setFlip] = useState(false);


    return(
        <div
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
        >   
            <div className = "id_front"> 
                {current_place + 1} / {set_length}
            </div>
            <div className = "id_back"> 
                {current_place + 1} / {set_length}
            </div>
            <div className='front'>
                {flashcard.question}
            </div>
            <div className='back'> {flashcard.answer} </div>
        </div>
    );
}