import React, {useState, useEffect} from "react";
import './gameCard.css'
import "./AnswerBox.css"
import { Button } from "@material-ui/core";

/**
 * setFlip exchanges the answer and question on click. 
 */

//styling is handled in the cardRender.css file
export default function GameCard({flashcard, set_length, current_place,submitAnswer}) {
    var starred = false;
    const [state, setstate] = useState(null);
    //console.log(flashcard);

    let handleChange=(event)=>{
        setstate(event.target.value);

    }

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
                       placeholder = "Your answer..." onChange={handleChange}/> 
                <Button onClick={()=>submitAnswer(state,flashcard.cardId)}>Submit</Button>
        </div>
    );
}