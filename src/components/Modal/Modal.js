import './modal.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import React, {useState, useEffect} from "react";

export const users = [
    {
        username:"realUnicorn",
        info: "Rainbows are mine",
        likes: 205,
        wins: 30,
        photo:"https://images-na.ssl-images-amazon.com/images/I/51mBDeh7PcL.jpg"
    },
    {
        username:"Squirrel",
        info: "Where are more nuts??",
        likes: 23,
        wins: 31,
        photo:"https://i.pinimg.com/originals/ea/53/fd/ea53fdd77bfcf158b3015ed93ab39d8a.jpg"
    },
    {
        username:"Kitty",
        info: "I want to be alone",
        likes: 1000,
        wins: 1,
        photo:"https://www.meme-arsenal.com/memes/f04ebf47a09312cbedfca22256c5722d.jpg"
}]


//export const /*erase if not working*/ 
export const Modal = ({ handleClose, show, children, currentWindow}) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";


  /*where to put?*/

    if(currentWindow == "dashboard"){
        return (
            <div
            className={showHideClassName}>
                <div className = "outside"
                onClick = {() => {
                    handleClose()
                }}>

                </div>
            <section className="modal-main">
                    <div id="modal_title">
                        Available Users
                    </div>

                    {users.map(user => (
                    <div id="modal_content">       
                        
                            <div class="userCard">
                                

                                    <div class="userBasic">
                                        <div class="photoFrame">
                                            <img src={user.photo} />                            
                                        </div>
                                        <p class="profile_username">
                                            {user.username}
                                        </p>
                                    </div>

                                    <div class="userMore">
                                    <p class="likes_wins">
                                        <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {user.likes} <span class="winIcon"><EmojiEventsIcon/></span> {user.wins}
                                    </p>
                                    <p>
                                        {user.info}
                                    </p>   
                                    </div>
                                
                                    <div class="invitationButton"> INVITE </div> 
                            </div>
                            

                        
                        
                        {/* {children}*/}
                    </div>
                    ))}
                    
                <button class="closeModal" type="button" onClick={handleClose} >
                Close
                </button>
                
            </section>
            </div>
        );
    }else if(currentWindow == "mainLogin"){
        //This is the modal shown when pressing on register / login on the main page
        return (
            <div className={showHideClassName}>
                <div className = "outside"
                onClick = {() => {
                    handleClose()
                }}>

                </div>
              <section className="modal-main">
                    <div id="modal_title">
                        Login
                    </div>

                    <div className = "contents">
                    <input className = "input-field"
                        placeholder = "username">

                    </input>
                    <input className = "input-field"
                        placeholder = "password">
                        
                    </input>
                    <button className = "input-button">
                        login
                    </button>
                    </div>
                
              </section>
            </div>
          );
    }
};