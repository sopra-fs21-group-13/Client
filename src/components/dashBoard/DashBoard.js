import React, {useState} from 'react'

import { withRouter } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '../../views/design/Button.js';
import './dashBoard.css';
import SideNav from '../shared/sideNav/SideNav';
import {api, handleError} from "../../helpers/api"
import User from '../shared/models/User';

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
            show: false, //for avilable Users modal
            user: null

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
      
        
    
    async componentDidMount(){
        // call the api here to load the data from the backend localhost:8080/sets
        //api.get("/sets").then(data=>{
          //  console.log(data);
         // this.state.setList=data["data"];
         // this.setState({...this.state,setList:data["data"]})
        //}).catch(err=>{
        //  console.log(err);
        //})
        
        //--> Don't get all sets, but get only the user and his sets
        try{
        const response = await api.get('/users/' + localStorage.getItem('userId'));
        const user = new User(response.data);

        this.setState({setList: user.learnSets, user: user})
        }catch (error) {
            alert(`Something went wrong while fetching the usersets: \n${handleError(error)}`);
        }
    }


    //deletes a set from the setList and also from the view.
    deleteSet(index){
        if (window.confirm('Are you sure you want to delete this set?')) {
            // delete it!
            const updatedList = [];
            for(var i = 0; i < this.state.setList.length; i++){
                updatedList.push(this.state.setList[i])
            }
            let set = updatedList[index];
            updatedList.splice(index, 1);

            this.setState({setList: updatedList});

            api.delete('/sets/' + set.setId).then(result => {console.log("deleted set");}
            ).catch(e=>{
                alert(`Something went wrong while deleting user set: \n${handleError(e)}`);
            });
          } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
          }
        
    }

    goToEditPage(){
        this.props.history.push({pathname: "edit", state: {editBehavior: true}});
    }

    goToCreatePage(){
        this.props.history.push({pathname: "edit", state: {editBehavior: false}});
    }

    render(){
        return(
            <div id>
                <Header/>
                <div id="board_dash"> 
                <SideNav checked={1}/>

                <div id="pureboard">
                
                <div id="board_title"> {/*this should be changeable */}
                        <h1>All Sets you have!</h1>
                </div>
                    
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
                                        this.props.history.push({pathname: "edit", state: {editBehavior: true, set: res}})
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
                                    this.props.history.push({pathname: "learnpage", state: {set: res}});
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
                                    const emptySet = 
                                        {
                                            setId: 0,
                                            title: "",
                                            explain: "",
                                            userId:5,
                                            liked:0,
                                            photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg",
                                            cards: [{id: 0, question: "", answer: ""}, {id: 1, question: "", answer: ""}]
                                        }
                                    
                                    
                                    this.props.history.push({pathname: "edit", state: {editBehavior: false, set: emptySet}});
                                }}>
                                    +
                                </Button>
                        </div>
                        
                    </div>
                )}
                    <button class = "findSets" onClick = {() =>{
                                        this.props.history.push({pathname: "searchSets"})
                                    }}
                    >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Want to find new sets to join? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    </div>

                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default withRouter(DashBoard);