import React, { useState, useEffect } from "react";
import SideNav from "../shared/sideNav/SideNav";
import "./editCreate.css";
import Header from "../header/header.js";
import { withRouter, useLocation, useHistory } from "react-router-dom";
import { api, handleError } from "../../helpers/api";
import User from "../shared/models/User";
import Footer from "../footer/Footer.js";
import styled from 'styled-components';

import BackButton from "../learnPage/BackButton.png";

//icon
import { DeleteForever } from "@material-ui/icons";
import { Delete } from "@material-ui/icons";


const DeleteButton = styled.div`
    ${props => props.hoverOverDelete`

    `}
    $:hover {

    }
`

function EditCreateSet(props) {
  //example input set
  const example_set = [
    {
      title: "Business English",
      info: "This set is for people that want to learn some business english. Study well, live well.",
      owner: "FlashyBoss2003",
      likes: 32,
    },
  ];

  //used for routing. Location passes the state from dashboard.
  let location = useLocation();
  let history = useHistory();

  // quizes is the cards
  //createBehavior is used for the save button, so that the request to the backend can act accordingly (old set update or new set creation)
  const [quizes, setQuizes] = useState();
  const [set, setSet] = useState({
    setId: 0,
    title: "",
    liked: 0,
    explain: "",
    userId: 5,
    cards: [
      { id: 0, question: "", answer: "" },
      { id: 1, question: "", answer: "" },
    ],
    photo:
      "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg",
  });
  const [editBehavior, setBehavior] = useState();
  const [cardCounter, setCounter] = useState();
  const [hoverOverDelete, setHoverDelete] = useState([]);

  

  //this is like componentDidMount in classes, happens only once in the beginning
  useEffect(() => {
    setQuizes(location.state.set.cards);
    setSet(location.state.set);
    setBehavior(location.state.editBehavior);
    setCounter(location.state.set.cards.length);

    //prepare the hover array and styles so that each delete button has own animation.
    var prepHoverArray = [];

    for(var i = 0; i<location.state.set.cards.length; i++){
      prepHoverArray.push(false);
    }
    setHoverDelete(prepHoverArray);
    
  }, []);

  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  function addCard() {
    const newCard = { question: "", answer: "" };
    setCounter(cardCounter + 1);
    //clone array
    const set = [...quizes];
    const deleteBools = [...hoverOverDelete];

    set.push(newCard);

    deleteBools.push(false);
    setQuizes(set);
    setHoverDelete(deleteBools);
  }

  function deleteCard(card) {
    //clone array
    var set = [...quizes];
    const deleteBools = [...hoverOverDelete];

    var index = set.indexOf(card);
    set.splice(index,1);
    deleteBools.splice(index,1);
    setQuizes(set);
    setHoverDelete(deleteBools);
  }

  //depending on "createBehavior" state, either one of those is chosen as the onClick of the "save" button.
  function createSet() {
    const requestBody = JSON.stringify({
      title: set.title,
      explain: set.explain,
      user: { userId: localStorage.getItem("userId") },
      cards: quizes,
      photo: set.photo,
      liked: 0,
      setStatus: "PUBLIC",
      setCategory: "ENGLISH",
    });

    api
      .post("/sets", requestBody)
      .then((result) => {
        console.log(result);
        history.push("/dashboard");
      })
      .catch((e) => {
        alert(
          `Something went wrong while updating user set: \n${handleError(e)}`
        );
      });
  }

  //TODO: Doesnt work yet probably beacuse of the card ID's
  function updateSet() {
    const requestBody = JSON.stringify({
      title: set.title,
      setId: set.setId,
      explain: set.explain,
      userId: Number(localStorage.getItem("userId")),
      cards: quizes,
      photo: set.photo,
      liked: 0,
      setStatus: "PUBLIC",
      setCategory: "ENGLISH",
    });

    api
      .put("/sets", requestBody)
      .then((result) => {
        console.log(result);
        history.push("/dashboard");
      })
      .catch((e) => {
        alert(
          `Something went wrong while creating user set: \n${handleError(e)}`
        );
      });
  }

  function goToDashboard() {
    history.push(`/Dashboard`);
  }

  function deleteButtonAnim(event, index){
    var hoverDelete = [...hoverOverDelete];
    hoverDelete[index] = true;
    setHoverDelete(hoverDelete);
  }

  function deleteButtonAnimOff(event, index){
    var hoverDelete = [...hoverOverDelete];
    hoverDelete[index] = false;
    setHoverDelete(hoverDelete);
  }


  return (
    <div>
      <Header />

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
                    <label type class="set_">
                      Name of the set
                      <br />
                      <input
                        type="text"
                        class="set_"
                        defaultValue={set.title}
                        maxLength="20"
                        onChange={(e) =>
                          setSet({
                            title: e.target.value,
                            explain: set.explain,
                            userId: set.userId,
                            cards: set.cards,
                            setId: set.setId,
                            photo: set.photo,
                          })
                        }
                      />
                    </label>
                    <br />

                    <label class="set_">
                      Description for the set <br />
                      <input
                        type="text"
                        class="set_"
                        defaultValue={set.explain}
                        maxLength="300"
                        onChange={(e) =>
                          setSet({
                            title: set.title,
                            explain: e.target.value,
                            userId: set.userId,
                            cards: set.cards,
                            setId: set.setId,
                            photo: set.photo,
                          })
                        }
                      />
                    </label>
                    <br />
                  </div>
                  

            
                </div>

                <div class="separator">Contents</div>

                <div id="contents">
                  {!quizes ? (
                    <div> loading cards </div>
                  ) : (
                    <div>
                      {quizes.map((quiz) => (
                        <div class="qna">
                         

                          <div class="qna_card">
                            <div class="q_title">Question</div>
                            <div class="q_content">
                              <textArea
                                type="text"
                                maxLength="130"
                                className="question_text"
                                onChange={(e) =>
                                  (quiz.question = e.target.value)
                                }
                              >
                                {quiz.question}
                              </textArea>
                            </div>
                            <div class="a_title">Answer</div>
                            <div class="a_content">
                              <textArea
                                type="text"
                                maxLength="130"
                                className="question_text"
                                onChange={(e) => (quiz.answer = e.target.value)}
                              >
                                {quiz.answer}
                              </textArea>
                            </div>
                          </div>
                          <div class="throw_card"
                          
                          >
                            <div className = "throw_card_press_area"
                            onMouseLeave = {(event) => deleteButtonAnimOff(event, quizes.indexOf(quiz))}
                            onMouseEnter = {(event) => deleteButtonAnim(event, quizes.indexOf(quiz))}
                            onClick = {()=>{
                              deleteCard(quiz);
                          }}>Throw this card away
                            {hoverOverDelete[quizes.indexOf(quiz)] ? (<DeleteForever
                                style={{fontSize: 35}}
                                color="secondary"/>)
                                :
                                (<Delete
                                  style={{fontSize: 25}}
                                  color="secondary"/>)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div class="new_qna">
                    <div
                      class="add_qna_btn"
                      onClick={() => {
                        addCard();
                      }}
                    >
                      + Add Card
                    </div>
                  </div>
                </div>

                <div class="saveBox">
                  {!editBehavior ? (
                    <div className="buttonContainer">
                      <button
                        type="button"
                        class="thinButton saveSet"
                        onClick={() => {
                          createSet();
                        }}
                      >
                        Save changes
                      </button>
                    </div>
                  ) : (
                    <div className="buttonContainer">
                      <button
                        type="button"
                        class="thinButton saveSet"
                        onClick={() => {
                          updateSet();
                          console.log("updated");
                        }}
                      >
                        Save changes
                      </button>
                    </div>
                  )}
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
