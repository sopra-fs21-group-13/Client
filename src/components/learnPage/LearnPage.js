import React, {useState} from 'react'
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import CardRender from '../../views/design/CardRender';
import LeftArrowButton from './LeftArrowButton.png';
import RightArrowButton from './RightArrowButton.png';
import LeftArrowButton_disabled from './LeftArrowButton_disabled.png';
import RightArrowButton_disabled from './RightArrowButton_disabled.png';
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

const ArrowButton = styled.button`
&:hover {
    transform: translateY(-2px);
  }
  padding: 6px;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 13px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  width: ${props => props.width || null};
  height: 35px;
  border: none;
  border-radius: 20px;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  opacity: ${props => (props.disabled ? 0.4 : 1)};
  background: rgb(16, 89, 255);
  transition: all 0.3s ease;
`;


class LearnPage extends React.Component {
    constructor() {
      super();
      this.state = {
          set: null,
          flashcards: null,
          currentFlashcard: null,
          leftButtonDisabled: null,
          rightButtonDisabled: null
      };
    }

    async componentDidMount(){

        const flashcard1 = new Card({id: 1, question: "Area", answer: "Fläche"});

        //This probably won't be implemented with an array. This is placeholder information for the set info.
        const example_set = [
            "Business English",
            "This set is for people that want to learn some business english. Study well, live well.",
            "FlashyBoss2003",
            32
        ]
        
        //This is a placeholder response from the backend for a GET request.
        const response = [
                {id: 0,
                answer: "Fläche",
                question: "Area"
            },{
                id:1,
                answer: "Unternehmen",
                question: "Business"
            },
            {
                id:2,
                answer: "Mathe",
                question: "Math"
            }]

        //Here we could save the currentFlashcard id inside the user
        //and then reenter it here inside a variable for saving the current state
        //(which card was last shown when closing the application etc)
        this.setState({flashcards: response, set: example_set, currentFlashcard: response[0], leftButtonDisabled: true, rightButtonDisabled: false});

        if (response.length == 1){
            this.setState({rightButtonDisabled: true})
        }
        
        
    }

    //Here we check which image to use for the arrow buttons. 
    LeftArrowState = () => this.state.leftButtonDisabled ? LeftArrowButton_disabled : LeftArrowButton;
    RightArrowState = () => this.state.rightButtonDisabled ? RightArrowButton_disabled : RightArrowButton;

    render(){
        //these are the states of "disabled" for the arrow buttons. They are accessed by the img src.
        //The img src can change dinamically because of these constants. 
        const LeftButton = this.LeftArrowState();
        const RightButton = this.RightArrowState();
        return(
            <div>
            <Header>Header</Header>
            <InfoContainer>
                <Info>
                    {
                        //This is the info block that shows the information about the set that is being learned. check learnPage.css for the css styling. I opted for the external css file
                        //because it was easier to style multiple components that way. Check the "class" of a <div> inside the css file for the styling applied to that particular <div>
                    }
                    <div class = "info-grid">
                        <div class = "info-block info-block-1">
                        {!this.state.set ? (
            
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
                        {!this.state.set ? (
            
                        <div>Name</div>
                        ) : (
                            this.state.set[1]
                        )
                        }
                        </div>
                        <div class = "info-block info-block-3">
                            likes: 
                        {!this.state.set ? (
            
                        <div>Name</div>
                        ) : (
                            " "+ this.state.set[3]
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
                    //the cardRender component actually renders the flashcard. It takes the currentFlashcard as an input, so that it can be changed dinamically by the arrow Keys.
                    <div>
                    <CardRender flashcard = {this.state.currentFlashcard}
                    key = {this.state.currentFlashcard.id} />
                        <div class = "button-container">
                            <div class = "left-button-container">
                                {//buttons are used for the size of the "onClick" area. The png of the images are squared, so the buttons need to have the onClick function,
                                //but only the images are seen. Check the learnPage.css for the implementation of the image on the button
                                }
                                <button class = "left-button"
                                disabled={this.state.leftButtonDisabled}
                                //This function changes the visible card. The currentFlashcard state decides which card is shown. It show the next card by incrementing the id
                                //and also checks if one of the arrow buttons should be disabled because of overflow.
                                onClick={() => {
                                    this.setState({rightButtonDisabled: false});
                                    {if(this.state.currentFlashcard.id - 1 == 0){
                                        this.setState({leftButtonDisabled: true});
                                    }}
                                    this.setState({currentFlashcard: this.state.flashcards[this.state.currentFlashcard.id - 1]});  
                            }} >
                                {//the actual image of the button. It references the constant from above in the render function that decides through the LeftArrowState() function if it should
                                //be disabled or not
                                }
                                    <img 
                                    class = "left-arrow-image"
                                    src = {LeftButton}
                                    
                                    /></button>
                            </div>
                            {//same as above with the left button, but with different edge points.
                            }
                            <div class = "right-button-container">
                                <button class = "right-button"
                                disabled={this.state.rightButtonDisabled}
                                onClick={() => {
                                    this.setState({leftButtonDisabled: false});
                                    {if(this.state.currentFlashcard.id >= this.state.flashcards.length-2){
                                        this.setState({rightButtonDisabled: true});
                                    }}
                                    this.setState({currentFlashcard: this.state.flashcards[this.state.currentFlashcard.id + 1]});
                                }}><img 
                                class = "right-arrow-image"
                                src = {RightButton}/></button>
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


