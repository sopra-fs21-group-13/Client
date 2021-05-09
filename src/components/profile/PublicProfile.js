import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components';
import { withRouter, useLocation } from 'react-router-dom';
import Header from "../header/header.js";
import Footer from '../footer/Footer.js'
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

//online offline icons
import OnlineSign from "../shared/images/OnlineSign.png";
import OfflineSign from "../shared/images/OfflineSign.png";


//icons from google..
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import './profile.css'
import SideNav from '../shared/sideNav/SideNav';
import { api, handleError } from '../../helpers/api.js';


const Image = styled.img`
`
Image.defaultProps = {
    src: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
}

export default function PublicProfile(){

    //handles showing the right user picture
    const [userPicturesDict, setUserPicturesDict] = useState({1: char1, 2: char2, 3: char3, 4: char4, 5: char5, 6: char6,
        7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16});
    const [currentPic, setCurrentPic] = useState();

    const location = useLocation();
    const [user, setUser] = useState();
    //amount of likes a user has across all his sets.
    const[likes, setLikes] = useState(0);

    useEffect(()=>{
        //id of currently logged in user
        const userId = location.state.userId;
        //fetches user that is to be shown in public profile
        api.get("/users/" + userId).then(response=>{
            const user = new User(response.data);
            setUser(user);
            setCurrentPic(userPicturesDict[Number(user.photo)])

            //adds all the likes from all the sets a user created
            var likes = 0;
            for(var i=0; i<user.learnSets.length; i++){
                if(user.learnSets[i].likes == null){
                    user.learnSets[i].likes = 0
                }
                likes = likes + user.learnSets[i].likes
            }
            setLikes(likes);
        }).catch(e=>{
            alert(`Something went wrong while fetching user: \n${handleError(e)}`);
        });
    },[])



        return(

            <div>
                <Header/>
                
                <div id="board_profile"> {/**probably board_profile */}
                <SideNav/>
                {!user ? (
                    <div>loading</div>
                    ):(
                        <div id="pureboard">
                    <h1> User profile </h1>
                        
                    
                    <div className ="profileCard"> 
                        
                        
                        <div className ="photoFrame">
                            <img src={currentPic} />                            
                        </div>
                        <img className = "online-sign"
                        src={(user.status == "ONLINE") ? OnlineSign : OfflineSign}/>
                            
                            
                        <p className ="profile_username">
                            {user.username}
                        </p>

                        <p className ="likes_wins">
                            <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {likes} <span class="winIcon"><EmojiEventsIcon/></span> {user.numberOfWins}
                        </p>
                        <p>
                            {user.name}

                        </p>   
                    </div>

                    <div id="allSets"> 
                        {user.learnSets.map(res => (
                                    <div class="oneSetWrapper">
                                        <div class="oneSet">
                                            
                                            <div class="oneSetImage">
                                                <Image
                                                src={res.photo} />
                                
                                            </div>
                                            <div class="setTitle">
                                                {res.title}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
                    )}
                
                
                </div>
                <Footer>Footer</Footer>
            </div>
        );
    
}