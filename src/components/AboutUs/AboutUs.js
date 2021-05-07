import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '../../views/design/Button.js';
import '../dashBoard/dashBoard.css';
import SideNav from '../shared/sideNav/SideNav';
import './AboutUs.css';
import Header from "../header/header.js";
import Footer from '../footer/Footer.js'
import char1 from '../profile/char1.jpg'
import char2 from '../profile/char2.jpg'
import char3 from '../profile/char3.jpg'
import char15 from '../profile/char15.jpg'
import char5 from '../profile/char5.jpg'

class AboutUs extends React.Component {

    constructor() {
        super();
    }
    

    render(){
        return(
            <div>
                <grid-container>
                    <header>
                        <Header>
                        </Header>
                    </header>
                    <main>
                        <h1 className ="fragen"> WHAT IS FLASHY? </h1>
                            <h3 className = "text">
                            Flashy is an application with which users can create digital flashcard stacks.
                            Besides the ordinary capabilities of physical flashcards, flashy offers the ability to share the created stacks with
                            other users, promoting the learning experience using social interaction and creating a good working environment.
                            </h3>
                        <h1 className ="fragen"> WHO ARE WE? </h1>
                        <div class="item">
                            <img className = "bild" src={char1} />
                            <span class="caption">Nazim</span>
                            <span class="caption">MSc Informatics</span>
                        </div>
                        <div className="item">
                            <img className = "bild" src={char2} />
                            <span class="caption">Seonbin</span>
                            <span class="caption">BSc Informatics</span>
                        </div>
                        <div className="item">
                            <img className = "bild" src={char3} />
                            <span class="caption">Silvan</span>
                            <span class="caption">MSc Geography</span>
                        </div>
                        <div className="item">
                            <img className = "bild" src={char15} />
                            <span class="caption">Remus</span>
                            <span class="caption">BSc Informatics</span>
                        </div>
                        <div className="item">
                            <img className = "bild" src={char5} />
                            <span class="caption">Kiram</span>
                            <span class="caption">BSc Informatics</span>
                        </div>

                        <h3 className = "text"> We are a team of students from UZH who created this project as part of our Software-Praktium. </h3>
                    </main>
                    <flashy>
                    </flashy>
                </grid-container>
                <Footer>
                </Footer>
            </div>
        );
    }
}
export default withRouter(AboutUs);