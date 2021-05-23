import React, {useState} from 'react'
import styled from "styled-components";

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
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import { debounce } from '@material-ui/core';


class DashBoard extends React.Component {

    constructor() {
        super();
        this.state = {
            which_menu: "dashBoard",
            setList: null,
            ownSetList: null,
            foreignSetList: null,
            userSettings: null,
            show: false, //for available Users modal
            user: null,
            showOwnSets: true,
            buttonChecked: true,
            assignSet: null,
            suitableUsers: [],
            windowHeight: window.innerHeight,
            windowWidth: window.innerWidth,
            ownButtonsActive: [],
            foreignButtonsActive: []
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
    }

    handleResize = (e) => {
        this.setState({ windowHeight: window.innerHeight, windowWidth: window.innerWidth});
    };

    //these also stop the background scrolling
    showModal=()=>{
        this.setState({show: true});
        document.body.style.overflow = "hidden"
    };
    hideModal=()=>{
        this.setState({show: false});
        document.body.style.overflow = "unset"
    };

    componentDidUpdate(){
        //for css variables
        let root = document.documentElement;
        var numberOfColumns = 4;
        if(this.state.windowWidth < 1800){
            numberOfColumns = 3;
        }
        if(this.state.windowWidth < 1500){
            numberOfColumns = 2;
        }
        if(this.state.windowWidth < 1000){
            numberOfColumns = 1;
        }
        //changes amount of columns in dashboard depending on window width
        root.style.setProperty('--columnNumbers', numberOfColumns);
    }


    async componentDidMount(){
        // call the api here to load the data from the backend localhost:8080/sets
        //api.get("/sets").then(data=>{
          //  console.log(data);
         // this.state.setList=data["data"];
         // this.setState({...this.state,setList:data["data"]})
        //}).catch(err=>{
        //  console.log(err);
        //})

        //event listener for resize of window
        window.addEventListener("resize", this.handleResize);

        //--> Don't get all sets, but get only the user and his sets
        try{
        const response = await api.get('/users/' + localStorage.getItem('userId'));
        const user = new User(response.data);

        this.setState({setList: user.learnSets, user: user})

        var ownSetList = [];
        var ownSetsButtonsState = [];
        var foreignSetList = [];
        var foreignSetsButtonsState = [];

        for(var i = 0; i<user.learnSets.length; i++){
            if(user.learnSets[i].user == user.userId){
                ownSetList.push(user.learnSets[i]);
                ownSetsButtonsState.push("hidden");
                
            }else{
                foreignSetList.push(user.learnSets[i]);
                foreignSetsButtonsState.push("hidden");
            }
        }

        this.setState({ownSetList: ownSetList, foreignSetList: foreignSetList, ownButtonsActive: ownSetsButtonsState
        , foreignButtonsActive: foreignSetsButtonsState});

        }catch (error) {
            alert(`Something went wrong while fetching the usersets: \n${handleError(error)}`);
        }
    }

      
    componentWillUnmount() {
    window.addEventListener("resize", this.handleResize);
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

    setSuitableUsers(set) {
        api.get('/users/online').then(response => {

            var suitableUsersList = [];
                        
            for(var i=0; i<response.data.length; i++){
                if ((set.members.includes(response.data[i].userId)) && (response.data[i].userId != localStorage.getItem("userId"))){
                    suitableUsersList.push(response.data[i]);
                }
            }
            
            this.setState({suitableUsers: suitableUsersList})   
            console.log(suitableUsersList);
            localStorage.setItem('invitationSetId', set.setId);
        }).catch(error=>{
                alert(`Something went wrong during fetching online users with same learn set: \n${handleError(error)}`);
        })
    }


    activateButton(index){
        var copyButtonArray = [...this.state.ownButtonsActive]
        copyButtonArray[index] = "visible";
        this.setState({ownButtonsActive: copyButtonArray})
    }

    activateForeignButton(index){
        var copyButtonArray = [...this.state.foreignButtonsActive]
        copyButtonArray[index] = "visible";
        this.setState({foreignButtonsActive: copyButtonArray})
    }

    deactivateButton(index){
        var copyButtonArray = [...this.state.ownButtonsActive]
        copyButtonArray[index] = "hidden";
        this.setState({ownButtonsActive: copyButtonArray})
    }

    deactivateForeignButton(index){
        var copyButtonArray = [...this.state.foreignButtonsActive]
        copyButtonArray[index] = "hidden";
        this.setState({foreignButtonsActive: copyButtonArray})
    }
    
    render(){
        return(
            <div id>
                <Header/>
                <div id="board_dash"> 
                <SideNav checked={1}/>

                <div id="pureboard">
                {/*
                <div id="board_title"> {//this should be changeable 
                }
                        <h1>All Sets you have!</h1>
                </div>
                */
                }
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
                        
                        </div>
                            ) : (
                            <div id="allSets"> 
                            
                                {this.state.ownSetList.map((res ,i)=> {
                                    return (
                                    <div class="oneSetWrapper_dashboard" key={i}>
                                        <div className = "cardsContainer">
                                            <div className = "singleSetBorder">
                                                
                                                <div readOnly className = "singleCardPreview cardOne"></div>
                                                <div readOnly className = "singleCardPreview cardTwo"></div>
                                                <div readOnly className = "singleCardPreview cardThree"
                                                onClick={() => {
                                                    //Pushes the set to the set view page
                                                    this.props.history.push({pathname: "overview", userId:this.state.user.userId, clickedSet: res});
                                                }}
                                                onMouseEnter={()=>{
                                                    this.activateButton(i);
                                                }} onMouseLeave ={()=>{
                                                    this.deactivateButton(i);
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
                                                    <button class="iconClear"
                                                        style = {{visibility: this.state.ownButtonsActive[i]}}
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
                                                        style = {{visibility: this.state.ownButtonsActive[i]}}
                                                        onClick = {(event) =>{
                                                            event.stopPropagation();
                                                            this.props.history.push({pathname: "edit", state: {editBehavior: true, set: res}})
                                                        }}
                                                        >
                                                            <div class = "iconEditBox">
                                                                <EditIcon/>
                                                            </div>
                                                        </button>
                                                        <div className = "thumbIconBox">
                                                            <ThumbUpAltOutlinedIcon className = "thumbIcon"/> {res.liked}
                                                        </div>
                                                </div>
                                                
                                            </div>
                                            <div className = "setSizeIndicator"><text>{res.cards.length}</text></div>
                                        </div>
                    
                                        {/*learn button*/}
                                        <div onMouseEnter={()=>{
                                                    this.activateButton(i);
                                                }} onMouseLeave ={()=>{
                                                    this.deactivateButton(i);
                                                }}>
                                        <button style = {{visibility: this.state.ownButtonsActive[i]}} className = "learnButton" width="45%" background="#FFF" onClick={() => {
                                            //Pushes the set to the learn page so it can be displayed.
                                            this.props.history.push({pathname: "learnpage", state: {set: res}});
                                        }} >
                                            Learn
                                        </button>
        
                                        {/*Play button: show modal*/}
                                        <Modal show={this.state.show} handleClose={this.hideModal} currentWindow="dashboard" clickUsers={this.state.suitableUsers}>
                                            <p>Modal</p>
                                        </Modal>
        
                                        <button style = {{visibility: this.state.ownButtonsActive[i]}} className = "playButton" yellow={true} width="45%" onClick={() => {this.setSuitableUsers(res); this.showModal();}}>
                                            Play
                                        </button>
                                        </div>
                                        
                                    </div>
        
                                    
                                    )})}
                                
                                {//card to add create a set
                                }
                                <div class="oneSetWrapper_dashboard">
                                <div className = "cardsContainer">
                                            <div className = "singleSetBorder">
                                                
                                                <div readOnly className = "singleCardPreview cardOne"></div>
                                                <div readOnly className = "singleCardPreview cardTwo"></div>
                                                <div readOnly className = "singleCardPreview newCard"
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
                                                }}
                                                >
                                                    <div className = "newCardPlus">
                                                        <text>
                                                        +
                                                        </text>
                                                    </div>
                                                </div>
                                            </div>
                                            <div><text></text> " "</div>
                                            
                                    </div>
                                    
                                    
                                </div>
                                
                            </div>
                        )}
                    </div>
                ):
                
                (
                    <div>
                    {(!this.state.setList || !this.state.foreignSetList) ? 
                        //Only shows the "add set"- Button before the server request has gone through
                        (<div id= "allSets">
                        
                        </div>
                            ) : (
                            <div id="allSets"> 
                            
                                {this.state.foreignSetList.map((res ,i)=> {
                                    return (
                                    <div class="oneSetWrapper_dashboard" key={i}>
                                        <div className = "cardsContainer">
                                            <div className = "singleSetBorder">
                                                
                                                <div readOnly className = "singleCardPreview cardOne"></div>
                                                <div readOnly className = "singleCardPreview cardTwo"></div>
                                                <div readOnly className = "singleCardPreview cardThree"
                                                onClick={() => {
                                                    //Pushes the set to the set view page
                                                    this.props.history.push({pathname: "overview", userId:this.state.user.userId, clickedSet: res});
                                                }}
                                                onMouseEnter={()=>{
                                                    this.activateForeignButton(i);
                                                }} onMouseLeave ={()=>{
                                                    this.deactivateForeignButton(i);
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
                                                    <button class="iconClear"
                                                        style = {{visibility: this.state.foreignButtonsActive[i]}}
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
                                                        <div className = "thumbIconBox">
                                                            <ThumbUpAltOutlinedIcon className = "thumbIcon"/> {res.liked}
                                                        </div>
                                                </div>
                                                
                                            </div>
                                            <div className = "setSizeIndicator"><text>{res.cards.length}</text></div>
                                        </div>
                    
                                        {/*learn button*/}
                                        <div onMouseEnter={()=>{
                                                    this.activateForeignButton(i);
                                                }}
                                        onMouseLeave ={()=>{
                                                    this.deactivateForeignButton(i);
                                                }}>
                                        <button style = {{visibility: this.state.foreignButtonsActive[i]}} className = "learnButton" width="45%" background="#FFF" onClick={() => {
                                            //Pushes the set to the learn page so it can be displayed.
                                            this.props.history.push({pathname: "learnpage", state: {set: res}});
                                        }} >
                                            Learn
                                        </button>
        
                                        {/*Play button: show modal*/}
                                        <Modal show={this.state.show} handleClose={this.hideModal} currentWindow="dashboard" clickUsers={this.state.suitableUsers}>
                                            <p>Modal</p>
                                        </Modal>
        
                                        <button style = {{visibility: this.state.foreignButtonsActive[i]}} className = "playButton" yellow={true} width="45%" onClick={() => {this.setSuitableUsers(res); this.showModal();}}>
                                            Play
                                        </button>
                                        </div>
                                        
                                    </div>
        
                                    
                                    )})}
                                
                            </div>
                            )}
                    </div>
                
                )}
                    <button class = "findSets" onClick = {() =>{
                                        this.props.history.push({pathname: "searchSets"})
                                    }}
                    >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Want to find new sets or users? &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                    </div>

                </div>
                <Footer></Footer>
            </div>
        );
    }
}
export default withRouter(DashBoard);