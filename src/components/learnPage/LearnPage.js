import React, {useState} from 'react'
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import CardRender from '../../views/design/CardRender';
import Card from '../shared/models/Card';
import { withRouter } from 'react-router-dom';
import './learnPage.css'

const Container = styled(BaseContainer)`
    color: black;
    text-align: center;
`;

const Header = styled.div`
    position: sticky;
    height: 60px;
    text-align: center;
    color:white;
    background-color:#70F0A9;
    top: 0px;
`

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
    background-color: white;
    height: 70vh;

`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 60vh;
    width: 200vh;
`

const InfoContainer = styled.div`
    display: relative;
    align-items: top;
    position: relative;
    align-self: center;
    height: 300px;
    background-color: white;

`

const Info = styled.div`
    align-items: center;
    position: absolute;
    height: 200px;
    width: 900px;
    left: 50px;
    bottom: 20px;
`



const Footer = styled.div`
    position: relative;
    height: 100px;
    text-align: center;
    color:white;
    background-color:#70F0A9;
    bottom:0px;
`


class LearnPage extends React.Component {
    constructor() {
      super();
      this.state = {
          set: null,
          flashcards: null,
          currentFlashcard: null
      };
    }

    async componentDidMount(){

        const flashcard1 = new Card({id: 1, question: "Area", answer: "Fläche"});

        const example_set = [
            "Business English",
            "This set is for people that want to learn some business english. Study well, live well.",
            "FlashyBoss2003",
            32
        ]
        

        const response = [
                {id: 1,
                answer: "Fläche",
                question: "Area"
            },{
                id:2,
                answer: "Unternehmen",
                question: "Business"
            }]

        this.setState({flashcards: response, set: example_set});
        //Here we could save the currentFlashcard id inside the user
        //and then reenter it here inside a variable for saving the current state
        //(which card was last shown when closing the application etc)
        this.setState({currentFlashcard: response[0]})
    }

    render(){
        return(
            <div>
            <Header>Header</Header>
            <InfoContainer>
                <Info>
                    <div class = "info-grid">
                        <div class = "info-block info-block-1">
                        {!this.state.flashcards ? (
            
                        <div>Name</div>
                        ) : (
                            <div class = "name-grid">
                                <div class = "set-name">
                                    {this.state.set[0]}
                                </div>
                                <div class = "creator-name">
                                    {this.state.set[2]}
                                </div>
                            </div>
                        )
                        }
                        </div>
                        <div class = "info-block info-block-2">
                        {!this.state.flashcards ? (
            
                        <div>Name</div>
                        ) : (
                            this.state.set[1]
                        )
                        }
                        </div>
                        <div class = "info-block info-block-3">
                        {!this.state.flashcards ? (
            
                        <div>Name</div>
                        ) : (
                            this.state.set[3]
                        )
                        }
                        </div>
                    </div>
                </Info>
            </InfoContainer>
            <MainContainer>
                <CardContainer>
                    
                {!this.state.flashcards ? (
                
                <div>Loading..</div>
                ) : (
                    <div>
                    <CardRender flashcard = {this.state.currentFlashcard}
                    key = {this.state.currentFlashcard.id} />
                        <div class = "button-container">
                            <div class = "left-button-container">
                            <button>left</button>
                            </div>
                            <div class = "right-button-container">
                            <button  >right</button>
                            </div>
                        </div>
                    </div>
                )}
                </CardContainer>
                
            </MainContainer>
            <Footer>Footer</Footer>
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


