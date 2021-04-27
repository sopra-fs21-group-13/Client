import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '../../views/design/Button.js';
import './dashBoard.css';
import SideNav from '../shared/sideNav/SideNav';
import {api, handleError} from "../../helpers/api"

//realted to modal
import Modal from '../Modal/Modal.js';
import Header from "../header/header.js";
import Footer from '../footer/Footer.js'



class DashBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            which_menu: "dashBoard",
            setList: null,
            userSettings: null,
            show: false //for avilable Users modal

        };
        this.showModal = this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
    }

    //these also stop the background scrolling
    showModal=()=>{
        this.setState({show: true});
        document.body.style.overflow = "hidden"
    };
    hideModal=()=>{
        this.setState({show: false});
        document.body.style.overflow = "unset"
    };
      
  
    response = [
        {
            id:0,
            title: "Business English",
            explain: "This set is for people that want to learn some business english. Study well, live well",
            userId:1,
            liked:102,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        },{
            id:5,
            title: "TOEFL 80+",
            explain: "This set is for people that want to learn some business english. Study well, live well.",
            userId:2,
            liked:32,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        },
        {
            id:6,
            title: "TOEFL 100+",
            explain: "Aim higher",
            userId:3,
            liked:21,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        },
        {
            id:6,
            title: "TOEFL 100+",
            explain: "Aim higher",
            userId:4,
            liked:21,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        },
        {
            id:6,
            title: "TOEFL 100+",
            explain: "Aim higher",
            userId:5,
            liked:21,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        }
    ]

        
        
    
    async componentDidMount(){
        // call the api here to load the data from the backend localhost:8080/sets
        api.get("/sets").then(data=>{
          //  console.log(data);
         // this.state.setList=data["data"];
         this.setState({...this.state,setList:data["data"]})
        }).catch(err=>{
            console.log(err);
        })
        
    }  

    //deletes a set from the setList and also from the view.
    deleteSet(index){
        const updatedList = [];
        for(var i = 0; i < this.state.setList.length; i++){
            updatedList.push(this.state.setList[i])
        }
        updatedList.splice(index, 1);

        this.setState({setList: updatedList});
    }

    goToEditPage(){
        this.props.history.push({pathname: "edit", state: {editBehavior: true}});
    }

    goToCreatePage(){
        this.props.history.push({pathname: "edit", state: {editBehavior: false}});
    }

    //helper function for testing
    async createNewSetInBackend(){
        try{
            const requestBody = JSON.stringify({
                card: [{
                    question: "Area",
                    answer: "Fläche"
                }]
              });
        }catch(error){
            alert(`Something went wrong during the set creation: \n${handleError(error)}`);
        }
    }

    //creates a set for testing without pushing to backend
    addDummySet(){

        //add user settings for the dummy set
        if(this.state.setList == {} || this.state.userSettings == null){
            const settings = {
                6: {
                    cardsShuffled: false,
                    studyStarred: false,
                    lastCard: 1,
                    markedCards: [
                    ],
                    savedOrder: [
                    ]
                }
            }

            this.setState({userSettings: settings});
        }else{
            const userSettings = this.state.userSettings;
            const settings = {
                    cardsShuffled: false,
                    studyStarred: false,
                    lastCard: 1,
                    markedCards: [
                    ],
                    savedOrder: [
                    ]
            }

            userSettings[6] = settings;
            this.setState({userSettings: userSettings});
        }


        //Add sets to state
        if(this.state.setList == [] || this.state.setList == null){
            const setList = [
                {
                    id:6,
                    title: "TOEFL 100+",
                    explain: "Aim higher",
                    userId:5,
                    liked:21,
                    photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg",
                    cards: [{
                        id: 0,
                        question: "Area",
                        answer: "Fläche"
                    },
                    {
                        id: 1,
                        question: "Politics",
                        answer: "Politik"
                    }
                ]
                }
            ]
            this.setState({setList:setList});
    }else{
        const setList = this.state.setList;
        const set = {
                id:6,
                title: "TOEFL 100+",
                explain: "Aim higher",
                userId:5,
                liked:21,
                photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg",
                cards: [{
                    id: 0,
                    question: "Area",
                    answer: "Fläche"
                },
                {   
                    id: 1,
                    question: "Politics",
                    answer: "Politik"
                }
            ]
            }
        setList.push(set);
        
        this.setState({setList:this.state.setList});
    }
    }
    

    render(){
        return(
            <div id>
                <Header/>
                <div id="board"> 
                <SideNav checked={1}/>

                <div id="pureboard">
                
                <h1>All Sets You have! </h1>
                    
                {!this.state.setList ? 
                //Only shows the "add set"- Button before the server request has gone through
                (<div id= "allSets">
                <div class="oneSetWrapper">
                <div class="oneSet opac">

                    <div class="oneSetImage">
                        <img src="https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg" />
        
                    </div>
                    <div class="setTitle">
                           
                    </div>
                </div>
                <Button 
                yellow={true} width="35px" >
                    +
                </Button>
                <Button yellow={false} width="45%">
                    add dummy set
                </Button>
                    </div>
                </div>
                    ) : (
                    <div id="allSets"> 
                    
                        {this.state.setList.map((res ,i)=> (
                            <div class="oneSetWrapper" key={i}>
                                <div class="oneSet">
                                    <button class="iconClear"
                                    onClick = {() =>{
                                        this.deleteSet(this.state.setList.indexOf(res));
                                    }
                                    }>
                                        <div class = "iconClearBox">
                                            <ClearIcon/>
                                        </div>
                                    </button>
                                    <button class="iconEdit"
                                    onClick = {() =>{
                                        this.props.history.push({pathname: "edit", state: {editBehavior: true, cards: res.cards}})
                                    }}
                                    >
                                        <div class = "iconEditBox">
                                            <EditIcon/>
                                        </div>
                                    </button>
                                    <div class="oneSetImage">
                                        <img src={res.photo} />
                        
                                    </div>
                                    <div class="setTitle">
                                        {res.title}
                                    </div>
                                </div>

                                {/*learn button*/}
                                <Button width="45%" background="#FFF" onClick={() => {
                                    //Pushes the set to the learn page so it can be displayed.
                                    this.props.history.push({pathname: "learnpage", state: {cards: res.cards, userSettings: this.state.userSettings[res.id]}});
                                }} >
                                    Learn
                                </Button>

                                {/*Play button: show modal*/}
                                <Modal show={this.state.show} handleClose={this.hideModal} currentWindow="dashboard">
                                    <p>Modal</p>
                                </Modal>

                                <Button yellow={true} width="45%" onClick={this.showModal}>
                                    Play
                                </Button>
                                
                                            

                            </div>

                            
                        ))}
                        
                       

                        {/* same result as the upper one 
                        {this.state.setList.map(st => (
                            <div>
                            {st.title}
                            </div>
                        ))}
                        */}



                        {//card to add create a set
                        }
                        <div class="oneSetWrapper">
                                <div class="oneSet opac">
        
                                    <div class="oneSetImage">
                                        <img src="https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg" />
                        
                                    </div>
                                    <div class="setTitle">
                                           
                                    </div>
                                </div>
                                <Button yellow={true} width="35px" 
                                onClick = { () => {
                                    const emptySet = [{id: 0, question: "", answer: ""}, {id: 1, question: "", answer: ""}]
                                    this.props.history.push({pathname: "edit", state: {editBehavior: false, cards: emptySet}});
                                }}>
                                    +
                                </Button>
                                <Button yellow={false} width="45%" 
                                onClick = { () => {
                                    this.addDummySet();
                                }}>
                                    add dummy set
                                </Button>
                        </div>
                        
                    </div>
                )}
                    <div class = "findSets">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Want new sets to join? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    </div>

                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default withRouter(DashBoard);