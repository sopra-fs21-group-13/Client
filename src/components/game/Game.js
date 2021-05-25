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
      user: User,
      cards:[],
      players:[],
      inviter:"",
      player2:"",
      setTitle:"",
      message: null,
      senderId: null,
      timer:10,
      points1: 0,
      points2: 0,
      cardsLength:0
    };
  }


checkAnswerStatus=async(gameId,cb)=>{
  if(this.state.cards.length>0)
      {
        let response = await api.get(`/games/${gameId}`);
        let history=response["data"].history;
        //console.log("-----",this.state.cards[0].cardId);
  
        let players=response["data"].players;
        let points1=history.filter(ele=>ele.senderId==players[0].userId) 
        let points2=history.filter(ele=>ele.senderId==players[1].userId) 
        console.log(points2);
        console.log(points1);

        let total1=points1.reduce((acc,ele)=>ele.score+acc,0)
        let total2=points2.reduce((acc,ele)=>ele.score+acc,0)
        
    

        this.setState({...this.state,points1:total1,points2:total2})
      
        let currentCardHistory=history.filter(ele=>ele.cardId==this.state.cards[0].cardId);
        //debugger;

        //console.log("currentcardHistory", currentCardHistory)

        if(currentCardHistory.length==2)
        {
          this.state.cards.shift();
          this.setState({...this.state,cards:this.state.cards})
         //alert("Times up !!")
        }
        if(history.length==this.state.cardsLength*2)
        {
          this.state.cards.shift();
          this.setState({...this.state,cards:this.state.cards})
          cb(true)
         //alert("Times up !!")
        }
     
      }
      
  }

  submitAnswer=(value,cardId)=>{
    let gameId=this.props.match.params["id"];
    let answered=this.state.cards.find(ele=>ele.cardId===cardId);
    let score=0;

    this.setState({...this.state,message:value});
    this.setState({senderId:this.state.cardId});

  
    let userID=localStorage.getItem("userId")

    if(answered.answer===value && parseInt(userID )=== this.state.players[0].userId){
     //this.state.points1 = this.state.points1 + 10;
     //debugger;
    // this.setState({...this.state,points1:this.state.points1 + 10});
    score+=10;
    
    }

    if(answered.answer===value && parseInt(userID) === this.state.players[1].userId){
      //this.state.points2 = this.state.points2 + 10;
     // this.setState({...this.state,points2:this.state.points2 + 10});
     score+=10;
    }
   
    console.log("answeredAnswer", answered.answer)
    console.log("points1", this.state.points1)
    console.log("points2", this.state.points2)

    // const requestBody = {
    //   "firstPlayerScore":points1,
    //   "secondPlayerScore":points2,
    // };
  
    // api.put('/games/', requestBody).then(result => {console.log("Score",result);}
    // ).catch(e=>{
    //   alert(`Something went wrong while updating the chat: \n${handleError(e)}`);
    // });

    // debugger;
    const requestBody = {
      "senderId":userID,
      "message": value,
      "cardId": cardId,
      "score": score
    };
  
  
    api.put('/games/' + gameId + '/histories', requestBody).then(result => {console.log("RESULT",result);}
    ).catch(e=>{
      alert(`Something went wrong while updating the chat: \n${handleError(e)}`);
    });
    
  }

  componentDidMount(){

  let CallApi=async()=>
    {
      let gameId=this.props.match.params["id"];
      let response = await api.get(`/games/${gameId}`);
      console.log("huuu",response["data"]);
      let history=response["data"].history;
      let players=response["data"].players;
      if(players.length==2)
      {
        let points1=history.filter(ele=>ele.senderId==players[0].userId) 
        let points2=history.filter(ele=>ele.senderId==players[1].userId) 

        let total1=points1.reduce((acc,ele)=>ele.score+acc,0)
        let total2=points2.reduce((acc,ele)=>ele.score+acc,0)
      //let points2=history
      console.log(total1);
      console.log(total2);
     
      this.setState({...this.state,players:response["data"].players,inviter:response["data"].inviter.name,player2:response["data"].players[1].name,points1:total1,points2:total2})
      console.log(this.state.player2);

      let setId=response["data"].playSetId
      let response2 = await api.get(`/sets/${setId}`);

      this.setState({...this.state,cards:response2["data"].cards,cardsLength:response2["data"].cards.length,setTitle:response2["data"].title})
      //console.log(response2["data"]);
      let timerPointer=setInterval(()=>{
        if(this.state.timer>0)
        {
          this.setState({...this.state,timer:this.state.timer-1})
        }
        else{
          this.state.cards.shift();
          if(this.state.cards.length>0)
          {
           alert("Times up ,next card !!")
            this.setState({...this.state,cards:this.state.cards,timer:10})
          }
          else{
            alert("Times up ,next card !!");
            clearInterval(timerPointer);
            this.setState({...this.state,cards:this.state.cards,timer:0})
          }
        }

      },1000)

      setInterval(()=>{
        this.checkAnswerStatus(gameId,(data)=>{
          if(data)
          {
            alert("Game is finished");
            clearInterval(timerPointer);
            this.setState({...this.state,timer:0})
          }
        })
      },1000)
      }
      else{
        this.setState({...this.state,players:response["data"].players,inviter:response["data"].inviter.name})
      }
      
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
                {this.state.setTitle}
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
                <div className="game-creator-name">{this.state.inviter}</div>
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
                <div className="game-creator-name2">{this.state.player2}</div>
                </div>
                {this.state.cards.length>0? 
                <GameCard
                submitAnswer={this.submitAnswer}
                flashcard={this.state.cards[0]}
                />:""}
                <div className="game-scoreboard">
                <img className="game-timer" src={Timer}/>
                <div className="game-time"> {this.state.timer}s </div>
                <div className="game-scoreboard-title">scoreboard</div>
                <div className="game-scoreboard-profile1">
                  <img className="game-profile-picture2a" src={ProfilePicture}></img>
                  <div className="game-creator-name-b">{this.state.inviter}</div>
                  <div className="game-points1">{this.state.points1}</div>
                  <div className="game-rank">#1</div>
                </div>
                <div class="game-scoreboard-profile2">
                    <img class="game-profile-picture2a" src={ProfilePicture}></img>
                    <div class="game-creator-name-b">{this.state.player2}</div>
                    <div class="game-points1">{this.state.points2}</div>
                    <div class="game-rank">#2</div>
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
