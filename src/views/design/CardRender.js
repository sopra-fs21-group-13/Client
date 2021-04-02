import React, {useState} from "react";
import './cardRender.css'

/**
 * setFlip exchanges the answer and question on click. 
 */

//styling is handled in the cardRender.css file
export default function CardRender({flashcard}) {
    const [flip, setFlip] = useState(false);


    return(
        <div
            className={`card ${flip ? 'flip' : ''}`}
            onClick={() => setFlip(!flip)}
        >
            <div className='front'>
                {flashcard.question}
            </div>
            <div className='back'> {flashcard.answer} </div>
        </div>
    );
}