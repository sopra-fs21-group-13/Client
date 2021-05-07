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


class AboutUs extends React.Component {

    constructor() {
        super();
    }
    

    render(){
        return(
            <div>
                <grid-container>
                    <main>
                        <h1 className ="fragen"> What is Flashy? </h1>
                            <h3 className = "text">
                            Flashy is an application with which users can create digital flashcard stacks.
                            Besides the ordinary capabilities of physical flashcards, flashy offers the ability to share the created stacks with
                            other users, promoting the learning experience using social interaction and creating a good working environment.

                            </h3>
<<<<<<< HEAD
                        <h1 className ="fragen"> Who are we? </h1>
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
=======
                        <h1> Who are we? </h1>
                            <h3>
                            We are students from UZH. The team is made up by Silvan, Nazim, Seonbin, Remus and Kiram.
                            </h3>
>>>>>>> 5cd6ee9f0301bc38992466b983b274d73afefd3d
                    </main>
                    <emptyspace>
                    </emptyspace>
<<<<<<< HEAD
                    <section className="flashy">
                    </section>
=======
                    <header>
                        <Header>
                        </Header>
                    </header>
                    <flashy>

                    </flashy>
>>>>>>> 5cd6ee9f0301bc38992466b983b274d73afefd3d
                </grid-container>
                <Footer>
                </Footer>
            </div>
        );
    }
}
export default withRouter(AboutUs);