import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components';
import { withRouter, useHistory } from 'react-router-dom';

//icons from google..
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import {Button} from '../../views/design/Button.js';
import './profile.css'
import SideNav from '../shared/sideNav/SideNav';
import Header from "../header/header.js";
import Footer from "../footer/Footer.js";
import { api, handleError } from "../../helpers/api";
import User from '../shared/models/User';

//profile pictures
import char1 from "./char1.jpg";
import char2 from "./char2.jpg";
import char3 from "./char3.jpg";
import char4 from "./char4.jpg";
import char5 from "./char5.jpg";
import char6 from "./char6.jpg";
import char7 from "./char7.jpg";
import char8 from "./char8.jpg";
import char9 from "./char9.jpg";
import char10 from "./char10.jpg";
import char11 from "./char11.jpg";
import char12 from "./char12.jpg";
import char13 from "./char13.jpg";
import char14 from "./char14.jpg";
import char15 from "./char15.jpg";
import char16 from "./char16.jpg";


export default function Profile(){

    //I changed it to a functional component. Can be reverted anytime. Old code is below!

    //user state
    const [user, setUser] = useState();
    const [userPictures, setUserPictures] = useState([char1, char2, char3, char4, char5, char6, char7, char8, 
        char9, char10, char11, char12, char13, char14, char15, char16]);
    const [userPicturesDict, setUserPicturesDict] = useState({1: char1, 2: char2, 3: char3, 4: char4, 5: char5, 6: char6,
        7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16});
    const [currentPic, setCurrentPic] = useState();

    //history
    const history = useHistory();

    //when component mounts it fetches user and saves it into the user state above.
    useEffect(() => {
        api.get("/users/" + localStorage.getItem("userId")).then(response => {
            
            const user = new User(response.data);
            setUser(user);
            setCurrentPic(userPicturesDict[Number(user.photo)])

        }).catch(e=>{
            alert(`Something went wrong while fetching user info: \n${handleError(e)}`);
        })
    }, []) 

    function submitChanges(){
        let photo = ""
        for(var i = 1; i <= userPictures.length; i++){
            if(userPicturesDict[i] == currentPic){
                photo = i.toString();
            }
        }

        const requestBody = JSON.stringify({
            userId: Number(user.userId),
            username: user.username,
            name: user.name,
            photo: photo
        });

        api.put("/users", requestBody).then(response=>{
            console.log(response);
            history.push("/dashboard");
        }).catch(e=>{
            alert(`Something went wrong while updating user info: \n${handleError(e)}`);
        });
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
                    
                        
                    {!user ?   ( <div><div className ="profileCard"> 
                        
                        
                        <div className ="photoFrame">
                            <img src={""} />                            
                        </div>
                            
                            
                        <p className ="profile_username">
                            username
                        </p>

                        <p className ="likes_wins">
                            {
                            //<span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {user.likes} 
                            //<span class="winIcon"><EmojiEventsIcon/></span> {user.wins}
                        }
                        </p>
                        <p>
                            info

                        </p>   
                    </div> </div>): (
                    
                    <div className ="profileCard"> 
                        
                        
                        <div className ="photoFrame">
                            <img src={currentPic} />                            
                        </div>
                            
                            
                        <p className ="profile_username">
                            {user.username}
                        </p>

                        <p className ="likes_wins">
                            {
                            //<span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {user.likes} 
                            //<span class="winIcon"><EmojiEventsIcon/></span> {user.wins}
                        }
                        </p>
                        <p>
                            {user.name}

                        </p>   
                    </div>
                    )}
                    <div class="formContainer">
                        <div className= "editUserFormContainer">
                        <form class="editUserForm">
                        <label>
                            <span>
                            <span>Change Username</span>
                            <input placeholder="e.g. Berty1979"
                                onChange={e => user.username = e.target.value}
                            />
                                
                            </span>
                        </label>
                        <label>
                            <span>
                            <span>Change Name</span>
                            <input placeholder="e.g. Berthold Dietrich"
                                onChange={e => user.name = e.target.value}
                            />
                            {//onChange={e => user.explain = e.target.value}
                                }
                                
                            </span>
                        </label>
                        <input
                        className = "submitButton"
                        type="button" value="Save changes" 
                        onClick = {() => {
                            submitChanges();
                        }}
                        />

                        </form>
                        </div>
                        <label>
                        <span className = "userPicturesSpan">Change Picture</span>
                        <div className = "userPictures">
                            {!userPictures ? 
                            ("loading pictures") : (
                                <div>
                                {userPictures.map((pic, i) => (
                                        <img 
                                        onClick={()=>{
                                            setCurrentPic(pic);
                                        }}
                                        className = "pictureChoices" src={pic} key={i}/>
                                ))}
                                </div>
                            ) 
                        }
                        </div>
                        </label>
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