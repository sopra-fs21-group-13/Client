import React, { useState,  useEffect } from 'react';
import { useHistory } from "react-router-dom";

import SideFilter from '../sideFilter/SideFilter';
import FriendshipBtn from '../friendship/FriendshipBtn.js'

//profile pictures
import char1 from "../../profile/char1.jpg";
import char2 from "../../profile/char2.jpg";
import char3 from "../../profile/char3.jpg";
import char4 from "../../profile/char4.jpg";
import char5 from "../../profile/char5.jpg";
import char6 from "../../profile/char6.jpg";
import char7 from "../../profile/char7.jpg";
import char8 from "../../profile/char8.jpg";
import char9 from "../../profile/char9.jpg";
import char10 from "../../profile/char10.jpg";
import char11 from "../../profile/char11.jpg";
import char12 from "../../profile/char12.jpg";
import char13 from "../../profile/char13.jpg";
import char14 from "../../profile/char14.jpg";
import char15 from "../../profile/char15.jpg";
import char16 from "../../profile/char16.jpg";

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

    //handles showing the right user picture
    const [userPicturesDict, setUserPicturesDict] = useState({1: char1, 2: char2, 3: char3, 4: char4, 5: char5, 6: char6,
        7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16});
    const [currentPics, setCurrentPics] = useState();

    //amount of likes all user have across all their sets.
    const[likes, setLikes] = useState();

    const [allUsers, setAllUsers] = useState();

    useEffect(() => {
        api.get("/users").then(response => {
            setAllUsers(response.data);
            console.log("hello",allUsers);

            setLikesAndPics(response.data)
        }).catch(e=>{
            alert(`Something went wrong while fetching all users: \n${handleError(e)}`);
        })
    }, []) 

    function setLikesAndPics(users){
        
        var picsDict = {};
        var likesDict = {};

        //set the right picture and like count for every user 
        for (var i = 0; i<users.length; i++){
            console.log(i)
            //current user that is looked at
            const user=users[i]
            //sets pics of users in state
            picsDict[user.userId] = userPicturesDict[Number(user.photo)];

            //calculates likes 
            var likes = 0;
            for(var j=0; j<user.learnSets.length; j++){
                if(user.learnSets[i].likes == null){
                    user.learnSets[i].likes = 0
                }
                likes = likes + user.learnSets[i].likes
            }
            //sets likes in state
            likesDict[user.userId] = likes;
        }

        setLikes(likesDict);
        setCurrentPics(picsDict);
    }

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

                {(!currentPics || !likes) ? (<div>loading users</div>) : (<div id="result_board">
                    <div id="board_title"> {/*this should be changeable */}
                        <h1>All Users</h1>
                    </div>

                    <div id="board_contents"> {/* grid */}
                    {allUsers.map((user)=> (
                            <div class="userCard">
                                

                            <div class="userBasic">
                                <div class="photoFrame">
                                    <img src={currentPics[user.userId]} />                            
                                </div>
                                <p class="profile_username">
                                    {user.username}
                                </p>
                            </div>

                            <div class="userMore">
                            <p class="likes_wins">
                                <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {likes[user.userId]} <span class="winIcon"><EmojiEventsIcon/></span> {user.wins}
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
                </div>) }
                
                

            </div>
            <Footer></Footer>
        </div>
    );
}

export default SearchUsers;