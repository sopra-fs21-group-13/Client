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
import Vs from "./vs.png";
import Timer from "./timer.png"
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


  render() {

    return (
      <div>
          <Header />
          <div class="game-back-button-container">
            <button
              class="game-back-button"
              onClick={() => {
                this.goToDashboard();
              }}
            >
              <img class="game-back-button-image" src={BackButton} />
            </button>
          </div>
          <div class="game-setname">
                {this.state.cardSet.title = "SetTest"}
                <div class="game-userbox">
                <button class="game-user-profile"
                    onClick={() => {
                      this.goToPublicProfile();
                    }}
                  >
                    <div class="game-profile-picture">
                      <img class="game-profile-picture-image" src={ProfilePicture}/>
                      <img className = "game-online-offline"
                      src={(this.state.user.status == "ONLINE") ? OnlineSign : OfflineSign}/>
                    </div>
                </button> 
                <div class="game-creator-name">{this.state.foreignUsername}</div>

                <img class="game-vs-picture" src={Vs}></img>

                <button class="game-user-profile2"
                    onClick={() => {
                      this.goToPublicProfile();
                    }}
                  >
                    <div class="game-profile-picture">
                      <img class="game-profile-picture-image" src={ProfilePicture}/>
                      <img className = "game-online-offline"
                      src={(this.state.user.status == "ONLINE") ? OnlineSign : OfflineSign}/>
                    </div>
                </button> 
                <div class="game-creator-name2">{this.state.foreignUsername}</div>
                </div>
                <GameCard
                markedCards={this.state.markedCards}
                flashcard={this.state.currentFlashcard}
                />
                <div class="game-scoreboard">
                <img class="game-timer" src={Timer}/>
                <div class="game-time"> 43s </div>
                <div class="game-scoreboard-title">scoreboard</div>
                <div class="game-scoreboard-profile1">
                    <img class="game-profile-picture2a" src={ProfilePicture}></img>
                    <div class="game-creator-name-b">{this.state.foreignUsername}</div>
                    <div class="game-points1">Points: 200</div>
                    <div class="game-rank">#1</div>
                </div>
                <div class="game-scoreboard-profile2">
                    <img class="game-profile-picture2a" src={ProfilePicture}></img>
                    <div class="game-creator-name-b">{this.state.foreignUsername}</div>
                    <div class="game-points1">Points: 450</div>
                    <div class="game-rank">#2</div>
                </div>
                </div>
                <div class="game-guesses"></div>
                <div class="game-guesses-title">Past Guesses</div>
          </div> 
      </div>
    );
  }
}
export default withRouter(Game);
