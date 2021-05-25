import React, {useState, useEffect} from "react";
import './gameCard.css'
import { Button } from "@material-ui/core";

/**
 * setFlip exchanges the answer and question on click. 
 */

//styling is handled in the cardRender.css file
export default function GameCard({flashcard, submitAnswer}) {
    var starred = false;
    const [state, setstate] = useState(null);
    //console.log("TEXT FOR GAME ID", flashcard.cardId);

    let handleChange=(event)=>{
        setstate(event.target.value);
    }

    return(
        <div className = "cardGameContainer">
                <div className= "cardGame">
                    <div className='front'>
                        {flashcard.question}
                    </div>
                </div>
                <input className="answerGame"
                       placeholder = "Your answer..." onChange={handleChange}/> 
                <Button className="submit"
                onClick={()=>submitAnswer(state,flashcard.cardId)}>Submit
                </Button>
        </div>
    );
}