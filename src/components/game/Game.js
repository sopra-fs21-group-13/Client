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
import QuitGame from "./QuitGame.png";
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
      timer:30,
      points1: 0,
      points2: 0,
      cardsLength:0,
      Rang1: "",
      Rang2: "",
      refresh:null,
      photo1:17,
      photo2:17,
      userPicturesDict:{1: char1, 2: char2, 3: char3, 4: char4, 5: char5, 6: char6,
        7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16, 17: ProfilePicture}
    };
  }

goToDashboard() {
    this.props.history.push(`/Dashboard`)
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
        console.log(points1);
        console.log(points2);

        let total1=points1.reduce((acc,ele)=>ele.score+acc,0)
        let total2=points2.reduce((acc,ele)=>ele.score+acc,0)
        
        this.setState({...this.state,points1:total1,points2:total2})

        if(total1 > total2)
        {
          this.setState({...this.state,Rang1:"#1",Rang2:"#2"})
        }
     
        if(total1 < total2)
        {
          this.setState({...this.state,Rang1:"#2",Rang2:"#1"})
        }
      
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
    // debugger;

    this.setState({...this.state,message:value});
    this.setState({senderId:this.state.cardId});

    let userID=localStorage.getItem("userId")

    if(answered.answer===value && parseInt(userID ) === this.state.players[0].userId){
      score+=10;
    //this.state.points1 = this.state.points1 + 10;
     //debugger;
    // this.setState({...this.state,points1:this.state.points1 + 10});
    }

    if(answered.answer===value && parseInt(userID) === this.state.players[1].userId){
      score+=10;
      //this.state.points2 = this.state.points2 + 10;
     // this.setState({...this.state,points2:this.state.points2 + 10});
    }

    console.log("answeredAnswer", answered.answer)
    console.log("points1", this.state.points1)
    console.log("points2", this.state.points2)

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

        if(response["data"].players[0].photo!==null){
          this.setState({...this.state,photo1:response["data"].players[0].photo});
        }

        if(response["data"].players[1].photo!==null){
          this.setState({...this.state,photo2:response["data"].players[1].photo});
        }
        console.log("photo2",this.state.photo2);
      
        this.setState({...this.state,timer:response["data"].timer,players:response["data"].players,inviter:response["data"].inviter.name,player2:response["data"].players[1].name,points1:total1,points2:total2})
        console.log(this.state.player2);

        let setId=response["data"].playSetId
        let response2 = await api.get(`/sets/${setId}`);

        this.setState({...this.state,cards:response2["data"].cards,cardsLength:response2["data"].cards.length,setTitle:response2["data"].title})
       let timerPointer= setInterval(()=>{
         let requestBody={timer:this.state.timer-1,gameId:gameId}
        api.put('/games', requestBody).then(result => {console.log("RESULT");

        

        if(this.state.timer>0)
        {
          this.setState({...this.state,timer:result["data"].timer})
        }
        else{
          this.state.cards.shift();
          if(this.state.cards.length>0)
          {
          
           let requestBody={timer:30,gameId:gameId}

           api.put('/games', requestBody).then(result =>{
            alert("Times up ,next card !!")
            this.setState({...this.state,cards:this.state.cards,timer:result["data"].timer})
            //this.setState({...this.state,cards:this.state.cards,timer:100})
           })
          }
          else{
            alert("Times up ,next card !!");
            clearInterval(timerPointer);
            this.setState({...this.state,cards:this.state.cards,timer:0})
          }
        }
      }
    ).catch(e=>{
      console.log(e);
     // alert(`Something went wrong while updating the chat: \n${handleError(e)}`);
    });
       },10000)

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
        setTimeout(()=>{
        // this.setState({...this.state,refresh:true});
        window.location.reload()
        },500000)
        if(response["data"].players[0].photo!==null){
          this.setState({...this.state,photo1:response["data"].players[0].photo})
        }
        this.setState({...this.state,players:response["data"].players,inviter:response["data"].inviter.name})
      }
      
    }  

  CallApi();
}


//console.log(response2["data"]);
        /*
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
            this.setState({...this.state,cards:this.state.cards,timer:100})
          }
          else{
            alert("Times up ,next card !!");
            clearInterval(timerPointer);
            this.setState({...this.state,cards:this.state.cards,timer:0})
          }
        }

      },1000)
      */

  render() {

    return (
      <div>
          <Header />
            <div class="game-quitGame-container"> {/**added */}
              <button
                class="game-quitGame-button"
                onClick={() => {
                  this.goToDashboard();
                }}
              >
                <img class="game-quitGame-image" src={QuitGame} />
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
                      <img className="game-profile-picture-image"
                           src={this.state.userPicturesDict[this.state.photo1]} 
                      />
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
                      <img className="game-profile-picture-image" 
                           src={this.state.userPicturesDict[this.state.photo2]} 
                      />
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
                  <script className="game-rank">{this.state.Rang1}</script>
                </div>
                  <div className="game-scoreboard-profile2">
                      <img className="game-profile-picture2a" src={ProfilePicture}></img>
                      <div className="game-creator-name-b">{this.state.player2}</div>
                      <div className="game-points1">{this.state.points2}</div>
                      <script className="game-rank">{this.state.Rang2}</script>
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
