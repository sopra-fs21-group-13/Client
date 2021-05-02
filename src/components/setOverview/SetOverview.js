import React, { useState, useEffect } from 'react';

//css
import './setOverview.css';

//header, footer, sideNav...
import Header from "../header/header.js";
import Footer from '../footer/Footer.js'
import SideNav from '../shared/sideNav/SideNav';
import BackButton from "../learnPage/BackButton.png";
import Modal from '../Modal/Modal.js';

import { withRouter, useLocation, useHistory } from 'react-router-dom';
import {api, handleError} from "../../helpers/api"

//example input set
export const example_set = [
    {
        title:"Business English",
        explain:"This set is for people that want to learn some business english. Study well, live well.",
        owner:"FlashyBoss2003",
        likes:32
    }]

export const example_quizes=[
    {
        id: 0,
        question: "Area",
        answer: "Fläche"
    },
    {
        id: 1,
        question: "Politics",
        answer: "Politik"
    }]




function SetOverview(props){
      /*
        Set structure
        title: example_set.title,
        setId: example_set.setId,
        explain: example_set.explain,
        userId: Number(localStorage.getItem('userId')),
        cards: example_quizes,
        photo: example_set.photo,
        liked: 0,
        setStatus: "PUBLIC",
        setCategory: "ENGLISH"
        });
    */

    //used for routing. Location passes the state from dashboard.
    let location = useLocation();
    let history = useHistory();
    const [currentUser, setCUser] = useState(location.userId);
    const[explain, setExplain]=useState();
    const [title, setTitle]=useState();
    const [cards, setCards]=useState();
    const [saved, setSaved]=useState();
    const [members, setMembers]=useState();

    //modal
    const [show, setShow]=useState(false);
    //these also stop the background scrolling
    const showModal=()=>{
        setShow(true);
        document.body.style.overflow = "hidden"
    };
    const hideModal=()=>{
        setShow(false);
        document.body.style.overflow = "unset"
    };

    /*
    constructor() {
        super();
        this.state = {
            which_menu: "dashBoard",
            setList: null,
            ownSetList: null,
            foreignSetList: null,
            userSettings: null,
            show: false, //for avilable Users modal
            user: null,
            showOwnSets: true,
            buttonChecked: true
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        */
    


    //fetch the set clicked
    useEffect(()=>{
        //id of the set clicked
        const setId = location.clickedSet.setId;
        //fetches set that is to be shown
        api.get("/sets/" + setId).then(response=>{
            setTitle(response.data.title);
            {/*set heart if the user is the member*/}
            setSaved(response.data.memberIds.includes(currentUser)?true:false)
            console.log("current set:", response.data)

            console.log("curren user:", currentUser)

            setMembers(response.data.members)
            setExplain(response.data.explain)
            setCards(response.data.cards);
        }).catch(e=>{
            alert(`Something went wrong while fetching user: \n${handleError(e)}`);
        });
    },[])

    

    return(
        <div>
            <Header/>
            
            <div id="screen"> 

                <div class="back-button-container_overview">
                    <button
                    class="back-button"
                    onClick={history.goBack}>
                    
                    <img class="back-button-image" src={BackButton} />
                    </button>
                </div>
                <div id="board_edit">
            

                <div id="pureboard">

                <div id="board_title">
                    
                    
                    <div class="heart_container">
                    <span>  <h1>{saved?(<div class="heart"></div>):(<div class="heart_no"></div>)} {title} </h1>  </span>
                    </div>
                    
                </div>

                <div class="board_contents_edit">
                <form class="editForm">

                <div class="separator">Basic Info</div> 
                    <div id="basic_info">
                        <div className = "infoBlock">
                        <div id="set_info">
                            <label>
                                {explain}
                            </label>

                            <br/>
                            

                        </div>
                        </div>
                        <div id="set_img_upload">
                            
                            <div class="set_img_frame">
                                
                            </div>
                        </div>

                        

                    </div>
                  
                   

                   <br/>

                   {/*}
                   <button class="thinButton" type="button" onClick={showModal}>                 
                                See class members                   
                    </button>
                    */}
                    <div class="separator">Cards</div> 
                    <div id="contents">

                    {!cards ? (<div> loading cards </div>) : (
                        <div>
                        {cards.map(quiz => (
                            <div class="qna">
                                {/*}
                                <div class="q_id"> 
                                    {//quiz.id + 1
                                    } 
                                </div>
                                */}

                                <div class="qna_card">
                                    
                                    <div class="q_title">Question</div>
                                    <div class="q_content">
                                        <div className="question_text"
                                            >
                                                {quiz.question}
                                        </div>
                                        
                                    </div>
                                    <div class="a_title">Answer</div>
                                    <div class="a_content">
                                        <div className="question_text"
                                        >
                                            {quiz.answer}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            
                        ))} 
                        </div>
                        ) }
                        

                    </div>

                    

                    </form>
                    </div>
                </div>
                </div>
                
            </div>
            {/*
            <Modal show={show} handleClose={hideModal} currentWindow="overview" members={members}>
                <p>Modal</p>
            </Modal>
            */}
            <Footer></Footer>
        </div>



    );

}

export default withRouter(SetOverview); 