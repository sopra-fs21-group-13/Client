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

        var ownSetList = [];
        var foreignSetList = [];

        for(var i = 0; i<user.learnSets.length; i++){
            if(user.learnSets[i].user == user.userId){
                ownSetList.push(user.learnSets[i]);
            }else{
                foreignSetList.push(user.learnSets[i]);
            }
        }

        this.setState({ownSetList: ownSetList, foreignSetList: foreignSetList});

        }catch (error) {
            alert(`Something went wrong while fetching the usersets: \n${handleError(error)}`);
        }
    }


    //deletes a set from the setList and also from the view.
    deleteSet(index){
        if (window.confirm('Are you sure you want to delete this set?')) {
            // delete it!
            const updatedList = [];
            const updatedOwnSetList = [];
            for(var i = 0; i < this.state.setList.length; i++){
                updatedList.push(this.state.setList[i])
                if(this.state.ownSetList.includes(this.state.setList[i])){
                    updatedOwnSetList.push(this.state.setList[i]);
                }
            }
            let set = updatedList[index];
            updatedList.splice(index, 1);
            updatedOwnSetList.splice(this.state.ownSetList.indexOf(this.state.setList[index]),1);

            this.setState({setList: updatedList, ownSetList: updatedOwnSetList});

            api.delete('/sets/' + set.setId).then(result => {console.log("deleted set");}
            ).catch(e=>{
                alert(`Something went wrong while deleting user set: \n${handleError(e)}`);
            });
          } else {
            // Do nothing!
            console.log('Set was not removed');
          }
        
    }

    removeSetFromDashboard(index){
        if (window.confirm('Are you sure you want to remove this set from your dashboard?')) {
        const updatedList = [];
        const updatedForeignSetList = []
            for(var i = 0; i < this.state.setList.length; i++){
                updatedList.push(this.state.setList[i])
                if(this.state.foreignSetList.includes(this.state.setList[i])){
                    updatedForeignSetList.push(this.state.setList[i]);
                }
            }
            let set = updatedList[index];
            updatedList.splice(index, 1);
            updatedForeignSetList.splice(this.state.foreignSetList.indexOf(this.state.setList[index]),1);
            
            this.setState({setList: updatedList, foreignSetList: updatedForeignSetList});

            api.delete('/sets/' + localStorage.getItem("userId")  + "/" + set.setId).then(result => {console.log("deleted set");}
            ).catch(e=>{
                alert(`Something went wrong while deleting user set: \n${handleError(e)}`);
            });
        }else {
            // Do nothing!
            console.log('Set was not removed');
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
                <div className = "setTabContainer">
                    <div className = {this.state.buttonChecked ? "checkedSetTab tabOne" : "setTab tabOne"}
                    onClick={()=>{
                        this.setState({buttonChecked: true, showOwnSets: true});
                    }}>
                        Own Sets
                    </div>
                    <div className = {this.state.buttonChecked ? "setTab tabTwo" : "checkedSetTab tabTwo"}
                    onClick={()=>{
                        this.setState({buttonChecked: false, showOwnSets: false});
                    }}>
                        Foreign Sets
                    </div>
                </div>
                {this.state.showOwnSets ? (
                    <div>
                    {(!this.state.setList || !this.state.ownSetList) ? 
                        //Only shows the "add set"- Button before the server request has gone through
                        (<div id= "allSets">
                        <div class="oneSetWrapper_dashboard">
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
                            </div>
                        </div>
                            ) : (
                            <div id="allSets"> 
                            
                                {this.state.ownSetList.map((res ,i)=> (
                                    
                                    <div class="oneSetWrapper_dashboard" key={i}>
                                        <div class="oneSet"
                                        onClick={() => {
                                            //Pushes the set to the set view page
                                            this.props.history.push({pathname: "overview", userId:this.state.user.userId, clickedSet: res});
                                            
                                        }}>
                                            <button class="iconClear"
                                            onClick = {(event) =>{
                                                event.stopPropagation();
                                                (this.state.ownSetList.includes(res)) ? (
                                                    this.deleteSet(this.state.setList.indexOf(res))
                                                ) : (
                                                    this.removeSetFromDashboard(this.state.setList.indexOf(res))
                                                )
                                                
                                            }
                                            }>
                                                <div class = "iconClearBox">
                                                    <ClearIcon/>
                                                </div>
                                            </button>
                                            <button class="iconEdit"
                                            onClick = {(event) =>{
                                                event.stopPropagation();
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
                                        <Modal show={this.state.show} handleClose={this.hideModal} currentWindow="dashboard" set={res}>
                                            <p>Modal</p>
                                        </Modal>
        
                                        <Button yellow={true} width="45%" onClick={this.showModal}>
                                            Play
                                        </Button>
                                        
                                                    
        
                                    </div>
        
                                    
                                ))}
                                
                                {//card to add create a set
                                }
                                <div class="oneSetWrapper_dashboard">
                                        <div class="oneSet opac" 
                                        onClick = {() => {
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
                                        }}
                                        >
                
                                            <div class="oneSetImage"
                                            >
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
                    </div>
                ):(
                    <div>
                    {!this.state.setList || !this.state.foreignSetList ? 
                        //Only shows the "add set"- Button before the server request has gone through
                        (<div id= "allSets">
                        <div class="oneSetWrapper_dashboard">
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
                            </div>
                        </div>
                            ) : (
                            <div id="allSets"> 
                            
                                {this.state.foreignSetList.map((res ,i)=> (
                                    <div class="oneSetWrapper_dashboard" key={i}>
                                        <div class="oneSet"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            //Pushes the set to the set view page
                                            this.props.history.push({pathname: "overview", userId:this.state.user.userId, clickedSet: res});
                                            console.log(res.setId);
                                            
                                        }}>
                                            <button class="iconClear"
                                            onClick = {(event) =>{
                                                event.stopPropagation();
                                                (this.state.ownSetList.includes(res)) ? (
                                                    this.deleteSet(this.state.setList.indexOf(res))
                                                ) : (
                                                    this.removeSetFromDashboard(this.state.setList.indexOf(res))
                                                )
                                                
                                            }
                                            }>
                                                <div class = "iconClearBox">
                                                    <ClearIcon/>
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
                                        <Modal show={this.state.show} handleClose={this.hideModal} currentWindow="dashboard" set={res}>
                                            <p>Modal</p>
                                        </Modal>
        
                                        <Button yellow={true} width="45%" onClick={this.showModal}>
                                            Play
                                        </Button>
                                        
                                                    
        
                                    </div>
        
                                    
                                ))}
                                
                                
                            </div>
                        )}
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