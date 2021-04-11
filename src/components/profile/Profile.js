import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';

//icons from google..
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import {Button} from '../../views/design/Button.js';
import './profile.css'


class Profile extends React.Component {
    response = [
        {
            username:"Unicorn",
            info: "I like rainbows!",
            likes: 205,
            wins: 30,
            photo:"https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
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

                <div class="sidenav"> 
                    <div class="menuItem">
                        Dashboard
                    </div>
                    <div class="checkedMenuItem">
                        Profile
                    </div>
                </div>


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
                            Name:
                            <input type="text" name="name" />
                        </label>
                        <label>
                            Info:
                            <input type="text" name="info" />
                        </label>
                        <input type="submit" value="Submit" />
                        </form>
                    </div>

                </div>
                
                <footer>Footer</footer>
            </div>
        );
    }
}
export default withRouter(Profile);