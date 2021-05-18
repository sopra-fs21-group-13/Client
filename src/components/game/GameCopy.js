import React, { useState } from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { api, handleError } from "../../helpers/api";
import CardRender from "../../views/design/CardRender";
import LeftArrowButton from "../learnPage/LeftArrowButton.png";
import RightArrowButton from "../learnPage/RightArrowButton.png";
import LeftArrowButton_disabled from "../learnPage/LeftArrowButton_disabled.png";
import RightArrowButton_disabled from "../learnPage/RightArrowButton_disabled.png";
import MarkEverything from "../learnPage/MarkEverything.png";
import ShuffleCards from "../learnPage/ShuffleCards.png";
import ExchangeSides from "../learnPage/ExchangeSides.png";
import StudyOnlyStarred from "../learnPage/StudyOnlyStarred.png";
import ShuffleCardsActive from "../learnPage/ShuffleCardsActive.png";
import StudyOnlyStarredActive from "../learnPage/StudyOnlyStarredActive.png";
import ProfilePicture from "../learnPage/ProfilePicture.png";
import Likes from "../learnPage/Likes.png";
import BackButton from "../learnPage/BackButton.png";
import Card from "../shared/models/Card";
import Set from "../shared/models/Set"
import { withRouter } from "react-router-dom";
import Header from "../header/header.js";
import Footer from "../footer/Footer.js";
import UserSettings from "../shared/models/UserSettings";
import User from '../shared/models/User';
import OnlineSign from "../shared/images/OnlineSign.png";
import OfflineSign from "../shared/images/OfflineSign.png";
import GameCard from "../../views/design/GameCard.js"
import "./game.css"


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

class Game extends React.Component {
  constructor() {
    super();
    this.handler = (ev) => {  
      ev.preventDefault();
      return ev.returnValue = 'Are you sure you want to close? Data like newly added starred cards might get lost in the process!';
  };
    this.state = {
      cardSet: Set,
      setId: 0,
      all_flashcards: [Card],
      flashcards_starred: [Card],
      all_flashcards_rem: [Card],
      flashcards_starred_rem: [Card],
      currentFlashcard: Card,
      leftButtonDisabled: true,
      rightButtonDisabled: true,
      cardsShuffled: [Card],
      studyStarred: [Card],
      markedCards: [Card],
      settingsId: 1,
      foreignUsername: "Neyz",
      user: User
    };
  }

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

  DisplayCards = () =>
    this.state.studyStarred
      ? this.state.flashcards_starred
      : this.state.all_flashcards;


  render() {

    const LeftButton = this.LeftArrowState();
    const RightButton = this.RightArrowState();
    const ShuffleCardState = this.ShuffleCardState();
    const StudyStarredState = this.StudyStarredState();
   
    //This is the actual set of flashcards that is being displayed. It changes between the starred cards and all cards
    const Flashcards = this.DisplayCards();
    // const {cardSet} = this.state;
    // this.title(() => {cardSet.title = "abc"});

    return (
      <div>
        <Header />
        <InfoContainer>
          {
            //back to Dashboard button
          }
          <div class="game-back-button-container">
            <button
              class="back-button"
              onClick={() => {
                this.goToDashboard();
              }}
            >
              <img class="game-back-button-image" src={BackButton} />
            </button>
          </div>
          <Info>
            {
              //This is the info block that shows the information about the set that is being learned. check learnPage.css for the css styling. I opted for the external css file
              //because it was easier to style multiple components that way. Check the "class" of a <div> inside the css file for the styling applied to that particular <div>
            }
            <div class="game-info-grid">
              <div class="game-info-block game-info-block-1">
                {!this.state.cardSet || !this.state.user ? (
                  <div>Name</div>
                ) : (
                  <div class="game-name-grid">
                    <div class="game-set-name">{this.state.cardSet.title = "SetTest"}</div>
                
                  </div>
                )}
              </div>
              <div class="game-info-block game-info-block-3">
                <img class="game-likes-image" src={Likes} />
                {!this.state.cardSet ? <div>Name</div> : " " + this.state.cardSet.likes}
              </div>
            </div>
          </Info>
        </InfoContainer>
        <MainContainer>
          { //Top Menu Buttons with dinamic change in appereance by onClick().
            //The dinamic change in color happens through the img src, when the buttons are clicked the states are
            //checked and then changed accordingly. These states are then used to change the behavior of the page.
            <div class="game-area">
              <GameCard
                markedCards={this.state.markedCards}
                flashcard={this.state.currentFlashcard}
              />

              <div class="game-button-container">
                {/* <div class="game-left-button-container"> */}
                  {
                    <button
                    class="game-user-profile"
                    onClick={() => {
                      this.goToPublicProfile();
                    }}
                  >
                    <div class="game-profile-picture">
                      <img
                        class="game-profile-picture-image"
                        src={ProfilePicture}
                      />
                      <img className = "game-online-offline"
                      src={(this.state.user.status == "ONLINE") ? OnlineSign : OfflineSign}/>
                      
                    </div>
                    <div class="game-creator-name">{this.state.foreignUsername}</div>
                  </button>
                    //buttons are used for the size of the "onClick" area. The png of the images are squared, so the buttons need to have the onClick function,
                    //but only the images are seen. Check the learnPage.css for the implementation of the image on the button
                  }
                  <button
                    class="game-left-button"
                    disabled={this.state.leftButtonDisabled}
                    //This function changes the visible card. The currentFlashcard state decides which card is shown. It show the next card by incrementing the id
                    //and also checks if one of the arrow buttons should be disabled because of overflow.
                  
                  >
                    {
                      //the actual image of the button. It references the constant from above in the render function that decides through the LeftArrowState() function if it should
                      //be disabled or not
                    }
                    <img class="game-left-arrow-image" />
                  </button>
                {/* </div> */}
                {
                  //same as above with the left button, but with different edge points.
                }
                <div class="game-right-button-container">
                  <button
                    class="game-right-button"
                    disabled={this.state.rightButtonDisabled}
                
                  >
                    <img class="game-right-arrow-image" />
                  </button>
                </div>
              </div>
            </div>
          }
        </MainContainer>
        <Footer></Footer>
      </div>
    );
  }
}
export default withRouter(Game);
