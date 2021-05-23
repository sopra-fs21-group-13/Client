/**
 * All types of result
 * 1. no keyword(==view all, all type + no keyword)
 * 2. filtered with keyword ()
 */

 import React, { useState,  useEffect} from 'react';
 import { useHistory, useLocation } from "react-router-dom";

 
 import SideFilter from './sideFilter/SideFilter';
 import './searchSets/searchSets.css';
 import './searchUsers/searchUsers.css';
 import Header from "../header/header.js";
 import Footer from '../footer/Footer.js'
 import SearchSets from './searchSets/SearchSets.js';
 import SearchUsers from './searchUsers/SearchUsers.js';

 
 //icons, default profile img
 import FavoriteIcon from '@material-ui/icons/Favorite';
 import ProfilePicture from '../shared/images/ProfilePicture.png';
 
 //api
 import { api, handleError } from "../../helpers/api";
 import {Button} from '../../views/design/Button.js';

 //SEARCH USERS

 //profile pictures
import char1 from "../profile/char1.jpg";
import char2 from "../profile/char2.jpg";
import char3 from "../profile/char3.jpg";
import char4 from "../profile/char4.jpg";
import char5 from "../profile/char5.jpg";
import char6 from "../profile/char6.jpg";
import char7 from "../profile/char7.jpg";
import char8 from "../profile/char8.jpg";
import char9 from "../profile/char9.jpg";
import char10 from "../profile/char10.jpg";
import char11 from "../profile/char11.jpg";
import char12 from "../profile/char12.jpg";
import char13 from "../profile/char13.jpg";
import char14 from "../profile/char14.jpg";
import char15 from "../profile/char15.jpg";
import char16 from "../profile/char16.jpg";
import OnlineSign from "../shared/images/OnlineSign.png";
import OfflineSign from "../shared/images/OfflineSign.png";
import './searchUsers/searchUsers.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import { SettingsInputAntennaTwoTone } from '@material-ui/icons';


 
 
 
 function SearchAll(props){
    let history = useHistory();
    let location = useLocation();
    console.log("키워드:", location.keyword);
    console.log("delivered keyword:",location.keyword);
    var searchTitle="All Sets & Users";

    if (location.keyword!=undefined){ 
        searchTitle="All Sets and Users Related to \""+location.keyword.toString()+"\"";
    }

{/*
    SHOW SETS
 */}
     const [allSets, setAllSets] = useState([]);
     const [usernames, setUsernames] = useState([]);
     const [disabledButtons, setDisabledButtons] = useState([]);
     const [currentUserId, setCurrentUserId]=useState();

     useEffect(() => {
         api.get("/users/" + localStorage.getItem("userId")).then(response => {
             
             setCurrentUserId(response.data.userId);
 
         }).catch(e=>{
             alert(`Something went wrong while fetching curren user id: \n${handleError(e)}`);
         })
     }, []) 
 
     //@@ Get all sets
     useEffect(() => {
         api.get("/sets").then(response => {
             setAllSets(response.data);
 
             setUsernameDict(response.data);
             console.log("all sets:",response.data);
 
         }).catch(e=>{
             alert(`Something went wrong while fetching all sets: \n${handleError(e)}`);
         })
     }, []) 
 
     function setUsernameDict(sets){
         var usernameDict = {}
         var users = []
 
         api.get("/users").then(response => {
             users = response.data;
             console.log(response);
 
             for(var i = 0; i < sets.length; i++){
                 var set = sets[i];
                 for(var j = 0; j < users.length; j++){
                     var user = users[j];
                     console.log(set)
                     if(user.userId == set.userId){
                         usernameDict[set.setId] = user.username;
                     }
                 }
     
             }
             console.log(usernameDict)
             setUsernames(usernameDict)
 
         }).catch(e=>{
             alert(`Something went wrong while fetching all users: \n${handleError(e)}`);
         })
         
     }
 
     //add foreign set to dashboard, if it is not added yet.
     function addToDashboard(set){
         api.put("/sets/" + localStorage.getItem("userId") + "/" + set.setId).then(response =>{
             console.log("added set " + set.setId + " to users dashboard");
         }).catch(e=>{
             alert(`Something went wrong while adding set to dashboard: \n${handleError(e)}`);
         })
     }
 


{/*
    FOR USERS
 */}
 //handles showing the right user picture
 const [userPicturesDict, setUserPicturesDict] = useState({1: char1, 2: char2, 3: char3, 4: char4, 5: char5, 6: char6,
    7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16});
const [currentPics, setCurrentPics] = useState();

//amount of likes all user have across all their sets.
const[likes, setLikes] = useState();
const [allUsers, setAllUsers] = useState([]);



// @@set all users
useEffect(() => {
    api.get("/users").then(response => {
        setAllUsers(response.data);
        setLikesAndPics(response.data)
    }).catch(e=>{
        alert(`Something went wrong while fetching all users: \n${handleError(e)}`);
    })
    
}, []) 


//filtered users and sets
const fUsers=[];
const fSets=[];


/**
 * make filtered Sets Dict(fSets)
 */
 function setFilteredSet(){
    var k=0;
    console.log("얘는 보잖아:", allSets);
    for (var i=0;i<allSets.length;i++)
    {
        if(location.keyword!=undefined)//only when there's keyword
        {

            //if (allSets[i].title.toLowerCase().includes(keyword.toLowerCase())){
            if (allSets[i].title.toLowerCase().includes(location.keyword.toLowerCase())){
                fSets[k++]=allSets[i];
            }
        }
        else{
            fSets[i]=allSets[i];
        }
    }
    console.log("filter worked:",fSets );
}

setFilteredSet();



/**
 * make filtered Users Dict(fUsers)
 */
function setFilteredUsers(){
    var l=0;
    for (var i=0; i<(allUsers.length); i++)
    {
        if(location.keyword!=undefined)//only when there's keyword
        {
            if (allUsers[i].username.toLowerCase().includes(location.keyword.toLowerCase())){
                fUsers[l++]=allUsers[i];
            }
        }
        else{
            fUsers[i]=allUsers[i];
        }
    }
    console.log("filter worked:",fUsers );
}
setFilteredUsers();


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
            if(user.learnSets[j].likes == null){
                user.learnSets[j].likes = 0
            }
            likes = likes + user.learnSets[j].likes
        }
        //sets likes in state
        likesDict[user.userId] = likes;
    }

    setLikes(likesDict);
    setCurrentPics(picsDict);
}



     return(
         
         <div>
 
             <Header/>
             <div id="body"> {/* grid */}
 
                 <SideFilter view="all"/>
 
                 <div id="result_board">

{/**
 * sets (filtered or non-filtered)
 */}
                
                     <div id="board_title"> {/*this should be changeable */}
                         <h1>{searchTitle}</h1>
                         {/*<h1>All Sets & Users</h1>*/}
                     </div>
                     <div class="board_contents"> {/* grid */}

                       
                    
                        {/*!keyword?(<div></div>):(<div></div>)*/
                        
                        }

                        
                         {fSets.map((res ,i)=> (
                             
                             <div class="oneSetWrapper" key={i}>
                                 
                                 <div class="oneSet" onClick={() => {
                                     //Pushes the set to the set view page
                                     history.push({pathname: "overview", userId:currentUserId, clickedSet: res});
                                 }}>
                                     <div class="oneSetImage">
                                         <img src={res.photo} />
                         
                                     </div>
                                     
                                     <div class="setTitle">
                                         {res.title}
                                     </div>
                                     
                                 </div>
                                 <div className = "setTitleContainer">
                                 <div class ="owner_likes">
                                     <div className = "owner_info">
                                     <img
                                     onClick = {() => {
                                         history.push({pathname: "PublicProfile", state: {userId: res.userId}})
                                     }}
                                     src={ProfilePicture}/>
                                     <div
                                     onClick = {() => {
                                         history.push({pathname: "PublicProfile", state: {userId: res.userId}})
                                         
                                     }}>
                                     {" " + usernames[res.setId]}
                                     </div>
                                     <br/>
                                     </div>
                                     {/*<FavoriteIcon/> {res.liked}*/}
                                 </div>
                                 <Button className = "addButton"
                                 disabled = {(
                                     (disabledButtons.includes(res.setId)) ||
                                     (localStorage.getItem("userId") == res.userId) || 
                                     (localStorage.getItem("userId") != res.userId && res.memberIds.includes(Number(localStorage.getItem("userId")))))}
                                 onClick = {()=>{
                                     //sets that button needs to be disabled
                                     setDisabledButtons(disabledButtons.concat([res.setId]))
                                     addToDashboard(res);
                                     
                                 }}>
                                         add to dashboard
                                 </Button>
 
                                     </div>
 
                             </div>
 
                         ))}
                         
                     </div>

{/**
 * users (filtered or non-filtered)
 */}
                     {(!currentPics || !likes) ? (<div>loading users</div>) : (<div id="result_board">
                    
                    <div id="board_contents"> {/* grid */}
                    <div className = "userGrid">
                    {fUsers.map((user)=> (
                            <div class="userCard"
                            onClick = {() => {
                                history.push({pathname: "PublicProfile", state: {userId: user.userId}})
                            }}>
                                

                            <div class="userBasic">
                                <div>
                                <div class="photoFrame">
                                    <img src={currentPics[user.userId]} /> 
                                </div>
                                <img className = "online-sign"
                                    src={(user.status == "ONLINE") ? OnlineSign : OfflineSign}/>
                                </div>
                                <p class="profile_username">
                                    {user.username}
                                </p>
                                <div class="userMore">
                                <p>
                                    {user.name}
                                </p>  
                                <p class="likes_wins">
                                    <div className = "likesAndWins">
                                    <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {likes[user.userId]} 
                                    <span class="winIcon"><EmojiEventsIcon/></span> {0}
                                    </div>
                                </p>
                                 
                            </div>
                            </div>

                            
                        
                            {/*must know if the user is friend or not. here temporarily used false */}
                            {/*<FriendshipBtn friendship={false}/>*/
                            }

                            {/* if already friend 
                            <div class="invitationButton"> Unfriend </div> 
                            */}
                            </div>

                        ))}
                    </div>
                    </div>
                </div>) }
                 </div>
                 
 
             </div>
             <Footer></Footer>
         </div>
     );
        
 }
 
 export default SearchAll; 