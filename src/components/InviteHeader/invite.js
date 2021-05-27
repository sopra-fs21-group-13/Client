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
    async update(){
        // update the invitations every second
        const response = await api.get("/users/" + localStorage.getItem("userId"));
        const data = await response.json();
        this.setState({invitations: data.invitations});
        console.log(data);
        this.scrollToRef();
    };

    scrollToRef() {
        const scroll = this.chatContainer.current.scrollHeight - this.chatContainer.current.clientHeight;
        this.chatContainer.current.scrollTo(0, scroll);
    };

    componentDidMount() {
       setInterval(this.update(),1000);
    };

    componentWillUnmount(){
        clearInterval(this.invitations);
    }

    async join(currentGameID){
        try{
            // Add player to game
            api.put("/game/" + currentGameID + "/" + localStorage.getItem("userId"));
            // Redirect to game
            this.props.history.push('/game');
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
        if (this.state.testInvitations != null){
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