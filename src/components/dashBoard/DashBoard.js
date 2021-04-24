import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '../../views/design/Button.js';
import './dashBoard.css';
import SideNav from '../shared/sideNav/SideNav';

//realted to modal
import {Modal} from '../Modal/Modal.js';
import Header from "../header/header.js";



class DashBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            which_menu: "dashBoard",
            setList: this.response,
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
            owner:"yeah",
            liked:102,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        },{
            id:5,
            title: "TOEFL 80+",
            explain: "This set is for people that want to learn some business english. Study well, live well.",
            owner:"hahaha",
            liked:32,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        },
        {
            id:6,
            title: "TOEFL 100+",
            explain: "Aim higher",
            owner:"snowy",
            liked:21,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        },
        {
            id:6,
            title: "TOEFL 100+",
            explain: "Aim higher",
            owner:"snowy",
            liked:21,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        },
        {
            id:6,
            title: "TOEFL 100+",
            explain: "Aim higher",
            owner:"snowy",
            liked:21,
            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
        }
    ]

        
        
    
    async componentDidMount(){
        //This probably won't be implemented with an array. This is placeholder information for the set info.
        //매 순간 업데이트돼야하는 친구들.
        /*
        1. sets that are editted
        2. sets that were deleted should be away from the page
        3. location of 'set to be added'

        - StackId: Long
        - StackName: String
        - OwnerOfFlashCards: User
        - TypeOfFlashcardSet: TypeOfFlashcardSet
        - Playback: Playback
        */
    
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
        //TODO: Route to edit page
    }

    
    

    render(){
        return(
            <div>
                <Header/>
                <SideNav checked={1}/>
                

                {/*     replaced with sideNav component

                <div class="sidenav"> 
                    <div class="checkedMenuItem">
                        Dashboard
                    </div>

                    <div class="menuItem" onClick={() => {
                        this.props.history.push("profile");
                    }}>
                        Profile
                    </div>
                </div>
                */}


                <div id="board"> 
                
                <h1>All Sets You have! </h1>
                    
                    
                    <div id="allSets"> 
                       
                        {this.state.setList.map(res => (
                            <div class="oneSetWrapper">
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
                                        this.goToEditPage();
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
                                    this.props.history.push("learnpage");
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
                                <Button yellow={true} width="35px" >
                                    +
                                </Button>
                        </div>
                        
                    </div>
                    <div class = "findSets">
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Want new sets to join? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>

                </div>
                
                <footer>Footer</footer>
            </div>
        );
    }
}
export default withRouter(DashBoard);