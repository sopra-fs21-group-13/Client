import React, { useState,  useEffect } from 'react';
import { useHistory } from "react-router-dom";

import SideFilter from '../sideFilter/SideFilter';
import FriendshipBtn from '../friendship/FriendshipBtn.js'

//css
import './searchUsers.css';

//header, footer
import Header from "../../header/header.js";
import Footer from '../../footer/Footer.js'

//icons, default profile img
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

//api
import { api, handleError } from "../../../helpers/api";


function SearchUsers(props){

    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        api.get("/users").then(response => {
            setAllUsers(response.data);
            console.log("hello",allUsers);

        }).catch(e=>{
            alert(`Something went wrong while fetching all users: \n${handleError(e)}`);
        })
    }, []) 

    /*useEffect(() => {
        history.push("dashboard")
      });*/

      /*
    //example input set
    const allUsers=[
        {
            username:"realUnicorn",
            info: "Rainbows are mine.",
            likes: 205,
            wins: 30,
            photo:"https://images-na.ssl-images-amazon.com/images/I/51mBDeh7PcL.jpg"
        },
        {
            username:"Squirrel",
            info: "Where are more nuts?? I have to keep a looot for this winter!",
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
    }]*/



    return(
        <div>
            <Header/>
            <div id="body"> {/* grid */}

                <SideFilter view="users"/>

                <div id="result_board">
                    <div id="board_title"> {/*this should be changeable */}
                        <h1>All Users</h1>
                    </div>

                    <div id="board_contents"> {/* grid */}
                    {allUsers.map((user)=> (
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
                                {user.username}
                            </p>   
                            </div>
                        
                            {/*must know if the user is friend or not. here temporarily used false */}
                            <FriendshipBtn friendship={false}/>

                            {/* if already friend 
                            <div class="invitationButton"> Unfriend </div> 
                            */}
                    </div>

                        ))}
                    </div>
                </div>
                

            </div>
            <Footer></Footer>
        </div>
    );
}

export default SearchUsers;