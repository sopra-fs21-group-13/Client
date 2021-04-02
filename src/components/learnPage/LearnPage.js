import React, {useState} from 'react'
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import CardRender from '../../views/design/CardRender';
import Card from 'C:/Users/Conrad/Documents/GitHub/Client/src/components/shared/models/Card';
import { withRouter } from 'react-router-dom';

const Container = styled(BaseContainer)`
    color: black;
    text-align: center;
`;

const Header = styled.div`
    position: sticky;
    height: 50px;
    text-align: center;
    color:white;
    background-color:green;
    top: 0px;
`

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background-color: red;
    height: 130vh;
`


class LearnPage extends React.Component {
    constructor() {
      super();
      this.state = {
          flashcards: null,
          currentFlashcard: null
      };
    }

    async componentDidMount(){

        const flashcard1 = new Card({id: 1, question: "Area", answer: "Fläche"});
        

        const response = [
                {id: 1,
                answer: "Fläche",
                question: "Area"
            },{
                id:2,
                answer: "Unternehmen",
                question: "Business"
            }]

        this.setState({flashcards: response});
        //Here we could save the currentFlashcard id inside the user
        //and then reenter it here inside a variable for saving the current state
        //(which card was last shown when closing the application etc)
        this.setState({currentFlashcard: response[0]})
    }

    render(){
        return(
            <div>
            <Header>
                header
            </Header>
            <MainContainer>
            {!this.state.flashcards ? (
            <div>loading..</div>
            ) : (
                <CardRender flashcard = {this.state.currentFlashcard}
                key = {this.state.currentFlashcard.id} />
            )}
            </MainContainer>
            </div>
        );
    }
}
export default withRouter(LearnPage);

/*
export default function LearnPage(){
    //change state to flashcards trial
    const [flashcards, setFlashcards] = useState(FLASHCARDS_TRIAL);
    return (
        <div>
            <CardList flashcards = {flashcards} />
        </div>
    )
}
*/


