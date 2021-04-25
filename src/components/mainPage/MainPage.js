import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import Header from "../header/header.js";

import './mainPage.css'
import {Button} from '../../views/design/Button.js';

//realted to modal
import {Modal} from '../Modal/Modal.js';



class MainPage extends React.Component {

    constructor() {
        super(); 
        this.state = {
            /*
            which_menu: "dashBoard",
            setList: this.response,
            show: false //for avilable Users modal
            */
           show: false,
           modalLogin: true,
        };
        
        this.showModal = this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        
    }


    //different modal functions to handle the two different modals.
    showModal=()=>{
        this.setState({show: true});
    };
    hideModal=()=>{
        this.setState({show: false});
    };

    setModalToLogin=()=>{
        this.setState({modalLogin: true});
    }

    setModalToRegister=()=>{
        this.setState({modalLogin: false});
    }
      
    async componentDidMount(){

    }  
    


    render(){
        //handles the modal
        const modalBehavior = this.state.show ? this.hideModal : this.showModal;
        //decides which modal to show
        const modalType = this.state.modalLogin ? "mainLogin" : "mainRegister";
        //passes the right function to the modal, so that it can change between register and login modal from inside the modal directly
        const modalTypeSetter = this.state.modalLogin ? this.setModalToRegister : this.setModalToLogin;
        return(
            <div>
                <Header
                    setMainModalLogin = {this.setModalToLogin}
                    buttonBehavior = {modalBehavior}
                />
                <div class="imgFrame">
                    <img 
                    class="mainImg"
                    src="https://myupdatestar.com/wp-content/uploads/2017/07/6359186186123742401525610068_o-college-students-in-group-facebook-1.jpg"
                    />
                </div>

                <button class="startButton" type="button" onClick={() => {
                    this.setModalToRegister();
                    this.setState({show: true});
                    }}>                 
                Let's Start!                    
                </button>

                <div id="fishingBox">
                    <div class="ment"> Start with public sets for you! </div>
                    <div class="fakeSets">
                        <div class="oneSet">      
                            <div class="oneSetImage">
                                <img src="https://myupdatestar.com/wp-content/uploads/2017/07/6359186186123742401525610068_o-college-students-in-group-facebook-1.jpg" />
                
                            </div>
                            <div class="setTitle">
                                TOEFL 120
                            </div>
                        </div>
                        <div class="oneSet">      
                            <div class="oneSetImage">
                                <img src="https://myupdatestar.com/wp-content/uploads/2017/07/6359186186123742401525610068_o-college-students-in-group-facebook-1.jpg" />
                
                            </div>
                            <div class="setTitle">
                                Hello World
                            </div>
                        </div>
                        <div class="oneSet">      
                            <div class="oneSetImage">
                                <img src="https://myupdatestar.com/wp-content/uploads/2017/07/6359186186123742401525610068_o-college-students-in-group-facebook-1.jpg" />
                
                            </div>
                            <div class="setTitle">
                                Business English
                            </div>
                        </div>
                        <div class="oneSet">      
                            <div class="oneSetImage">
                                <img src="https://myupdatestar.com/wp-content/uploads/2017/07/6359186186123742401525610068_o-college-students-in-group-facebook-1.jpg" />
                
                            </div>
                            <div class="setTitle">
                                Amazing React
                            </div>
                        </div>
                        

                    </div>

                </div>
                
                <Modal show={this.state.show} handleClose={this.hideModal} currentWindow={modalType} 
                        mainPageModalTypeSetter = {modalTypeSetter}
                >
                                    <p>Modal</p>
                </Modal>

                
                
                
                
                <footer>Footer</footer>
            </div>
        );
    }
}
export default withRouter(MainPage);