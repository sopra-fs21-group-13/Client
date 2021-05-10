import React, { useState, useEffect } from 'react';
import SideNav from '../shared/sideNav/SideNav';
import './editCreate.css';
import Header from "../header/header.js";
import { withRouter, useLocation, useHistory } from 'react-router-dom';
import {api, handleError} from "../../helpers/api"
import User from '../shared/models/User';
import Footer from '../footer/Footer.js'

import BackButton from "../learnPage/BackButton.png";

//icon
import { DeleteForever } from '@material-ui/icons';


function EditCreateSet(props){

    //example input set
    const example_set = [
        {title:"Business English",
        info:"This set is for people that want to learn some business english. Study well, live well.",
        owner:"FlashyBoss2003",
        likes:32
    }]

    //used for routing. Location passes the state from dashboard.
    let location = useLocation();
    let history = useHistory();



    // quizes is the cards
    //createBehavior is used for the save button, so that the request to the backend can act accordingly (old set update or new set creation)
    const[quizes, setQuizes] = useState();
    const[set, setSet] = useState({setId: 0, title: "",liked: 0, explain: "", userId: 5, cards: [{id: 0, question: "", answer: ""}, {id: 1, question: "", answer: ""}]
                                    , photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"});
    const [editBehavior, setBehavior] = useState();
    const[cardCounter, setCounter] = useState();

   //this is like componentDidMount in classes, happens only once in the beginning
    useEffect(() => {
        setQuizes(location.state.set.cards);
        setSet(location.state.set);
        setBehavior(location.state.editBehavior);
        setCounter(location.state.set.cards.length);
    }, [])


    
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };

  function addCard(){
      const newCard = {question: "", answer: ""};
      setCounter(cardCounter+1);
      //clone array
      const set = [...quizes];
      set.push(newCard);
      setQuizes(set);
  }

  //depending on "createBehavior" state, either one of those is chosen as the onClick of the "save" button.
  function createSet(){
        const requestBody = JSON.stringify({
            title: set.title,
            explain: set.explain,
            user: {userId: localStorage.getItem("userId")},
            cards: quizes,
            photo: set.photo,
            liked: 0,
            setStatus: "PUBLIC",
            setCategory: "ENGLISH"
            });

        api.post('/sets', requestBody).then(result => {console.log(result); history.push("/dashboard");}
        ).catch(e=>{
            alert(`Something went wrong while updating user set: \n${handleError(e)}`);
        });

  }

  //TODO: Doesnt work yet probably beacuse of the card ID's
  function updateSet() {
    
        const requestBody = JSON.stringify({
            title: set.title,
            setId: set.setId,
            explain: set.explain,
            userId: Number(localStorage.getItem('userId')),
            cards: quizes,
            photo: set.photo,
            liked: 0,
            setStatus: "PUBLIC",
            setCategory: "ENGLISH"
            });

        api.put('/sets', requestBody).then(result => {console.log(result); history.push("/dashboard");}
        ).catch(e=>{
            alert(`Something went wrong while creating user set: \n${handleError(e)}`);
        });
  }

  function goToDashboard() {
    history.push(`/Dashboard`)
  }


    return(
        <div>
            <Header/>
            
            <div id="screen"> 
            <div class="back-button-container">
            <button
              class="back-button"
              onClick={() => {
                goToDashboard();
              }}
            >
              <img class="back-button-image" src={BackButton} />
            </button>
          </div>
                <div id="board_edit">
            

                <div id="pureboard">

                <div id="board_title">
                    <h1>Edit My Set</h1>
                </div>

                <div class="board_contents_edit">
                <form class="editForm">
            
                    <div class="separator">Basic Info</div> 

                   
                    <div id="basic_info">
                        
                        <div id="set_info">
                            <label type>
                                Name of the set<br/>
                                <input type="text" className="set_name" 
                                defaultValue={set.title} maxLength="20"
                                onChange={e => setSet({title: e.target.value, explain: set.explain, userId: set.userId, 
                                                    cards: set.cards, setId: set.setId, photo: set.photo})} />
                            </label>
                            <br/>


                            <label>
                                Description for the set <br/>
                                <input type="text" className="set_des" 
                                defaultValue={set.explain} maxLength="300"
                                onChange={e => setSet({title: set.title, explain: e.target.value, userId: set.userId, 
                                    cards: set.cards, setId: set.setId, photo: set.photo})} />
                            </label>
                            <br/>
                        </div>
                        <div id="set_img_upload">
                            Image for the set
                            <div class="set_img_frame">
                                <div class="img_upload_btn">
                                    +
                                </div>
                            </div>
                        </div>

                    


                        {/*
                        <div class= "add_set_img">
                            <label htmlFor="upload-button">
                                {image.preview ? (
                                <img src={image.preview} alt="dummy" width="300" height="280" />
                                ) : (
                                <>
                                    <span className="fa-stack fa-2x mt-3 mb-2">
                                    <i className="fas fa-circle fa-stack-2x" />
                                    <i className="fas fa-store fa-stack-1x fa-inverse" />
                                    </span>
                                    <h5 className="text-center">Upload your photo</h5>
                                </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />
                            <br />
                            <button onClick={handleUpload}>Upload</button>
    
                        </div>
                        */}
                        

                    </div>
                  
                   

                    <div class="separator">Contents</div> 

                    <div id="contents">

                    {!quizes ? (<div> loading cards </div>) : (
                        <div>
                        {quizes.map(quiz => (
                            <div class="qna">
                                <div class="q_id"> 
                                    {//quiz.id + 1
                                    } 
                                </div>

                                <div class="qna_card">
                                    
                                    <div class="q_title">Question</div>
                                    <div class="q_content">
                                        <textArea type="text" maxLength="130" className="question_text"
                                            onChange={e => quiz.question = e.target.value}
                                        >
                                            {quiz.question}
                                        </textArea>
                                    </div>
                                    <div class="a_title">Answer</div>
                                    <div class="a_content">
                                        <textArea type="text" maxLength="130" className="question_text"
                                            onChange={e => quiz.answer = e.target.value}
                                        >
                                            {quiz.answer}
                                        </textArea>
                                    </div>

                                </div>
                                <div class="throw_card">
                                    Throw this card away
                                    <DeleteForever color="secondary"/>
                                </div>
                            </div>
                            
                        ))} 
                        </div>
                        ) }

                        <div class="new_qna">
                            <div class="add_qna_btn"
                            onClick = {() => {
                                addCard();
                            }}>
                                + Add Card
                            </div>
                        

                            
                        </div>
                        

                    </div>

                    <div class="saveBox">
                        {!editBehavior ? (
                            <div className = "buttonContainer">
                                <button type="button" class="thinButton saveSet" 
                                onClick={()=>{
                                    createSet();
                                }}
                                >Save changes</button>
                            </div>)
                        : (<div className = "buttonContainer">
                                <button type="button" class="thinButton saveSet"
                                onClick={()=>{
                                    updateSet();
                                    console.log("updated");
                                    
                                }}
                                >Save changes</button>
                            </div>)
                        }
                    </div>
            

                    </form>
                    </div>
                </div>
                </div>
                
            </div>
            <Footer></Footer>
        </div>



    );

}

export default withRouter(EditCreateSet); //is default right..?