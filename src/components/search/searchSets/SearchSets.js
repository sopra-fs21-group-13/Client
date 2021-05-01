import React, { useState,  useEffect } from 'react';
import { useHistory } from "react-router-dom";

import SideFilter from '../sideFilter/SideFilter';
import './searchSets.css';
import Header from "../../header/header.js";
import Footer from '../../footer/Footer.js'

//icons, default profile img
import FavoriteIcon from '@material-ui/icons/Favorite';
import ProfilePicture from '../../shared/images/ProfilePicture.png';

//api
import { api, handleError } from "../../../helpers/api";
import User from '../../shared/models/User';




function SearchSets(props){
    /*var allSets=[];*/
    const [allSets, setAllSets] = useState([]);

    /** setId:username  */
    const [usernames, setUsernames] = useState([]);


    useEffect(() => {
        api.get("/sets").then(response => {
            setAllSets(response.data);

            setUsernameDict(response.data);

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


/*
    for(var j = 0; j < response.length; j++){
        if(response[j].cardId == userSettings.savedOrder[i]){
          ordered_response.push(response[j]);
        }
        console.log(response[j].cardId + "/" + userSettings.savedOrder[i])
      }
*/



    return(
        <div>
            {console.log("hmm",allSets)}

            <Header/>
            <div id="body"> {/* grid */}

                <SideFilter view="sets"/>

                <div id="result_board">
                    <div id="board_title"> {/*this should be changeable */}
                        <h1>All Sets</h1>
                    </div>
                    <div class="board_contents"> {/* grid */}
                    
                        {allSets.map((res ,i)=> (
                            <div class="oneSetWrapper" key={i}>
                                

                                <div class="oneSet">
                                    <div class="oneSetImage">
                                        <img src={res.photo} />
                        
                                    </div>
                                    <div class="setTitle">
                                        {res.title}
                                    </div>
                                </div>

                                <div class ="owner_likes">
                                    {/* should be changed to user name(not user ID)*/}
                                    <img src={ProfilePicture}/>{usernames[res.setId]}
                                    {/*console.log(userNames[res.userId])*/}
                                    
                                    <br/>
                                    <FavoriteIcon/> {res.liked} 
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