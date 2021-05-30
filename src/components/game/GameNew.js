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
            showStartButton: true,
            gameStarted: false,
            readyCheck: null,
            currentCard: null,
            showAnswerTransition: false,
            lastPointsAdded:0,
            backupTimer: 0,
            currentStatus: "GUESSING",
            nextStatus: "GUESSING",
            statusDownloadInterval:null,
            previousAnswer:null,
            buttonDisabled: false,
        };
      }

      componentDidMount(){
        //adds listener for closing window or tab
        window.addEventListener("beforeunload", this.handler)

        //get setId
        let gameId=this.props.match.params["id"];
        localStorage.setItem('gameId', gameId);
        //fetch game
        api.get(`/games/${gameId}`).then((response)=>{
            //after the game was fetched
            let gameData = response.data
            let history=gameData.history;
            let players=gameData.players;

            //set the state variables from the game data
            this.setState({players: players, timer: gameData.timer,  gameId: gameId});

            //checks if this player is the one that gives the timer data to backend.
            if(gameData.players[0].userId == localStorage.getItem("userId")){
                this.setState({timerPlayer: true});
            }else{
                this.setState({timerPlayer: false});
            }
            let setId=response.data.playSetId
            //get the set that is played with
            api.get(`/sets/${setId}`).then((response2)=>{
                this.setState({cards:response2.data.cards});
                this.setState({currentCard: response2.data.cards[0]});

            }).catch((e) => {
                alert(`Something went wrong while fetching set: \n${handleError(e)}`);
            });

        }).catch((e) => {
            alert(`Something went wrong while fetching game. Maybe the host left the game?: \n${handleError(e)}`);
            this.props.history.push("/dashboard");
        });
      }

      componentWillUnmount(){
        // use intervals from the state to clear the intervals
        clearInterval(this.state.timerInterval);
        clearInterval(this.state.timerUploadInterval);
        clearInterval(this.state.readyCheck);
        clearInterval(this.state.statusDownloadInterval);
        window.removeEventListener("beforeunload", this.handler)
      }



      //reroutes to dashboard and removes player or entire game
      goToDashboard(){
        let gameId = this.state.gameId;
        let userId = 0;
        if(this.state.timerPlayer){
            userId = this.state.players[0].userId;
        }else{
            userId = this.state.players[1].userId;
        }

        //clear intervals
        clearInterval(this.state.timerInterval);
        clearInterval(this.state.timerUploadInterval);
        clearInterval(this.state.readyCheck);
        clearInterval(this.state.statusDownloadInterval);

        //check if other player left already and behave accordingly
        api.get("/games/" + gameId).then((response)=>{
            
            if(response.data.players.length < 2){
                api.delete(`/games/${gameId}`).then((result)=>{
                    console.log("closed game");
                    this.props.history.push("/dashboard");
                    
                }).catch((e) => {
                    alert(`Something went wrong while removing game: \n${handleError(e)}`);
                });
            }else{
                api.put("/games/" + gameId + "/" + userId + "/remover").then((result)=>{
                    console.log("removed player from game");
                    this.props.history.push("/dashboard");
                }).catch(e=>{
                    alert(`Something went wrong while leaving the game. Maybe the host left the game?: \n${handleError(e)}`);
                    this.props.history.push("/dashboard");
                    });
            }
        }).catch((e) => {
            alert(`Something went wrong while leaving the game. Maybe the host left the game?: \n${handleError(e)}`);
            this.props.history.push("/dashboard");
        });

        
      }

      //starts the game
      startGame(){
        if(this.state.timerPlayer){
            if(this.state.timerPlayer){
                this.setState({currentStatus: "GUESSING"});
            }
        }

        console.log("game started");
        //create timer interval
        this.setTimer(30);
        this.createUploadAndDownloadTimer();
      }

      nextCard(){
        if(this.state.timerPlayer){
            this.setState({currentStatus: "GUESSING"});
        }
        this.submitReady(false);
        //create timer
        this.setTimer(30);

        //show card again and not the answer screen.
        this.setState({showAnswerTransition:false, buttonDisabled: false});

        console.log("timer downlo from next card")
        //create timerUpload / timerDownload interval. person with timerUpload, uploads the timer to backend, the download player fetches the timer to sync his timer.
        this.createUploadAndDownloadTimer();
        this.updateOpponentScore();
      }

      showAnswer(){
        this.updateOpponentScore();

        if(this.state.timerPlayer){
            this.setState({currentStatus: "ANSWER"});
        }

        if(this.state.cards.indexOf(this.state.currentCard) != this.state.cards.length-1){
            this.submitReady(false);
            this.setTimer(8);

            //create timerUpload interval. person with timerUpload, uploads the timer to backend, the download player fetches the timer to sync his timer.
            this.createUploadAndDownloadTimer();

            this.setState({previousAnswer: this.state.currentCard.answer});
            let index = this.state.cards.indexOf(this.state.currentCard) + 1;
            this.setState({showAnswerTransition:true, currentCard: this.state.cards[index]});
        }else{
            //update status in backend
            let requestBody={gameId:this.state.gameId, status: "CLOSED"}
            api.put('/games', requestBody).then((result) => {
                console.log('uploaded status');
            }).catch((e) => {
                alert(`Something went wrong during status upload interval. Maybe the host left the game?: \n${handleError(e)}`);
                this.props.history.push("/dashboard");
            });

            //end of game
            this.endGame();
        }
        
      }

      //name is depricated, before there was a download functionality, but this was taken out.
      createUploadAndDownloadTimer(){
        clearInterval(this.state.statusDownloadInterval);
        //create timerUpload interval. person with timerUpload, uploads the timer to backend, the download player fetches the timer to sync his timer.
        if(this.state.timerPlayer){
            let uploadInterval = setInterval(() => {
                //update status in backend
                let requestBody={gameId:this.state.gameId, status: this.state.currentStatus}
                api.put('/games', requestBody).then((result) => {
                    console.log('uploaded status');
                }).catch((e) => {
                    alert(`Something went wrong during status upload interval. Maybe the host left the game?: \n${handleError(e)}`);
                    this.props.history.push("/dashboard");
                });
            }, 1000);
            //save the interval so it can be cleared later
            this.setState({timerUploadInterval: uploadInterval});}
      }

      createStatusCheck(){
        console.log("created status check")
        var statusDownloadInterval = setInterval(()=>{
            api.get(`/games/${this.state.gameId}`).then((response)=>{
                //get status
                if(this.state.currentStatus != response.data.status){
                    console.log("status isn't the same anymore change view!")
                    if(response.data.status == "GUESSING"){
                        this.setState({currentStatus: response.data.status, nextStatus: "ANSWER"});
                        this.nextCard();
                    }
                    else if(response.data.status == "ANSWER"){
                        this.setState({currentStatus: response.data.status, nextStatus: "GUESSING"});
                        this.showAnswer();
                    }else if(response.data.status == "CLOSED"){
                        this.endGame();
                    }
                }

            }).catch((e) => {
                alert(`Something went wrong during status download Interval. Maybe the host left the game?: \n${handleError(e)}`);
                this.props.history.push("/dashboard");
            });
        }, 500);
        
        this.setState({statusDownloadInterval: statusDownloadInterval})
      }

      

      //ends the game once all cards were played.
      endGame(){
        let results = ""
        let player = 1;
        if(this.state.timerPlayer){
            if(this.state.points2 > this.state.points1){
                results = "the game has ended. You lost. You will be redirected to Dashboard now.";
            }else{
                results = "the game has ended. Congratulations! You won. You will be redirected to Dashboard now."; 
            }
        }else{
            player = 2;
            if(this.state.points2 > this.state.points1){
                results = "the game has ended. Congratulations! You won. You will be redirected to Dashboard now."; 
            }else{
                results = "the game has ended. You lost. You will be redirected to Dashboard now.";
            }
        }

        //clear intervals
        clearInterval(this.state.timerInterval);
        clearInterval(this.state.timerUploadInterval);
        clearInterval(this.state.readyCheck);
        clearInterval(this.state.statusDownloadInterval);

        this.props.history.push("/results/" + this.state.gameId);
    }

      //sets a timer in backend and an interval in frontend to count it down.
      setTimer(time){
          //clear readyCheck so that the timer has time to adjust.
           clearInterval(this.state.readyCheck);
           //reset timer in frontend
           this.setState({timer: time});
          //update timer in backend
          let requestBody={timer:time,gameId:this.state.gameId}
          api.put('/games', requestBody).then((result) => {
               
              //let timer count down
                var interval = setInterval(() => {
                let newTimer = this.state.timer-1;
                if(newTimer>=0){
                this.setState({timer: newTimer});}
                else{
                    //clear intervals so timers dont decrease anymore and aren't uploaded / downloaded
                    clearInterval(this.state.timerInterval);
                    clearInterval(this.state.timerUploadInterval);
                    //check status
                    if(this.state.timerPlayer == false){this.createStatusCheck();}
                    //timer is 0 so player is ready again for next round.
                    this.submitReady(true);
                    //wait until opponent ready as well.
                    if(this.state.timerPlayer){
                        this.checkIfOpponentReady();
                    }
                }
                
            }, 1000);
            this.setState({timerInterval: interval});
          }).catch(e=>{
            alert(`Something went wrong while setting timer. Maybe the host left the game?: \n${handleError(e)}`);
            this.props.history.push("/dashboard");
            });

          
      }

      updateOpponentScore(){
            //fetch score of other player and update the visible score.
            api.get(`/games/${this.state.gameId}`).then((response)=>{
                let opponentScore = 0;
                if(this.state.timerPlayer){
                    opponentScore = response.data.player2Score;
                    this.setState({points2: opponentScore})}
                else{
                    opponentScore = response.data.player1Score; 
                    this.setState({points1: opponentScore});}
                
            }).catch(e=>{
                alert(`Something went wrong while setting timer. Maybe the host left the game?: \n${handleError(e)}`);
                this.props.history.push("/dashboard");
            });
      }

      //submits that the player is ready to start.
      submitReady(ready){

        if(ready){
            console.log("ready");
        }else{
            console.log("not ready");
        }

        let gameId=this.state.gameId;

        let requestBody = null;
        //check if player1 or player2.
        if(this.state.timerPlayer){
        requestBody = {
            "gameId": gameId,
            "player1Ready": ready, 
            };
        }else{
        requestBody = {
            "gameId": gameId,
            "player2Ready": ready, 
            };
        }
        api.put(`/games`, requestBody).then(result => {}
        ).catch(e=>{
        alert(`Something went wrong while making yourself ready. Maybe the host left the game?: \n${handleError(e)}`);
        this.props.history.push("/dashboard");
        });
      }


      //check if oponent is ready for next card (or to start the game after pressing ready button in the beginning)
      checkIfOpponentReady(){
        let readyCheck = setInterval(()=>{
            api.get(`/games/${this.state.gameId}`).then(result => {
                let opponentReady = false;
                if(this.state.timerPlayer){
                    opponentReady=result.data.player2Ready}
                else{
                    opponentReady=result.data.player1Ready
                }
                if(opponentReady == true){
                    clearInterval(this.state.backupTimerInterval);
                    clearInterval(this.state.timerUploadInterval);
                    //unready yourself so that the next check can go through successfully with both players unready, then ready once answered or timer = 0.
                    //setTimeout important for server delay.
                    //if game started
                    if(this.state.gameStarted){
                        //toggle between showing answer screen & card currently in play
                        if(this.state.showAnswerTransition){
                            this.setState({showAnswerTransition: false});
                            //after showing answer and timer went from 5 to 0, next card starts
                            this.nextCard();
                        }else{
                            this.setState({showAnswerTransition: true});
                            //after card was played, show answer screen.
                            this.showAnswer();
                        }
                    }
                    else{
                        //or start game if not started yet
                        this.startGame(); this.setState({gameStarted:true});
                    }

                    //clear the interval so it doesn't check anymore
                    clearInterval(this.state.readyCheck);

                    setTimeout(()=> {this.submitReady(false);}, 1000) ;
                }
            }
            ).catch(e=>{
            alert(`Something went wrong while updating the chat. Maybe the host left the game?: \n${handleError(e)}`);
            this.props.history.push("/dashboard");
            });
        }, 1000)
        this.setState({readyCheck:readyCheck});
      }

      checkIfHostReady(){
        let readyCheck = setInterval(()=>{
            api.get(`/games/${this.state.gameId}`).then(result => {
                let opponentReady=result.data.player1Ready
                
                if(opponentReady == true){

                    //start game
                    this.startGame(); this.setState({gameStarted:true});
                    
                    //clear the interval so it doesn't check anymore
                    clearInterval(this.state.readyCheck);

                    setTimeout(()=> {this.submitReady(false);}, 1000) ;
                }
            }
            ).catch(e=>{
            alert(`Something went wrong while checking for readiness to start game. Maybe the host left the game?: \n${handleError(e)}`);
            this.props.history.push("/dashboard");
            });
        }, 1000)
        this.setState({readyCheck:readyCheck});
      }

      calculateAndUploadOwnScore(){
        //score is basically old score + timer value. The faster you answer, the more points you get (max. 30);
        let score = 0;
        let requestBody = null;
        let gameId=this.state.gameId;
        let points=this.state.timer;
        //checks if this player is player1 or player2 to update score correctly
        if(this.state.timerPlayer){
            score = this.state.points1 + points;
            this.setState({points1: score, lastPointsAdded: points});
            requestBody = {
                "gameId": gameId,
                "player1Score": score, 
                };
        }else{
            score = this.state.points2 + points;
            this.setState({points2: score, lastPointsAdded: points});
            requestBody = {
                "gameId": gameId,
                "player2Score": score, 
                };
        }
        //update score of this player in backend.
        api.put(`/games`, requestBody).then(result => {
            console.log("updated points")
            this.setState({buttonDisabled: true});

            //check status
            if(this.state.timerPlayer == false){this.createStatusCheck();}
    
            this.submitReady(true);
            
            if(this.state.timerPlayer){
                this.checkIfOpponentReady();
            }
        }
        ).catch(e=>{
            alert(`Something went wrong while updating scores. Maybe the host left the game?: \n${handleError(e)}`);
            this.props.history.push("/dashboard");
            });
        
      }

      submitReadyAndCheckOpponent =()=>{
          
        //clear intervals so timers dont decrease anymore and aren't uploaded / downloaded
        clearInterval(this.state.timerInterval);
        clearInterval(this.state.timerUploadInterval);

        //calculate score and push it to backend so other player can see it
        this.calculateAndUploadOwnScore();
        
      }

      render() {

        const buttonOrField = this.state.showStartButton ? ("startGameButton") : ("otherPlayerNotReadyField");

        return (
          <div>
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
                        if(this.state.showStartButton == true){
                        this.setState({showStartButton:false});
                        this.submitReady(true);
                        if(this.state.timerPlayer){
                            this.checkIfOpponentReady();
                        }else{
                            this.checkIfHostReady();
                        }
                        
                    }
                    }}>
                       ready
                    </button>
                        ):(
                    <GameCard
                    showAnswerTransition = {this.state.showAnswerTransition}
                    calculateAndUploadOwnScore={this.calculateAndUploadOwnScore}
                    submitReadyAndCheckOponent={this.submitReadyAndCheckOpponent}
                    flashcard={this.state.currentCard}
                    points={this.state.lastPointsAdded}
                    previousAnswer={this.state.previousAnswer}
                    buttonDisabled={this.state.buttonDisabled}
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