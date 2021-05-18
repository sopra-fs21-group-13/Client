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
import { CallToActionSharp } from "@material-ui/icons";

class Game extends React.Component {
  constructor(props) {
    super(props);
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
      user: User,
      cards:[],
      players:[]
    };
  }

  componentDidMount(){
    let CallApi=async()=>
{
  let gameId=this.props.match.params["id"];
  let response=await api.get(`/games/${gameId}`);
  console.log(response["data"].players);
  this.setState({...this.state,players:response["data"].players})
  let setId=response["data"].playSetId
  let response2=await api.get(`/sets/${setId}`);

  this.setState({...this.state,cards:response2["data"].cards})

}    
CallApi();
  
}


  render() {

    return (
      <div>
          <Header />
          <div className="game-back-button-container">
            <button
              className="game-back-button"
              onClick={() => {
                this.goToDashboard();
              }}
            >
              <img className="game-back-button-image" src={BackButton} />
            </button>
          </div>
          <div className="game-setname">
                {this.state.cardSet.title = "SetTest"}
                <div className="game-userbox">
                <button className="game-user-profile"
                    onClick={() => {
                      this.goToPublicProfile();
                    }}
                  >
                    <div className="game-profile-picture">
                      <img className="game-profile-picture-image" src={ProfilePicture}/>
                      <img className = "game-online-offline"
                      src={(this.state.user.status == "ONLINE") ? OnlineSign : OfflineSign}/>
                    </div>
                </button> 
                <div className="game-creator-name">{this.state.foreignUsername}</div>

                <img className="game-vs-picture" src={Vs}></img>

                <button className="game-user-profile2"
                    onClick={() => {
                      this.goToPublicProfile();
                    }}
                  >
                    <div className="game-profile-picture">
                      <img className="game-profile-picture-image" src={ProfilePicture}/>
                      <img className = "game-online-offline"
                      src={(this.state.user.status == "ONLINE") ? OnlineSign : OfflineSign}/>
                    </div>
                </button> 
                <div className="game-creator-name2">{this.state.foreignUsername}</div>
                </div>
                {this.state.cards.length>0? <GameCard
                
                flashcard={this.state.cards[0]}
                />:""}
               
                <div className="game-scoreboard">
                <img className="game-timer" src={Timer}/>
                <div className="game-time"> 43s </div>
                <div className="game-scoreboard-title">scoreboard</div>
                <div className="game-scoreboard-profile1">
                    <img className="game-profile-picture2a" src={ProfilePicture}></img>
                    <div className="game-creator-name-b">{this.state.foreignUsername}</div>
                    <div className="game-points1">Points: 200</div>
                    <div className="game-rank">#1</div>
                </div>
                <div className="game-scoreboard-profile2">
                    <img className="game-profile-picture2a" src={ProfilePicture}></img>
                    <div className="game-creator-name-b">{this.state.foreignUsername}</div>
                    <div className="game-points1">Points: 450</div>
                    <div className="game-rank">#2</div>
                </div>
                </div>
                <div className="game-guesses"></div>
                <div className="game-guesses-title">Past Guesses</div>
          </div> 
      </div>
    );
  }
}
export default withRouter(Game);
