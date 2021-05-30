import React, { useState } from "react";
import './results.css'
import { Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Header from "../header/header.js";
import { api, handleError } from "../../helpers/api";


class Results extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            results:null,
            gameId:null,
            timerPlayer:null,
            players: null,
            points1: null,
            points2: null,
      }
    };

    componentDidMount(){

        //get setId
        let gameId=this.props.match.params["id"];
        localStorage.setItem('gameId', gameId);

        api.get(`/games/${gameId}`).then((response)=>{
            //after the game was fetched
            let gameData = response.data
            let players=gameData.players;

            //set the state variables from the game data
            this.setState({players: players,  gameId: gameId, points1: gameData.points1, points2: gameData.points2});

            //checks if this player is the one that gives the timer data to backend.
            if(gameData.players[0].userId == localStorage.getItem("userId")){
                this.setState({timerPlayer: true});
            }else{
                this.setState({timerPlayer: false});
            }

        }).catch((e) => {
            alert(`Something went wrong while fetching game. Maybe the host left the game?: \n${handleError(e)}`);
            this.props.history.push("/dashboard");
        });
    }

    //reroutes to dashboard and removes player or entire game
    goToDashboard(){
        let gameId=this.state.gameId;
        let userId = 0;
        if(this.state.timerPlayer){
            userId = this.state.players[0].userId;
        }else{
            userId = this.state.players[1].userId;
        }

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

    render(){
        return(
            <div>
                <Header/>
                <div>
                    {"You WON"}
                </div>
                <button
                onClick={()=>{
                    this.goToDashboard();
                }}>
                    go back to dashboard
                </button>
            </div>)

        }
    

}

export default withRouter(Results);