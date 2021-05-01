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




function SearchSets(props){
    /*var allSets=[];*/
    const [allSets, setAllSets] = useState([]);

    /** setId:username  */
    const [userNames, setUserNames] = useState([]);



    
    
   

    useEffect(() => {
        api.get("/sets").then(response => {
            setAllSets(response.data);
            console.log("hello",allSets);

        }).catch(e=>{
            alert(`Something went wrong while fetching all sets: \n${handleError(e)}`);
        })
    }, []) 


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
                                {
                                api.get("/users/"+ res.userId.toString()).then
                                        (response => {
                                            let ownerName=response.data.username;
                                            //console.log(ownerName);
                                            var dict=userNames;
                                            dict[res.userId]=ownerName;
                                            setUserNames(dict);
                                            //userNames=>{userNames, [key: res.userId, value:ownerName] )
                                               // ...userNames, [res.userId,ownerName]);

                                        }).catch(e=>{
                                            alert(`Something went wrong while finding name of the user: \n${handleError(e)}`);
                                        }
                                        )
                                , []
                                }

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
                                    <img src={ProfilePicture}/>{String(userNames[res.userId])}
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