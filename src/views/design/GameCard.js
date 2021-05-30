import React, {useState, useEffect} from "react";
import './gameCard.css'
import { Button } from "@material-ui/core";

/**
 * setFlip exchanges the answer and question on click. 
 */

//styling is handled in the cardRender.css file
export default function GameCard({flashcard, submitAnswer}) {
    var starred = false;
    const [state, setState] = useState(null);
    //console.log("TEXT FOR GAME ID", flashcard.cardId);

    let handleChange=(event)=>{
        setState(event.target.value);
    }

    let clearfield=()=>{
        setState("");
    }

    function onHandleSubmit(e){
        e.preventDefault();
        const emptyAnswer = "";
        setState(emptyAnswer);
    }

    return(
        <div className = "cardGameContainer">
                <div className= "cardGame">
                    <div className='front'>
                        {flashcard.question}
                    </div>
                </div>
                <textArea className="answerGame"
                       placeholder = "Your answer..." onChange={handleChange}>
                        {state}
                </textArea> 
                <Button className="submit" type ="submit" 
                onClick={(e)=>{submitAnswer(state,flashcard.cardId);
                              onHandleSubmit(e)}}>Submit
                </Button>
        </div>
    );
}