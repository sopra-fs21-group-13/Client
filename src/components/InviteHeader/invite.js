import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {api, handleError} from "../../helpers/api";
import '../chat/messages.css';
import {Button} from '../../views/design/Button.js';
import './invite.css'

class Invite extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invitations: null,
        };
    }
    update(){
        // update the invitations
        api.get("/users/" + localStorage.getItem("userId")).then((response) => {
            const data = response.data;
            if(data.invitations.length > 0){
                this.setState({invitations: data.invitations});
            }else{
                this.setState({invitations: null})
            }
            console.log(data.invitations);
        }).catch((e) => {
            alert(`Something went wrong while fetching user: \n${handleError(e)}`);
        });
    };

    componentDidMount() {
       setInterval(this.update(),1000);
    };

    componentWillUnmount(){
        clearInterval();
    }

    async join(currentGameID){
        try{
            // Add player to game
            await api.put("/game/" + currentGameID + "/" + localStorage.getItem("userId"));
            // Redirect to game
            this.props.history.push("/game/" + currentGameID);
        } catch (error) {
            alert('Something went wrong registering the game: \n${handleError(error)}');
        }
    };

    async ignore(currentGameID){
        // Delete game (and invitation)
        await api.delete("/games/"+ currentGameID);
    };

    mapMessages() {
        // map messages to array so they can be displayed
        if (this.state.invitations != null){
            return (
                <div>
                    {this.state.invitations.map((item, index)=>
                        <span>
                            <h3 className="text"> {item.sentFromUserName} </h3>
                            <h4 className="h4"> has invited you to play a game &nbsp;</h4>
                            <Button className="spacing" onClick={this.join(item.gameId)}>Join Game</Button>
                            <Button className="spacing" onClick={this.ignore(item.gameId)}>Ignore</Button>
                            <hr  style={{
                                color: '#70F0A9',
                                backgroundColor: '#70F0A9',
                                height: 2,
                                borderColor : '#70F0A9'
                            }}/>
                        </span>
                    )}
                </div>
            );
        }
        else {
            return(
                <div className="text">You don't have any invitations! </div>
            );
        }
    };

    render() {
        return (
            this.mapMessages()
        );
    }
}

export default withRouter(Invite);