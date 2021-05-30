import React from 'react';
import { withRouter } from 'react-router-dom';
import {Button} from '../../views/design/Button.js';
import '../dashBoard/dashBoard.css';
import './AboutUs.css';
import Header from "../header/header.js";
import Footer from '../footer/Footer.js';
import char1 from '../profile/char1.jpg';
import char2 from '../profile/char2.jpg';
import char3 from '../profile/char3.jpg';
import char15 from '../profile/char15.jpg';
import char5 from '../profile/char5.jpg';

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
                            <h3>
                            Flashy is an application with which users can create digital flashcard stacks.
                            Besides the ordinary capabilities of physical flashcards, flashy offers the ability to
                            share the created stacks with other users, promoting the learning experience using social
                            interaction and creating a good working environment. Our vision is to improve the classical
                            learning experience of all users by making learning more fun.
                            </h3>
                        <h1 className ="fragen"> WHO ARE WE? </h1>
                        <div className="item">
                            <img className = "bild" src={char1} />
                            <span className="caption">Nazim</span>
                            <span className="caption">MSc Informatics</span>
                        </div>
                        <div className="item">
                            <img className = "bild" src={char2} />
                            <span className="caption">Seonbin</span>
                            <span className="caption">BSc Informatics</span>
                        </div>
                        <div className="item">
                            <img className = "bild" src={char3} />
                            <span className="caption">Silvan</span>
                            <span className="caption">MSc Geography</span>
                        </div>
                        <div className="item">
                            <img className = "bild" src={char15} />
                            <span className="caption">Remus</span>
                            <span className="caption">BSc Informatics</span>
                        </div>
                        <div className="item">
                            <img className = "bild" src={char5} />
                            <span className="caption">Kiram</span>
                            <span className="caption">BSc Informatics</span>
                        </div>
                        <h3> We are a team of students from UZH who created this project as part of our Software-Praktikum. </h3>
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