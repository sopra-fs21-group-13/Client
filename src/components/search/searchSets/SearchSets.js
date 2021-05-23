import React, { useState,  useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";


import SideFilter from '../sideFilter/SideFilter';
import './searchSets.css';
import Header from "../../header/header.js";
import Footer from '../../footer/Footer.js'

//icons, default profile img
import FavoriteIcon from '@material-ui/icons/Favorite';
import ProfilePicture from '../../shared/images/ProfilePicture.png';

//api
import { api, handleError } from "../../../helpers/api";
import {Button} from '../../../views/design/Button.js';

/**
 * type==set
 * 1. no keyword
 * 2. with keyword
 * @param {*} props 
 * @returns 
 */




function SearchSets(props){
    let location = useLocation();
    var searchTitle="All Sets";
    if (location.keyword!=undefined){ 
        searchTitle="All Sets Related to \""+location.keyword.toString()+"\"";
    }
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
    
    
    /*var allSets=[];*/
    const [allSets, setAllSets] = useState([]);

    /** setId:username  */
    const [usernames, setUsernames] = useState([]);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [currentUserId, setCurrentUserId]=useState();
    const fSets=[];
    setFilteredSet();

    useEffect(() => {
        api.get("/users/" + localStorage.getItem("userId")).then(response => {
            
            setCurrentUserId(response.data.userId);

        }).catch(e=>{
            alert(`Something went wrong while fetching curren user id: \n${handleError(e)}`);
        })
    }, []) 


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


/*
    for(var j = 0; j < response.length; j++){
        if(response[j].cardId == userSettings.savedOrder[i]){
          ordered_response.push(response[j]);
        }
        console.log(response[j].cardId + "/" + userSettings.savedOrder[i])
      }
*/


    let history = useHistory();
    return(
        

        <div>
            {console.log("",allSets)}

            <Header/>
            <div id="body"> {/* grid */}

                <SideFilter view="sets"/>

                <div id="result_board">
                    <div id="board_title"> {/*this should be changeable */}
                        <h1>{searchTitle}</h1>
                    </div>
                    <div class="board_contents"> {/* grid */}
                    
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
                </div>
                

            </div>
            <Footer></Footer>
        </div>
    );
}

export default SearchSets; //is default right..?