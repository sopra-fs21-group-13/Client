import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import "./header.css";
import SearchBox from "./searchBox/SearchBox"
import flashy_h_white from '../shared/images/flashy_h-white.svg';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { api, handleError } from "../../helpers/api";

const Container = styled.div`
    justify-content: flex-end;
    display: flex;
`

const Button = styled.button`
    width: 60px;
    border: none;
    background-color: rgba(255,255,255,0);
    &:hover {
        cursor: pointer;
        color: rgba(255,255,255,0.6)
    }
    color: white;
`

//had to lower the z-index of the header so the components inside were clickable.
const HeaderComponent = styled.header`
    color:white;
    background-color:#70F0A9;
    top: 0px;
    position: sticky;
    height: 60px;
    padding: 15px;
`


function Header({buttonBehavior, setMainModalLogin, keyword, setKeyword,...props}){


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
            <HeaderComponent>
                <Container>
                    <img 
                    onClick = {() => {
                        goToMain();
                    }}
                    class = "logoImage"
                    src = {flashy_h_white}
                    />
                    
                    <Button
                    onClick = {() => {
                        setMainModalLogin();
                        buttonBehavior();
                    }}
                    >
                        login
                    </Button>
                </Container>
            </HeaderComponent>

        </div>
    );
    }else{
    return(
        <div>
            <HeaderComponent>
                <Container>
                    <img 
                    onClick = {() => {
                        goToDashboard();
                    }}
                    class = "logoImage"
                    src = {flashy_h_white}
                    />

                    <SearchBox/>
                    <Button
                    onClick = {() => {
                        logout();
                    }}
                    >
                        logout
                    </Button>
                </Container>
            </HeaderComponent>

        </div>
    );
    }
   
};

export default withRouter(Header);