import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';

import './mainPage.css'
import {Button} from '../../views/design/Button.js';

//realted to modal
import {Modal} from '../modal/Modal.js';



class MainPage extends React.Component {

    constructor() {
        super(); 
        this.state = {
            /*
            which_menu: "dashBoard",
            setList: this.response,
            show: false //for avilable Users modal
            */
        };
        
        this.showModal = this.showModal.bind(this);
        this.hideModal=this.hideModal.bind(this);
        
    }

    showModal=()=>{
        this.setState({show: true});
    };
    hideModal=()=>{
        this.setState({show: false});
    };
      
  


        
        
    
    async componentDidMount(){

    
    }  
    

    render(){
        return(
            <div>
                <div class="imgFrame">
                    <img 
                    class="mainImg"
                    src="https://myupdatestar.com/wp-content/uploads/2017/07/6359186186123742401525610068_o-college-students-in-group-facebook-1.jpg"
                    />
                </div>

                <button class="startButton" type="button" onClick={() => {
                                    this.props.history.push("dashboard");}}>                 
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

                
                
                
                <footer>Footer</footer>
            </div>
        );
    }
}
export default withRouter(MainPage);