import React, { Component, useState, useEffect, useRef } from 'react';
import {Button} from '../../views/design/Button.js';
import { withRouter, useHistory } from 'react-router-dom';
import {api, handleError} from "../../helpers/api"
import './messages.css'

export default function Messages ({gameId}){
    const [messages, setMessages] = useState("");

    const history = useHistory();

    const chatContainer = useRef(null);

    function scrollToRef() {
        const scroll = chatContainer.current.scrollHeight - chatContainer.current.clientHeight;
        chatContainer.current.scrollTo(0, scroll);
    };


   useEffect(()=>{
    setInterval(() => {
        api.get("/games/" + gameId).then((response)=>{
        const data = response.data;
        setMessages(data.history);
        console.log(messages);
        scrollToRef();
    })},1000);

    return () => {
        clearInterval();
    }
   }, []);

 
    // map messages so they can be displayed
    if (messages == []){
        return (
            <div>
                <h1> Welcome to the game!</h1>
            </div>
        )
    }
    else {
        return(
            <div>
                {messages.map((item, index)=>
                    <div className="textContainer" ref={chatContainer}>
                        <div className="id">{item.senderId} &nbsp;</div>
                        <div className="message">{"hello"} &nbsp;</div>
                        <div className="timestamp"> {item.timeStamp}</div>
                    </div>
                )}
            </div>
        );
    }

}