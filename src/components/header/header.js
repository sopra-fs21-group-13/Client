import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import "./header.css";
import flashy_h_white from '../shared/images/flashy_h-white.svg';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Container = styled.div`
    justify-content: space-between;
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


function Header({buttonBehavior, setMainModalLogin, ...props}){


    const LoginPopUp = () => {

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
                    <Button
                    onClick = {() => {
                        localStorage.clear();
                        props.history.push("/main");
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