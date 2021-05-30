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
import "./game.css";
import Chat from "../chat/chat.js";
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

class GameNew extends React.Component{

    constructor(props) {
        super(props);
        this.handler = (ev) => {  
          ev.preventDefault();
          return ev.returnValue = 'Are you sure you want to close? Data might get lost in the process!';
      };
        this.state = {
            cards:[],
            players:[],
            gameId: null,
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
            7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16, 17: ProfilePicture},
            timerPlayer:null,
            timerInterval: null,
            timerUploadInterval: null,
            timerDownloadInterval: null,
            gameStartCheckInterval: null,
            showStartButton: false,
            gameStarted: false,
            readyCheck: false,
        };
      }

      componentDidMount(){
        //get setId
        let gameId=this.props.match.params["id"];
        localStorage.setItem('gameId', gameId);
        //fetch game
        api.get(`/games/${gameId}`).then((response)=>{

            let gameCheck = setInterval(()=>{
                if(this.state.players.length==2){
                    this.setState({showStartButton:true});
                    clearInterval(this.state.gameStartCheckInterval);
                }
            }, 1000);

            //after the game was fetched
            let gameData = response.data
            console.log(gameData);
            let history=gameData.history;
            let players=gameData.players;

            //set the state variables from the game data
            this.setState({players: gameData.players, timer: gameData.timer, gameStartCheckInterval: gameCheck, gameId: gameId});

            //checks if this player is the one that gives the timer data to backend.
            if(gameData.players[0].userId == localStorage.getItem("userId")){
                this.setState({timerPlayer: true});
            }else{
                this.setState({timerPlayer: false});
            }
            let setId=response.data.playSetId
            //get the set that is played with
            api.get(`/sets/${setId}`).then((response2)=>{
                this.setState({cards:response2.data.cards})

            }).catch((e) => {
                alert(`Something went wrong while fetching set: \n${handleError(e)}`);
            });


            /*if(players.length==2)
                {
                    //set points
                    let points1=history.filter(ele=>ele.senderId==players[0].userId) 
                    let points2=history.filter(ele=>ele.senderId==players[1].userId) 

                    let total1=points1.reduce((acc,ele)=>ele.score+acc,0)
                    let total2=points2.reduce((acc,ele)=>ele.score+acc,0)
                    //let points2=history
                    console.log(total1);
                    console.log(total2);

                    //set photos
                    if(response["data"].players[0].photo!==null){
                    this.setState({photo1:response["data"].players[0].photo});
                    }

                    if(response["data"].players[1].photo!==null){
                    this.setState({photo2:response["data"].players[1].photo});
                    }
                    console.log("photo2",this.state.photo2);
                
                    this.setState({timer:response["data"].timer,players:response["data"].players,inviter:response["data"].inviter.name,player2:response["data"].players[1].name,points1:total1,points2:total2})
                    console.log(this.state.player2);

                    let setId=response["data"].playSetId
                    api.get(`/sets/${setId}`).then((response2)=>{
                        this.setState({cards:response2["data"].cards,cardsLength:response2["data"].cards.length,setTitle:response2["data"].title})
                        let timerPointer= setInterval(()=>{
                        let requestBody={timer:this.state.timer-1,gameId:gameId}
                        api.put('/games', requestBody).then(result => {
                            console.log("RESULT");
                            if(this.state.timer>0)
                            {
                            this.setState({timer:result["data"].timer})
                            }
                            else{
                            this.state.cards.shift();
                            if(this.state.cards.length>0)
                            {
                            
                            let requestBody={timer:30,gameId:gameId}

                            api.put('/games', requestBody).then(result =>{
                                alert("Times up ,next card !!")
                                this.setState({cards:this.state.cards,timer:result["data"].timer})
                                //this.setState({...this.state,cards:this.state.cards,timer:100})
                            })
                            }
                            else{
                                //alert("Times up ,next card !!");
                                clearInterval(timerPointer);
                                this.setState({cards:this.state.cards,timer:0})
                            }
                            }
                        }).catch(e=>{
                        console.log(e);
                        // alert(`Something went wrong while updating the chat: \n${handleError(e)}`);
                        });
                        },5000)

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
                    }).catch((e) => {
                        alert(`Something went wrong while fetching set: \n${handleError(e)}`);
                    });

            }
            else{
                setTimeout(()=>{
                // this.setState({...this.state,refresh:true});
                window.location.reload()
                },5000)
                if(response["data"].players[0].photo!==null){
                this.setState({...this.state,photo1:response["data"].players[0].photo})
                }
                this.setState({...this.state,players:response["data"].players,inviter:response["data"].inviter.name})
            }*/

        }).catch((e) => {
            alert(`Something went wrong while fetching user: \n${handleError(e)}`);
        });
      }

      componentWillUnmount(){
        // use interval from the state to clear the interval
        if(this.state.interval != null){
            clearInterval(this.state.timerInterval);
        }
        if(this.state.timerDownloadInterval != null){
            clearInterval(this.state.timerDownloadInterval);
        }
        if(this.state.timerUploadInterval != null){
            clearInterval(this.state.timerUploadInterval);
        }
      }

      startGame(){
          console.log("game started");
        //create timer interval
        var interval = setInterval(() => {
            let newTimer = this.state.timer-1;
            if(newTimer>=0){
            this.setState({timer: newTimer});}
            else{
                //clear intervals so timers dont decrease anymore and aren't uploaded / downloaded
                clearInterval(this.state.timerInterval);
                clearInterval(this.state.timerUploadInterval);
                clearInterval(this.state.downloadInterval);
                
                this.setState({timerInterval: null});
                //TODO: go to next card and restart timer at 30. ( IDEA restart timer at 5, then show points + answer and after 5 restart at 30 with next card.)
            }
            
        }, 1000);

        //create timerUpload / timerDownload interval. person with timerUpload, uploads the timer to backend, the download player fetches the timer to sync his timer.
        if(this.state.timerPlayer){
            var uploadInterval = setInterval(() => {
                //update timer in backend
                let requestBody={timer:this.state.timer,gameId:this.state.gameId}
                api.put('/games', requestBody).then((result) => {
                    console.log('uploaded timer');
                })
                console.log(this.state.timerPlayer);
        }, 1000);}
        else{
            var downloadInterval = setInterval(()=>{
                api.get(`/games/${this.state.gameId}`).then((response)=>{
                    this.setState({timer: response.data.timer});
                }).catch((e) => {
                    alert(`Something went wrong while fetching user: \n${handleError(e)}`);
                });
            }, 5000)
        }

        //store intervals in state so they can be deleted on unmount
        this.setState({timerInterval: interval})
      }

      //submits that the player is ready to start.
      submitReady(){
        let gameId=this.state.gameId;

        let requestBody = null;
        //check if player1 or player2.
        if(this.state.timerPlayer){
        requestBody = {
            "gameId": gameId,
            "player1Ready": true, 
            };
        }else{
        requestBody = {
            "gameId": gameId,
            "player2Ready": true, 
            };
        }
        api.put(`/games`).then(result => {console.log("RESULT",result);}
        ).catch(e=>{
        alert(`Something went wrong while making yourself ready: \n${handleError(e)}`);
        });
      }

      submitAnswer(){

      }

      render() {

        const buttonOrField = this.state.showStartButton ? ("startGameButton") : ("otherPlayerNotReadyField");

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
                    <button className="game-user-profile">
                        <div className="game-profile-picture">
                          <img className="game-profile-picture-image"
                               src={this.state.userPicturesDict[this.state.photo1]} 
                          />
                        </div>
                    </button> 
                    <div className="game-creator-name">{this.state.inviter}</div>
                    <img className="game-vs-picture" src={Vs}></img>
                    <button className="game-user-profile2">
                        <div className="game-profile-picture">
                          <img className="game-profile-picture-image" 
                               src={this.state.userPicturesDict[this.state.photo2]} 
                          />
                        </div>
                    </button> 
                    <div className="game-creator-name2">{this.state.player2}</div>
                    </div>
                    {!this.state.gameStarted || this.state.cards.length <= 0 ?
                    (<button className = {buttonOrField}
                    onClick = {() => {
                        this.startGame();
                        if(this.state.showStartButton == true){
                        this.setState({showStartButton:false});
                        this.submitReady();
                        let readyCheck = setInterval(()=>{
                            api.get(`/games/${this.state.gameId}`).then(result => {
                                let opponentReady = false;
                                if(this.state.timerPlayer){
                                    opponentReady=result.data.player2Ready}
                                else{
                                    opponentReady=result.data.player1Ready
                                }
                                if(opponentReady == true){
                                    this.startGame();
                                    this.setState({gameStarted:true});
                                    clearInterval(this.state.readyCheck);
                                }
                            }
                            ).catch(e=>{
                            alert(`Something went wrong while updating the chat: \n${handleError(e)}`);
                            });
                        },1000)
                        this.setState({readyCheck: readyCheck})
                    }
                    }}>
                       ready
                    </button>
                        ):(
                    <GameCard
                    submitAnswer={this.submitAnswer}
                    flashcard={this.state.cards[0]}
                    />)}
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
                    {/* <div className="game-chat">
                      <Chat
                      />
                    </div> */}
              </div> 
          </div>
        );
      }

}
export default withRouter(GameNew);