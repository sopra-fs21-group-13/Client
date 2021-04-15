import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '../../views/design/Button.js';
import './dashBoard.css'


class DashBoard extends React.Component {
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
        }]
        
    constructor() {
      super(); 
      this.state = {
          which_menu: "dashBoard",
          setList: this.response
      };
    }

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
        const example_set1 = [
            "Business English",
            "This set is for people that want to learn some business english. Study well, live well.",
            "FlashyBoss2003",
            32
        ]
        const example_set2 = [
            "TOEFL 80+",
            "This set is for people that want to learn some business english. Study well, live well.",
            "hahaha",
            32
        ]
        const example_set3 = [
            "TOEFL 100+",
            "Aim higher",
            "veryNice",
            32
        ]

        //This is a placeholder response from the backend for a GET request. 
        //; List of sets that the user own
        
        
    
    }  
        

    render(){
        return(
            <div>
                
                {
                    //header is now a component
                }

                {/*
                <header>
                        <img 
                        class = "logoImage"
                        src = {flashy_h_white}/>
                </header>
                */}

                <div class="sidenav"> 
                    <div class="checkedMenuItem">
                        Dashboard
                    </div>

                    <div class="menuItem" onClick={() => {
                        this.register();
                    }}>
                        Profile
                    </div>
                </div>


                <div id="board"> 
                <h1>All Sets You have! </h1>
                    
                    
                    <div id="allSets"> 
                       
                        {this.response.map(res => (
                            <div class="oneSetWrapper">
                                <div class="oneSet">
                                    <div class="iconClear">
                                        <ClearIcon/>
                                    </div>
                                    <div class="iconEdit">
                                        <EditIcon/>
                                    </div>
                                    <div class="oneSetImage">
                                        <img src={res.photo} />
                        
                                    </div>
                                    <div class="setTitle">
                                        {res.title}
                                    </div>
                                </div>
                                <Button width="45%" background="#FFF" >
                                    Learn
                                </Button>
                                <Button yellow={true} width="45%" >
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