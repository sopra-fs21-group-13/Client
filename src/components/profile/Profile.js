import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

//icons from google..
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import {Button} from '../../views/design/Button.js';
import './profile.css'
import SideNav from '../shared/sideNav/SideNav';
import Header from "../header/header.js";
import Footer from "../footer/Footer.js"


export default function Profile(){

    //I changed it to a functional component. Can be reverted anytime. Old code is below!

    const response = 
        {
            username:"Unicorn",
            info: "I like rainbows!",
            likes: 205,
            wins: 30,
            photo: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
        }


        return(

            <div>
                <Header/>
        
                <div id="board_profile"> 
                <SideNav checked={2}/>

                    <div id="pureboard">

                     <div id="board_title"> {/*this should be changeable */}
                         <h1> Manage your profile here </h1>
                    </div>  
                    
                        
                    {
                        <div className ="profileCard"> 
                        
                        
                        <div className ="photoFrame">
                            <img src={response.photo} />                            
                        </div>
                            
                            
                        <p className ="profile_username">
                            {response.username}
                        </p>

                        <p className ="likes_wins">
                            <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {response.likes} <span class="winIcon"><EmojiEventsIcon/></span> {response.wins}
                        </p>
                        <p>
                            {response.info}

                        </p>   
                    </div>
                    }
                    <div class="formContainer">
                        <form class="editUserForm">
                            
                        
                            <label class="form_name">
                              
                                <span class="name_q">Change Username</span>
                                <input class="name_a" placeholder="e.g. Billy Gonzales"/>
                            
                            </label>

                            <label class="form_info">
                               
                                <span class="info_q">Change Info</span>
                                <input class="info_a" placeholder="e.g. I like flowers"/>
                                
                            </label>
    
                            

                            <input
                            class = "submitButton"
                            type="submit" value="Save changes" />

                        </form>
                    </div>

                </div>
                </div>
                
                <Footer>Footer</Footer>
            </div>
        );
    
}


/*
class Profile extends React.Component {
    response = [
        {
            username:"Unicorn",
            info: "I like rainbows!",
            likes: 205,
            wins: 30,
            photo: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
        }]         
    constructor() {
      super(); 

      //should edit here..
      this.state = {
          which_menu: "profile",
          user: this.response.username
      };
    }

    async componentDidMount(){
        //This probably won't be implemented with an array. This is placeholder information for the set info.
        //매 순간 업데이트돼야하는 친구들.
    }  
        

    render(){
        return(
            <div>

                <SideNav checked={2}/>


                <div id="board"> 
                    <h1> Manage your profile here </h1>
                        
                    {this.response.map(user => ( 
                    <div class="profileCard"> 
                        
                        
                        <div class="photoFrame">
                            <img src={user.photo} />                            
                        </div>
                            
                            
                        <p class="profile_username">
                            {user.username}
                        </p>

                        <p class="likes_wins">
                            <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {user.likes} <span class="winIcon"><EmojiEventsIcon/></span> {user.wins}
                        </p>
                        <p>
                            {user.info}

                        </p>   
                    </div>
                    ))}
                    <div class="formContainer">
                        <form class="editUserForm">
                        <label>
                            <span>
                            <span>Change Username</span>
                            <input placeholder="e.g. Billy Gonzales"/>
                                
                            </span>
                        </label>
                        <label>
                            <span>
                            <span>Change Info</span>
                            <input placeholder="e.g. I like flowers"/>
                                
                            </span>
                        </label>
                        <input
                        class = "submitButton"
                        type="submit" value="Save changes" />
                        </form>
                    </div>

                </div>
                
                <footer>Footer</footer>
            </div>
        );
    }
}
export default withRouter(Profile);*/