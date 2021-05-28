import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import "./header.css";
import SearchBox from "./searchBox/SearchBox"
import flashy_h_white from '../shared/images/flashy_h-white.svg';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { api, handleError } from "../../helpers/api";
import Invite from "../InviteHeader/invite.js";
import Popup from "../InviteHeader/Popup.js";
import InboxRoundedIcon from '@material-ui/icons/InboxRounded';



function Header({buttonBehavior, setMainModalLogin, keyword, setKeyword,...props}){

    const [buttonPopup, setButtonPopup] = useState(false);
    //logout user in backend and reroute to main page.
    function logout(){
        
        api.put("/users/logout/" + localStorage.getItem("userId")).then(result=>{
            
            //after logout
            console.log("user "+localStorage.getItem("userId") + " logged out!");
            localStorage.clear();
            props.history.push("/main");

        }).catch(e=>{
            alert(`Something went wrong while logging out user: \n${handleError(e)}`);
        });

    }

    function goToDashboard(){
        props.history.push("dashboard");
    }

    function goToMain(){
        props.history.push("main");
    }

    if(localStorage.getItem('token') == null){
    return(
        <div>
            <div className = "headerComponent">
                <div className = "outerContainer">
                    <img 
                    onClick = {() => {
                        goToMain();
                    }}
                    class = "logoImage"
                    src = {flashy_h_white}
                    />
                    <button className = "logoutButton"
                    onClick = {() => {
                        setMainModalLogin();
                        buttonBehavior();
                    }}
                    >
                        login
                    </button>
                </div>
            </div>
        </div>
    );
    }else{
    return(
        <div>
            <div className = "headerComponent">
                <div className = "outerContainer">
                    <img 
                    onClick = {() => {
                        goToDashboard();
                    }}
                    class = "logoImage"
                    src = {flashy_h_white}
                    />
                    <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                            <Invite></Invite>
                        </Popup>

                    <SearchBox/>

                    <div class="IconInHeader">
                        <InboxRoundedIcon onClick = {() => {
                            setButtonPopup(true);
                            }}
                        />
                    </div>
                    
                    <button className = "logoutButton"
                    onClick = {() => {
                        logout();
                    }}
                    >
                        logout
                    </button>
                </div>
            </div>

        </div>
    );
    }
   
};

export default withRouter(Header);