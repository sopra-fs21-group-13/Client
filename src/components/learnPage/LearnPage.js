import React, { useState } from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import CardRender from "../../views/design/CardRender";
import LeftArrowButton from "./LeftArrowButton.png";
import RightArrowButton from "./RightArrowButton.png";
import LeftArrowButton_disabled from "./LeftArrowButton_disabled.png";
import RightArrowButton_disabled from "./RightArrowButton_disabled.png";
import MarkEverything from "./MarkEverything.png";
import ShuffleCards from "./ShuffleCards.png";
import ExchangeSides from "./ExchangeSides.png";
import StudyOnlyStarred from "./StudyOnlyStarred.png";
import ShuffleCardsActive from "./ShuffleCardsActive.png";
import StudyOnlyStarredActive from "./StudyOnlyStarredActive.png";
import ProfilePicture from "./ProfilePicture.png";
import Likes from "./Likes.png";
import BackButton from "./BackButton.png"
import Card from "../shared/models/Card";
import { withRouter } from "react-router-dom";
import Header from "../header/header.js";
import styles from "./learnPage.css";
import Footer from "../footer/Footer.js";
import UserSettings from "../shared/models/UserSettings";
import User from '../shared/models/User';
import OnlineSign from "../shared/images/OnlineSign.png";
import OfflineSign from "../shared/images/OfflineSign.png";


//profile pictures
import char1 from "../profile/char1.jpg";
import char2 from "../profile/char2.jpg";
import char3 from "../profile/char3.jpg";
import char4 from "../profile/char4.jpg";
import char5 from "../profile/char5.jpg";
import char6 from "../profile/char6.jpg";
import char7 from "../profile/char7.jpg";
import char8 from "../profile/char8.jpg";
import char9 from "../profile/char9.jpg";
import char10 from "../profile/char10.jpg";
import char11 from "../profile/char11.jpg";
import char12 from "../profile/char12.jpg";
import char13 from "../profile/char13.jpg";
import char14 from "../profile/char14.jpg";
import char15 from "../profile/char15.jpg";
import char16 from "../profile/char16.jpg";

const Container = styled(BaseContainer)`
  color: black;
  text-align: center;
`;

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
  background-color: white;
  height: 700px;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  height: 600px;
  width: 2000px;
  background-color: green;
`;

const InfoContainer = styled.div`
  display: relative;
  align-items: top;
  position: relative;
  align-self: center;
  height: 250px;
  background-color: white;
  justify-content: bottom;
  
`;

const Info = styled.div`
  align-items: center;
  position: absolute;
  height: 200px;
  width: 900px;
  left: 50px;
  top: 70px;
`;

class LearnPage extends React.Component {
  constructor() {
    super();
    this.handler = (ev) => {  
      ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close? Data like newly added starred cards might get lost in the process!';
  };
    this.state = {
      cardSet: null,
      setId: null,
      all_flashcards: null,
      flashcards_starred: null,
      all_flashcards_rem: null,
      flashcards_starred_rem: null,
      currentFlashcard: null,
      leftButtonDisabled: null,
      rightButtonDisabled: null,
      cardsShuffled: null,
      studyStarred: null,
      markedCards: null,
      settingsId: null,
      foreignUsername: null,
      user:null,
      userPicturesDict:{1: char1, 2: char2, 3: char3, 4: char4, 5: char5, 6: char6,
        7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16}
    };
  }


  async componentDidMount(){

    //handler so that when window or tab gets closed you can save settings.
    


    //adds listener 
    window.addEventListener("beforeunload", this.handler)

    const set = this.props.location.state.set;
    
    if(set.likes == null){
      set.likes = 0;
    }
    
    const response = set.cards;
    this.setState({setId: set.setId});
    this.setState({cardSet: set});

    api.get("/users/" + set.user).then(response=>{

      let user = new User(response.data);

      this.setState({user: user})
      this.setState({foreignUsername: user.username});
    }).catch(e=>{
      alert(`Something went wrong while geting user: \n${handleError(e)}`);
  });

    api
      .get("/settings/" + localStorage.getItem("userId") + "/" + set.setId)
      .then((result) => {
        
        let userSettings = new UserSettings(result.data);

        this.setState({settingId: userSettings.settingsId})

        if(userSettings.markedCards == null){
          userSettings.markedCards = [];
          console.log("hi")
        }
        if(userSettings.lastCard == null || userSettings.lastCard <= 0 || userSettings.lastCard > set.cards.length){
          userSettings.lastCard = 1;
        }else{
          userSettings.lastCard += 1;
        }


        

        //Here we could save the currentFlashcard id inside the user
      //and then reenter it here inside a variable for saving the current state
      //(which card was last shown when closing the application etc)

    const ordered_response = [];

    
    if (userSettings.markedCards == null) {
      userSettings.markedCards = [];
      console.log("hi");
    }

    if (userSettings.lastCard == null) {
      userSettings.lastCard = 1;
    }
    

    if (userSettings.cardsShuffled) {
      this.setState({
        all_flashcards: ordered_response,
        all_flashcards_rem: response,
        rightButtonDisabled: false,
        cardsShuffled: userSettings.cardsShuffled,
        studyStarred: userSettings.studyStarred,
        markedCards: userSettings.markedCards,
      });
    } else {
      this.setState({
        all_flashcards: response,
        all_flashcards_rem: response,
        rightButtonDisabled: false,
        cardsShuffled: userSettings.cardsShuffled,
        studyStarred: userSettings.studyStarred,
        markedCards: userSettings.markedCards,
      });
    }

    const flashcards_starred = [];

    for (var i = 0; i < response.length; i++) {
      if (userSettings.markedCards.includes(response[i].cardId)) {
        flashcards_starred.push(response[i]);
      }
    }

    this.setState({
      flashcards_starred: flashcards_starred,
      flashcards_starred_rem: flashcards_starred,
    });

    //checks if ordered_response needs to be taken from starred flashcards or not.
    if (userSettings.cardsShuffled) {
      if(userSettings.studyStarred){
        for (var i = 0; i < userSettings.savedOrder.length; i++) {
          for(var j = 0; j < flashcards_starred.length; j++){
            if(flashcards_starred[j].cardId == userSettings.savedOrder[i]){
              ordered_response.push(flashcards_starred[j]);
            }
          }
        }
      }else{
        for (var i = 0; i < userSettings.savedOrder.length; i++) {
          for(var j = 0; j < response.length; j++){
            if(response[j].cardId == userSettings.savedOrder[i]){
              ordered_response.push(response[j]);
            }
            console.log(response[j].cardId + "/" + userSettings.savedOrder[i])
          }
        }
      }
    }

    

    //checks if the user was studying only the starred cards or not to disable the button to the right and also
    //to set the right current card (remembered from the last session through the "lastCard" attribute in the userSettings)
    if (userSettings.studyStarred && !userSettings.cardsShuffled) {
      this.setState({
        currentFlashcard: flashcards_starred[userSettings.lastCard - 1],
      });
      if (userSettings.lastCard == flashcards_starred.length) {
        this.setState({ rightButtonDisabled: true });
      }
    } else {
      if (userSettings.cardsShuffled) {
        this.setState({
          currentFlashcard: ordered_response[userSettings.lastCard - 1],
        });
        if (userSettings.lastCard == ordered_response.length) {
          this.setState({ rightButtonDisabled: true });
        }
      } else {
        this.setState({
          currentFlashcard: response[userSettings.lastCard - 1],
        });
        if (userSettings.lastCard == response.length) {
          this.setState({ rightButtonDisabled: true });
        }
      }
    }

    //checks if the left button should be disabled to prevent overflow
    if (userSettings.lastCard == 1) {
      this.setState({ leftButtonDisabled: true });
    }
  



      })
      .catch((e) => {
        alert(
          `Something went wrong while fetching user settings: \n${handleError(
            e
          )}`
        );
      });
    }
    

  //Here we check which image to use for the arrow buttons.
  LeftArrowState = () =>
    this.state.leftButtonDisabled ? LeftArrowButton_disabled : LeftArrowButton;
  RightArrowState = () =>
    this.state.rightButtonDisabled
      ? RightArrowButton_disabled
      : RightArrowButton;
  ShuffleCardState = () =>
    this.state.cardsShuffled ? ShuffleCardsActive : ShuffleCards;
  StudyStarredState = () =>
    this.state.studyStarred ? StudyOnlyStarredActive : StudyOnlyStarred;

  //Function to check if CardRender should display only starred cards or all cards

  DisplayCards = () =>
    this.state.studyStarred
      ? this.state.flashcards_starred
      : this.state.all_flashcards;

  //This check handles that the set can dinamically change when you un-star a card in "show only starred" mode.
  //It basically creates a new set with the updated starred cards and exchanges the one that is shown when
  //pressing right. (same applies to the similar function for the left button)
  checkStarChange_right() {
    const flashcards_starred = [];
    var index = this.state.flashcards_starred.indexOf(
      this.state.currentFlashcard
    );

    if (this.state.studyStarred) {
      for (var i = 0; i < this.state.flashcards_starred.length; i++) {
        if (
          this.state.markedCards.includes(this.state.flashcards_starred[i].cardId)
        ) {
          flashcards_starred.push(this.state.flashcards_starred[i]);
        }
      }
      if (flashcards_starred.length == this.state.flashcards_starred.length) {
        index++;
      }
      if (flashcards_starred == 1) {
        this.setState({ rightButtonDisabled: true });
      }
      this.setState({
        currentFlashcard: flashcards_starred[index],
        flashcards_starred: flashcards_starred,
      });
      if (index == 0) {
        this.setState({ leftButtonDisabled: true });
      }
    }
  }

  //check above for explanation (checkStarChange_right)
  checkStarChange_left() {
    const flashcards_starred = [];
    var index = this.state.flashcards_starred.indexOf(
      this.state.currentFlashcard
    );

    if (this.state.studyStarred) {
      for (var i = 0; i < this.state.flashcards_starred.length; i++) {
        if (
          this.state.markedCards.includes(this.state.flashcards_starred[i].cardId)
        ) {
          flashcards_starred.push(this.state.flashcards_starred[i]);
        }
      }
      if (flashcards_starred.length == 1) {
        this.setState({ rightButtonDisabled: true });
      }
      this.setState({
        currentFlashcard: flashcards_starred[index - 1],
        flashcards_starred: flashcards_starred,
      });
      if (index == 0) {
        this.setState({ leftButtonDisabled: true });
      }
    }
  }

  //swaps answers and questions for all cards
  switchAnswerQuestion() {
    const len = this.state.all_flashcards.length;
    const reversed = [];
    const reversed_starred = [];

    for (var i = 0; i < len; i++) {
      var rem = this.state.all_flashcards[i];
      var rem_question = rem.question;
      rem.question = rem.answer;
      rem.answer = rem_question;

      reversed.push(rem);
      if (this.state.markedCards.includes(rem.cardId)) {
        reversed_starred.push(rem);
      }
    }
    this.setState({ all_flashcards: reversed });
    this.setState({ flashcards_starred: reversed_starred });
  }

  //Fisher-yates algorithm used to shuffle the cards
  //two new sets are created to remember the order of the original set / starred set.
  shuffleCards() {
    if (!this.state.cardsShuffled) {
      this.setState({ flashcards_starred_rem: this.state.flashcards_starred });
      this.setState({ all_flashcards_rem: this.state.all_flashcards });

      const shuffled = [];
      const shuffled_starred = [];
      for (var i = 0; i < this.state.all_flashcards.length; i++) {
        shuffled.push(this.state.all_flashcards[i]);
      }

      for (var i = 0; i < this.state.flashcards_starred.length; i++) {
        shuffled_starred.push(this.state.flashcards_starred[i]);
      }

      for (var i = shuffled.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * shuffled.length);
        const rem = shuffled[i];
        shuffled[i] = shuffled[k];
        shuffled[k] = rem;
      }

      for (var i = shuffled_starred.length - 1; i > 0; i--) {
        const k = Math.floor(Math.random() * shuffled_starred.length);
        const rem = shuffled_starred[i];
        shuffled_starred[i] = shuffled_starred[k];
        shuffled_starred[k] = rem;
      }

      //depending on if only starred are shown or not the shown Flashcard is changed to index 0 of the shuffled sets.
      if (this.state.studyStarred) {
        this.setState({ currentFlashcard: shuffled_starred[0] });
      } else {
        this.setState({ currentFlashcard: shuffled[0] });
      }

      this.setState({
        all_flashcards: shuffled,
        flashcards_starred: shuffled_starred,
      });
      this.setState({ rightButtonDisabled: false, leftButtonDisabled: true });
      //check if the arrow buttons are disabled or not. Left should always be here, as we start from index 0.
      if (shuffled_starred.length == 1 && this.state.studyStarred) {
        this.setState({ rightButtonDisabled: true });
      }
      if (this.state.all_flashcards.length == 1 && !this.state.studyStarred) {
        this.setState({ rightButtonDisabled: true });
      }
    } else {
      this.unshuffleCards();
    }
  }

  //here we need to check if any cards were removed or added to the starred set
  unshuffleCards() {
    const flashcards_starred = [];

    for (var i = 0; i < this.state.flashcards_starred_rem.length; i++) {
      if (
        this.state.markedCards.includes(this.state.flashcards_starred_rem[i].cardId)
      ) {
        flashcards_starred.push(this.state.flashcards_starred_rem[i]);
      }
    }

    if (this.state.studyStarred) {
      this.setState({ currentFlashcard: flashcards_starred[0] });
    } else {
      this.setState({ currentFlashcard: this.state.all_flashcards_rem[0] });
    }

    this.setState({
      rightButtonDisabled: false,
      leftButtonDisabled: true,
      all_flashcards: this.state.all_flashcards_rem,
      flashcards_starred: flashcards_starred,
    });

    if (flashcards_starred.length == 1 && this.state.studyStarred) {
      this.setState({ rightButtonDisabled: true });
    }

    if (this.state.all_flashcards.length == 1 && !this.state.studyStarred) {
      this.setState({ rightButtonDisabled: true });
    }
  }

  starAllCards() {
    for (var i = 0; i < this.state.all_flashcards.length; i++) {
      if (!this.state.markedCards.includes(this.state.all_flashcards[i].cardId)) {
        this.state.markedCards.push(this.state.all_flashcards[i].cardId);
      }
    }

    const flashcards_starred = [];
    const flashcards_starred_rem = [];

    for (var i = 0; i < this.state.all_flashcards.length; i++) {
      flashcards_starred.push(this.state.all_flashcards[i]);
    }
    //this is necessary so that this works also for shuffled cards.
    for (var i = 0; i < this.state.all_flashcards_rem.length; i++) {
      flashcards_starred_rem.push(this.state.all_flashcards_rem[i]);
    }

    //this is so that the page can refresh and the star is shown even if the shown card was unstarred before.
    const card_update = { cardId: null, question: null, answer: null };
    var index = 0;
    index = flashcards_starred.indexOf(this.state.currentFlashcard);

    card_update.cardId = this.state.currentFlashcard.cardId;
    card_update.question = this.state.currentFlashcard.question;
    card_update.answer = this.state.currentFlashcard.answer;

    flashcards_starred[index] = card_update;

    this.setState({ currentFlashcard: card_update });

    this.setState({
      flashcards_starred: flashcards_starred,
      all_flashcards: flashcards_starred,
      all_flashcards_rem: flashcards_starred_rem,
      flashcards_starred_rem: flashcards_starred_rem,
    });

    if (index == 0) {
      this.setState({ leftButtonDisabled: true });
    }
    if (flashcards_starred.length == 1) {
      this.setState({ rightButtonDisabled: true });
    }
    if (index == flashcards_starred.length - 1) {
      this.setState({ rightButtonDisabled: true });
    }
  }

  unstarAllCards() {
    this.state.markedCards = [];
    if (this.state.studyStarred) {
      //update visible card so that it doesn't show 0/0.
      //This is not necessary anymore, as button gets disabled when studying only starred cards.
      const card_update = { cardId: null, question: null, answer: null };

      card_update.cardId = this.state.all_flashcards[0].cardId;
      card_update.question = this.state.all_flashcards[0].question;
      card_update.answer = this.state.all_flashcards[0].answer;

      this.state.all_flashcards[0] = card_update;

      this.setState({ studyStarred: false, currentFlashcard: card_update });
    } else {
      //update visible card so that the star vanishes.
      const card_update = { cardId: null, question: null, answer: null };
      var index = 0;
      index = this.state.all_flashcards.indexOf(this.state.currentFlashcard);

      card_update.cardId = this.state.currentFlashcard.cardId;
      card_update.question = this.state.currentFlashcard.question;
      card_update.answer = this.state.currentFlashcard.answer;

      this.state.all_flashcards[index] = card_update;

      this.setState({ currentFlashcard: card_update });
    }

    this.state.flashcards_starred = [];
  }

  pushSettings(){

    const savedOrder = [];
    let lastCard = 0;

  if(this.state.studyStarred){
    for (var i = 0; i < this.state.flashcards_starred.length; i++){
      savedOrder.push(this.state.flashcards_starred[i].cardId)
    }
    lastCard = this.state.flashcards_starred.indexOf(this.state.currentFlashcard);
  }else{
    for (var i = 0; i < this.state.all_flashcards.length; i++){
      savedOrder.push(this.state.all_flashcards[i].cardId)
    }
    lastCard = this.state.all_flashcards.indexOf(this.state.currentFlashcard);
  }

    const requestBody = {
      settingsId: Number(this.state.settingsId),
      userID: Number(localStorage.getItem("userId")),
      setID: this.state.setId,
      lastCard: lastCard,
      cardsShuffled: this.state.cardsShuffled,
      studyStarred: this.state.studyStarred,
      markedCards: this.state.markedCards,
      savedOrder: savedOrder,
    }
    api.post("/settings", requestBody).then(response=>{
      console.log("settings pushed")
    }).catch(err=>{
        console.log(err);
    })
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload", this.handler)
    this.pushSettings();
  }



  goToDashboard() {
    this.props.history.push(`/Dashboard`)
  }

  goToPublicProfile() {
    this.props.history.push({pathname: "PublicProfile", state: {userId: this.state.cardSet.user}})
  }

  render() {
    //these are the states of "disabled" for the arrow buttons. They are accessed by the img src bellow.
    //The img sources can change dinamically because of these constants.
    const LeftButton = this.LeftArrowState();
    const RightButton = this.RightArrowState();
    const ShuffleCardState = this.ShuffleCardState();
    const StudyStarredState = this.StudyStarredState();

    //This is the actual set of flashcards that is being displayed. It changes between the starred cards and all cards
    const Flashcards = this.DisplayCards();

    return (
      <div>
        <Header />
        <div id="screen">  {/**added */}
          <div class="back-button-container"> {/**added */}
              <button
                class="back-button"
                onClick={() => {
                  this.goToDashboard();
                }}
              >
                <img class="back-button-image" src={BackButton} />
              </button>
            </div>
          <div class="board_learnpage">
        <InfoContainer>
          {
            //back to Dashboard button
          }
          
          <Info>
            {
              //This is the info block that shows the information about the set that is being learned. check learnPage.css for the css styling. I opted for the external css file
              //because it was easier to style multiple components that way. Check the "class" of a <div> inside the css file for the styling applied to that particular <div>
            }
            <div class="info-grid">
              <div class="info-block info-block-1">
                {!this.state.cardSet || !this.state.user ? (
                  <div>Name</div>
                ) : (
                  <div class="name-grid">
                    <div class="set-name">{this.state.cardSet.title}</div>
                    <button
                      class="user-profile"
                      onClick={() => {
                        this.goToPublicProfile();
                      }}
                    >
                      <div class="profile-picture">
                        <img
                          class="profile-picture-image"
                          src={this.state.userPicturesDict[this.state.user.photo]}
                        />
                        <img className = "online-offline"
                        src={(this.state.user.status == "ONLINE") ? OnlineSign : OfflineSign}/>
                        
                      </div>
                      <div class="creator-name">{this.state.foreignUsername}</div>
                    </button>
                  </div>
                )}
              </div>
              <div class="info-block info-block-3">
                <img class="likes-image" src={Likes} />
                {!this.state.cardSet ? <div>Name</div> : " " + this.state.cardSet.likes}
              </div>
            </div>
          </Info>
        </InfoContainer>
        <MainContainer>
          {(!Flashcards || !this.state.markedCards || !this.state.currentFlashcard)  ? (
            <div>Loading.. {console.log(this.state.currentFlashcard)} </div>
          ) : (
            //Top Menu Buttons with dinamic change in appereance by onClick().
            //The dinamic change in color happens through the img src, when the buttons are clicked the states are
            //checked and then changed accordingly. These states are then used to change the behavior of the page.
            <div class="learn-area">
              <div class="settings-container">
                <button
                  class="only-starred-button"
                  disabled={this.state.markedCards.length == 0}
                  onClick={() => {
                    {
                      //checks if the starred flashcards changed
                    }
                    const flashcards_starred = [];
                    for (var i = 0; i < Flashcards.length; i++) {
                      if (this.state.markedCards.includes(Flashcards[i].cardId)) {
                        flashcards_starred.push(Flashcards[i]);
                      }
                    }
                    //here to prevent the flashcard order from resetting when shuffled.
                    if (
                      this.state.flashcards_starred.length !=
                        flashcards_starred &&
                      this.state.cardsShuffled
                    ) {
                      let difference = flashcards_starred.filter(
                        (x) => !this.state.flashcards_starred.includes(x)
                      );
                      const flashcards_starred_shuffled = [
                        ...this.state.flashcards_starred,
                      ];
                      for (var j = 0; j < difference.length; i++) {
                        flashcards_starred_shuffled.push(difference[j]);
                      }

                      this.setState({
                        flashcards_starred: flashcards_starred_shuffled,
                      });
                      //changes between only starred and all flashcards
                      if (!this.state.studyStarred) {
                        this.setState({
                          studyStarred: true,
                          currentFlashcard: flashcards_starred_shuffled[0],
                          leftButtonDisabled: true,
                          rightButtonDisabled: false,
                        });
                        if (flashcards_starred_shuffled.length == 1) {
                          this.setState({ rightButtonDisabled: true });
                        }
                      } else {
                        this.setState({
                          studyStarred: false,
                          currentFlashcard: this.state.all_flashcards[0],
                          leftButtonDisabled: true,
                          rightButtonDisabled: false,
                        });
                        if (this.state.all_flashcards.length == 1) {
                          this.setState({ rightButtonDisabled: true });
                        }
                      }
                    } else {
                      this.setState({ flashcards_starred: flashcards_starred });
                      //changes between only starred and all flashcards
                      if (!this.state.studyStarred) {
                        this.setState({
                          studyStarred: true,
                          currentFlashcard: flashcards_starred[0],
                          leftButtonDisabled: true,
                          rightButtonDisabled: false,
                        });
                        if (flashcards_starred.length == 1) {
                          this.setState({ rightButtonDisabled: true });
                        }
                      } else {
                        this.setState({
                          studyStarred: false,
                          currentFlashcard: this.state.all_flashcards[0],
                          leftButtonDisabled: true,
                          rightButtonDisabled: false,
                        });
                        if (this.state.all_flashcards.length == 1) {
                          this.setState({ rightButtonDisabled: true });
                        }
                      }
                    }
                  }}
                >
                  <img class="only-starred-image" src={StudyStarredState} />
                </button>
                <button
                  class="shuffle-button"
                  onClick={() => {
                    {
                      !this.state.cardsShuffled
                        ? this.setState({ cardsShuffled: true })
                        : this.setState({ cardsShuffled: false });
                    }
                  }}
                >
                  <img
                    class="shuffle-image"
                    onClick={() => {
                      this.shuffleCards();
                    }}
                    src={ShuffleCardState}
                  />
                </button>
                <button class="exchange-sides-button">
                  <img
                    class="exchange-sides-image"
                    onClick={() => {
                      this.switchAnswerQuestion();
                    }}
                    src={ExchangeSides}
                  />
                </button>
                <button
                  class="star-everything-button"
                  disabled={this.state.studyStarred}
                >
                  <img
                    class="star-everything-image"
                    onClick={() => {
                      if (
                        this.state.all_flashcards.length ==
                        this.state.flashcards_starred.length
                      ) {
                        this.unstarAllCards();
                      } else {
                        this.starAllCards();
                      }
                    }}
                    src={MarkEverything}
                  />
                </button>
              </div>
              {
                //the cardRender component actually renders the flashcard. It takes the currentFlashcard as an input, so that it can be changed dinamically by the arrow Keys.
              }
              <CardRender
                markedCards={this.state.markedCards}
                flashcard={this.state.currentFlashcard}
                current_place={Flashcards.indexOf(this.state.currentFlashcard)}
                set_length={Flashcards.length}
                key={this.state.currentFlashcard.cardId}
              />
              <div class="button-container">
                <div class="left-button-container">
                  {
                    //buttons are used for the size of the "onClick" area. The png of the images are squared, so the buttons need to have the onClick function,
                    //but only the images are seen. Check the learnPage.css for the implementation of the image on the button
                  }
                  <button
                    class="left-button"
                    disabled={this.state.leftButtonDisabled}
                    //This function changes the visible card. The currentFlashcard state decides which card is shown. It show the next card by incrementing the id
                    //and also checks if one of the arrow buttons should be disabled because of overflow.
                    onClick={() => {
                      if (!this.state.studyStarred) {
                        this.setState({
                          currentFlashcard:
                            Flashcards[
                              Flashcards.indexOf(this.state.currentFlashcard) -
                                1
                            ],
                        });
                      }
                      this.setState({ rightButtonDisabled: false });
                      this.checkStarChange_left();
                      {
                        if (
                          Flashcards.indexOf(this.state.currentFlashcard) - 1 ==
                          0
                        ) {
                          this.setState({ leftButtonDisabled: true });
                        }
                      }
                    }}
                  >
                    {
                      //the actual image of the button. It references the constant from above in the render function that decides through the LeftArrowState() function if it should
                      //be disabled or not
                    }
                    <img class="left-arrow-image" src={LeftButton} />
                  </button>
                </div>
                {
                  //same as above with the left button, but with different edge points.
                }
                <div class="right-button-container">
                  <button
                    class="right-button"
                    disabled={this.state.rightButtonDisabled}
                    onClick={() => {
                      if (!this.state.studyStarred) {
                        this.setState({
                          currentFlashcard:
                            Flashcards[
                              Flashcards.indexOf(this.state.currentFlashcard) +
                                1
                            ],
                        });
                      }
                      this.setState({ leftButtonDisabled: false });
                      this.checkStarChange_right();
                      {
                        if (
                          Flashcards.indexOf(this.state.currentFlashcard) >=
                          Flashcards.length - 2
                        ) {
                          this.setState({ rightButtonDisabled: true });
                        }
                      }
                    }}
                  >
                    <img class="right-arrow-image" src={RightButton} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </MainContainer>
        </div>
        
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
export default withRouter(LearnPage);
