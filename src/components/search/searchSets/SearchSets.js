import React, { useState,  useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";


import SideFilter from '../sideFilter/SideFilter';
import './searchSets.css';
import Header from "../../header/header.js";
import Footer from '../../footer/Footer.js'
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';

//icons, default profile img
import FavoriteIcon from '@material-ui/icons/Favorite';
import ProfilePicture from '../../shared/images/ProfilePicture.png';

//api
import { api, handleError } from "../../../helpers/api";
import {Button} from '../../../views/design/Button.js';

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
    //keep track of window size so you can adjust number of columns of sets shown at one time.
    const [windowWidth, setWindowWidth]=useState();
    const [windowHeght, setWindowHeight]=useState();
    
     //handles showing the right user picture
    const [userPicturesDict, setUserPicturesDict] = useState({1: char1, 2: char2, 3: char3, 4: char4, 5: char5, 6: char6,
        7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16});
    const [currentPics, setCurrentPics] = useState([]);


    //checks for button animation
    const [addButtonCheck, setAddButtonCheck] = useState([]);
    const [addButtonAnim, setAddButtonAnim] = useState([]);


    setFilteredSet();

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        api.get("/users/" + localStorage.getItem("userId")).then(response => {
            
            setCurrentUserId(response.data.userId);

        }).catch(e=>{
            alert(`Something went wrong while fetching curren user id: \n${handleError(e)}`);
        })

    }, []) 


    useEffect(() => {
        api.get("/sets").then(response => {
            //prepare add button checks, so that animation can work individually for every button.
            var addButtonCheckArray = [];
            var addButtonAnimArray = [];
            for(var i = 0; i < response.data.length; i++){
                addButtonCheckArray.push(false);
                addButtonAnimArray.push(true);
            }
            setAddButtonCheck(addButtonCheckArray);
            setAddButtonAnim(addButtonAnimArray);

            setAllSets(response.data);

            setUsernameDict(response.data);
            console.log("all sets:",response.data);

        }).catch(e=>{
            alert(`Something went wrong while fetching all sets: \n${handleError(e)}`);
        })
    }, []) 


    //componentDidMount for columns of sets adjusting to window size
    useEffect(() => {
        //for css variables
        let root = document.documentElement;
        var numberOfColumns = 4;
        if(windowWidth < 1800){
            numberOfColumns = 3;
        }
        if(windowWidth < 1500){
            numberOfColumns = 2;
        }
        if(windowWidth < 1000){
            numberOfColumns = 1;
        }
        //changes amount of columns in dashboard depending on window width
        root.style.setProperty('--columnNumbers', numberOfColumns);
    })

    //check resize
    function handleResize(){
        setWindowHeight(window.innerHeight);
        setWindowWidth(window.innerWidth);
    };



    function setUsernameDict(sets){
        var usernameDict = {}
        var picsDict = {};
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
                        picsDict[set.setId] = userPicturesDict[Number(user.photo)];
                    }
                }
    
            }
            console.log("usernameDict",usernameDict)
            setUsernames(usernameDict)
            setCurrentPics(picsDict);
            console.log("pics", currentPics)

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
                        <div>
                            <div class="oneSetWrapper_dashboard" key={i}>
                                <div className = "cardsContainer">
                                    <div className = "singleSetBorder">
                                        
                                        <div readOnly className = "singleCardPreview cardOne"></div>
                                        <div readOnly className = "singleCardPreview cardTwo"></div>
                                        <div readOnly className = "singleCardPreview cardThree"
                                        onClick={() => {
                                            //Pushes the set to the set view page
                                            history.push({pathname: "overview", userId: res.userId, clickedSet: res});
                                        }}>
                                            <div className = "cardFront">
                                                <text>
                                                {res.cards[0].question}
                                                </text>
                                            </div>
                                            <div className = "setTitleNew">
                                                <text>
                                                    {res.title}
                                                </text>
                                            </div>
                                            <div className = "thumbIconBox">
                                                <ThumbUpAltOutlinedIcon className = "thumbIcon"/> {res.liked}
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div className = "setSizeIndicator"><text>{res.cards.length}</text></div>
                                </div>
                            </div>
                        <div className = "containerUnderSets">
                            <div class ="owner_likes">
                                <div className = "owner_info">
                                    <div className = "owner_info_picture">
                                        <div class="photoFrame_s">
                                            <img 
                                            onClick = {() => {
                                                history.push({pathname: "PublicProfile", state: {userId: res.userId}})
                                            }}
                                            src={currentPics[res.setId]}/>
                                            </div>
                                            <div className = "owner_info_username"
                                            onClick = {() => {
                                                history.push({pathname: "PublicProfile", state: {userId: res.userId}})
                                                
                                            }}>
                                        </div>
                                    
                                    </div>
                                    {" " + usernames[res.setId]}
                                </div>
                                <button className = {`addButton ${addButtonCheck[i] ? 'open' : ''}`}
                                    onMouseEnter = {() => {if(addButtonAnim[i]){
                                        var addButtonCheckArray = [...addButtonCheck];
                                        addButtonCheckArray[i] = true;
                                        setAddButtonCheck(addButtonCheckArray)}}}
                                    onMouseLeave = {() => {
                                        var addButtonCheckArray = [...addButtonCheck];
                                        addButtonCheckArray[i] = false;
                                        setAddButtonCheck(addButtonCheckArray)}}
                                    disabled = {(
                                        (disabledButtons.includes(res.setId)) ||
                                        (localStorage.getItem("userId") == res.userId) || 
                                        (localStorage.getItem("userId") != res.userId && res.memberIds.includes(Number(localStorage.getItem("userId")))))}
                                    onClick = {()=>{
                                        //disable button animation and transformation into bigger button
                                        var addButtonCheckArray = [...addButtonCheck];
                                        addButtonCheckArray[i] = false;
                                        var addButtonAnimArray = [...addButtonAnim];
                                        addButtonAnimArray[i] = false;
                                        setAddButtonAnim(addButtonAnimArray)
                                        setAddButtonCheck(addButtonCheckArray)
                                        //sets that button needs to be disabled
                                        setDisabledButtons(disabledButtons.concat([res.setId]))
                                        addToDashboard(res);
                                        
                                    }}>
                                        {addButtonCheck[i] ? (<text className="addText">add to dashboard</text>):(<text className="addText">+</text>)}
                                            
                                </button>
                            </div>
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