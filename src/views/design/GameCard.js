import React, {useState, useEffect} from "react";
import './gameCard.css'
import { Button } from "@material-ui/core";

/**
 * setFlip exchanges the answer and question on click. 
 */

//styling is handled in the cardRender.css file
export default function GameCard({flashcard,submitReadyAndCheckOponent, showAnswerTransition, points, previousAnswer, buttonDisabled}) {
    var starred = false;
    const [state, setText] = useState(null);
    //console.log("TEXT FOR GAME ID", flashcard.cardId);

    let handleChange=(event)=>{
        setText(event.target.value);
    }

    if(showAnswerTransition){
        return(
            <div className = "cardGameContainer">
                    <div className= "answerTransition">
                        <div className='correctAnswer'>
                            The answer was: "{previousAnswer}"
                        </div>
                        <div className='score'>
                            You got {points} points this round.
                        </div>
                    </div>
            </div>
        );
    }
    else{
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
                <Button disabled={buttonDisabled} className="submit"
                onClick={()=>{
                    setText("");
                    if(flashcard.answer == state){
                    submitReadyAndCheckOponent();
                }}}>Submit
                </Button>
        </div>
    );}
    
}