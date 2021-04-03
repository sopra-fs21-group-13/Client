import React, {useState} from 'react'
import styled from 'styled-components';
import { BaseContainer } from '../../helpers/layout';
import { api, handleError } from '../../helpers/api';
import CardRender from '../../views/design/CardRender';
import LeftArrowButton from './LeftArrowButton.png';
import RightArrowButton from './RightArrowButton.png';
import LeftArrowButton_disabled from './LeftArrowButton_disabled.png';
import RightArrowButton_disabled from './RightArrowButton_disabled.png';
import MarkEverything from './MarkEverything.png';
import ShuffleCards from './ShuffleCards.png';
import ExchangeSides from './ExchangeSides.png';
import StudyOnlyStarred from './StudyOnlyStarred.png';
import ShuffleCardsActive from './ShuffleCardsActive.png';
import StudyOnlyStarredActive from './StudyOnlyStarredActive.png';
import ProfilePicture from './ProfilePicture.png';
import Likes from './Likes.png';
import BackButton from './BackButton.png';
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
    height: 700px;

`

const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    height: 600px;
    width: 2000px;
    background-color: green;
`

const InfoContainer = styled.div`
    display: relative;
    align-items: top;
    position: relative;
    align-self: center;
    height: 250px;
    background-color: white;
    justify-content: bottom;

`

const Info = styled.div`
    align-items: center;
    position: absolute;
    height: 200px;
    width: 900px;
    left: 50px;
    top:70px;
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
          all_flashcards: null,
          flashcards_starred: null,
          currentFlashcard: null,
          leftButtonDisabled: null,
          rightButtonDisabled: null,
          cardsShuffled: null,
          studyStarred: null,
          markedCards: null
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

        //This should get saved inside the user for every set. This is just a temporary representation, it can change.
        const userSettings = {
            cardsShuffled: false,
            studyStarred: false,
            lastCard: 1,
            markedCards: [
                1
            ]
        };
        
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

        this.setState({all_flashcards: response, set: example_set, 
            rightButtonDisabled: false, cardsShuffled: userSettings.cardsShuffled, studyStarred: userSettings.studyStarred,
            markedCards: userSettings.markedCards});
        

        const flashcards_starred = [];

        for(var i = 0; i < response.length; i++){
            if(userSettings.markedCards.includes(response[i].id)){
                flashcards_starred.push(response[i]);
            }
        }

        this.setState({flashcards_starred: flashcards_starred});

        //checks if the user was studying only the starred cards or not to disable the button to the right and also
        //to set the right current card (remembered from the last session through the "lastCard" attribute in the userSettings)
        if(userSettings.studyStarred){
            this.setState({currentFlashcard: flashcards_starred[userSettings.lastCard-1]});
            if (userSettings.lastCard == flashcards_starred.length){
                this.setState({rightButtonDisabled: true});
            }
        }else{
            this.setState({currentFlashcard: response[userSettings.lastCard-1]});
            if (userSettings.lastCard == response.length){
                this.setState({rightButtonDisabled: true});
            }
        }

        //checks if the left button should be disabled to prevent overflow
        if (userSettings.lastCard == 1){
            this.setState({leftButtonDisabled: true});
        }
        
    }


    //Here we check which image to use for the arrow buttons. 
    LeftArrowState = () => this.state.leftButtonDisabled ? LeftArrowButton_disabled : LeftArrowButton;
    RightArrowState = () => this.state.rightButtonDisabled ? RightArrowButton_disabled : RightArrowButton;
    ShuffleCardState = () => this.state.cardsShuffled ? ShuffleCardsActive : ShuffleCards;
    StudyStarredState = () => this.state.studyStarred ? StudyOnlyStarredActive : StudyOnlyStarred;

    //Function to check if CardRender should display only starred cards or all cards

    DisplayCards = () => this.state.studyStarred ? this.state.flashcards_starred : this.state.all_flashcards;

    //This check handles that the set can dinamically change when you un-star a card in "show only starred" mode.
    //It basically creates a new set with the updated starred cards and exchanges the one that is shown when 
    //pressing right. (same applies to the similar function for the left button)
    checkStarChange_right(){
        const flashcards_starred = []
        var index = this.state.flashcards_starred.indexOf(this.state.currentFlashcard);

        if(this.state.studyStarred){
            for(var i = 0; i < this.state.flashcards_starred.length; i++){
                if(this.state.markedCards.includes(this.state.flashcards_starred[i].id)){
                    flashcards_starred.push(this.state.flashcards_starred[i]);
                }
            }
            if(flashcards_starred.length == this.state.flashcards_starred.length){
                index ++;
            }
            if(flashcards_starred == 1){
                this.setState({rightButtonDisabled :true});
            }
            this.setState({currentFlashcard: flashcards_starred[index], flashcards_starred: flashcards_starred});
            if(index == 0){
                this.setState({leftButtonDisabled: true});
            }
        }
    }

    //check above for explanation (checkStarChange_right)
    checkStarChange_left(){
        const flashcards_starred = []
        var index = this.state.flashcards_starred.indexOf(this.state.currentFlashcard);

        if(this.state.studyStarred){
            for(var i = 0; i < this.state.flashcards_starred.length; i++){
                if(this.state.markedCards.includes(this.state.flashcards_starred[i].id)){
                    flashcards_starred.push(this.state.flashcards_starred[i]);
                }
            }
            if(flashcards_starred.length == 1){
                this.setState({rightButtonDisabled: true});
            }
            this.setState({currentFlashcard: flashcards_starred[index-1], flashcards_starred: flashcards_starred});
            if(index == 0){
                this.setState({leftButtonDisabled: true});
            }
        }
    }

    //swaps answers and questions for all cards
    switchAnswerQuestion(){
        const len = this.state.all_flashcards.length;
        const reversed = []
        const reversed_starred = []

        for(var i = 0; i<len; i++){
            var rem = this.state.all_flashcards[i];
            var rem_question = rem.question;
            rem.question = rem.answer;
            rem.answer = rem_question;
            
            reversed.push(rem);
            if (this.state.markedCards.includes(rem.id)){
                reversed_starred.push(rem);
            }
        }
        this.setState({all_flashcards:reversed});
        this.setState({flashcards_starred:reversed_starred});
    }

    render(){
        //these are the states of "disabled" for the arrow buttons. They are accessed by the img src.
        //The img src can change dinamically because of these constants. 
        const LeftButton = this.LeftArrowState();
        const RightButton = this.RightArrowState();
        const ShuffleCardState = this.ShuffleCardState();
        const StudyStarredState = this.StudyStarredState();

        //This is the actual set of flashcards that is being displayed. 
        const Flashcards = this.DisplayCards();

        

        return(
            <div>
            <Header>Header</Header>
            
            <InfoContainer>
                {//back to Dashboard button
                }
                <div class = "back-button-container">
                    <button class = "back-button">
                    <img 
                    class = "back-button-image"
                    src = {BackButton} />
                    </button>
                </div>
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
                                <div class = "profile-picture">
                                    <img 
                                    class = "profile-picture-image"
                                    src = {ProfilePicture}/>
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
                            <img
                            class = "likes-image"
                            src = {Likes}
                            />
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
                    
                {!Flashcards ? (
                <div>Loading..</div>
                ) : (
                    //Top Menu Buttons with dinamic change in appereance by onClick().
                    //The dinamic change in color happens through the img src, when the buttons are clicked the states are
                    //checked and then changed accordingly. These states are then used to change the behavior of the page.
                    <div class = "learn-area">
                        <div class = "settings-container">
                            <button class = "only-starred-button"
                                onClick = {() => {
                                    {//checks if the starred flashcards changed
                                    }
                                    const flashcards_starred = [];
                                    for(var i = 0; i < Flashcards.length; i++){
                                        if(this.state.markedCards.includes(Flashcards[i].id)){
                                            flashcards_starred.push(Flashcards[i]);
                                        }
                                        
                                    }
                                    this.setState({flashcards_starred: flashcards_starred});
                                    {
                                        //changes between only starred and all flashcards
                                    }
                                    if(!this.state.studyStarred){
                                        this.setState({studyStarred: true, currentFlashcard: flashcards_starred[0],
                                        leftButtonDisabled: true, rightButtonDisabled: false})
                                        if(flashcards_starred.length == 1){
                                            this.setState({rightButtonDisabled :true});
                                        }
                                    }else{
                                        this.setState({studyStarred: false, currentFlashcard: this.state.all_flashcards[0],
                                        leftButtonDisabled: true, rightButtonDisabled: false})
                                        if(this.state.all_flashcards.length == 1){
                                            this.setState({rightButtonDisabled :true});
                                        }
                                    }
                                }} 
                            >
                                <img class = "only-starred-image"
                                src = {StudyStarredState} />
                            </button>
                            <button class = "shuffle-button"
                                    onClick = {() => {
                                    {!this.state.cardsShuffled ? this.setState({cardsShuffled: true}) 
                                        : this.setState({cardsShuffled: false})
                                    }
                                    
                                }} >
                                <img class = "shuffle-image"
                                    src = {ShuffleCardState} />
                            </button>
                            <button class = "exchange-sides-button">
                                <img class = "exchange-sides-image"
                                    onClick = {() => {this.switchAnswerQuestion()}}
                                    src = {ExchangeSides} />
                            </button>
                            <button class = "star-everything-button">
                                <img class = "star-everything-image"
                                    src = {MarkEverything} />
                            </button>
                        </div>
                        { //the cardRender component actually renders the flashcard. It takes the currentFlashcard as an input, so that it can be changed dinamically by the arrow Keys.
                        }
                        <CardRender
                        markedCards = {this.state.markedCards}
                        flashcard = {this.state.currentFlashcard}
                        current_place = {Flashcards.indexOf(this.state.currentFlashcard)}
                        set_length = {Flashcards.length}
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
                                        if(!this.state.studyStarred){
                                            this.setState({currentFlashcard: Flashcards[Flashcards.indexOf(this.state.currentFlashcard) - 1]});  
                                            }
                                        this.setState({rightButtonDisabled: false});
                                        this.checkStarChange_left();
                                        {if(Flashcards.indexOf(this.state.currentFlashcard) - 1 == 0){
                                            this.setState({leftButtonDisabled: true});
                                        }}
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
                                        if(!this.state.studyStarred){
                                        this.setState({currentFlashcard: Flashcards[Flashcards.indexOf(this.state.currentFlashcard) + 1]});
                                        }
                                        this.setState({leftButtonDisabled: false})
                                        this.checkStarChange_right();
                                        {if(Flashcards.indexOf(this.state.currentFlashcard) >= Flashcards.length-2){
                                            this.setState({rightButtonDisabled: true});
                                        }}
                                        
                                    }}><img 
                                    class = "right-arrow-image"
                                    src = {RightButton}/></button>
                                </div>
                            </div>
                    </div>
                )}
                
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


