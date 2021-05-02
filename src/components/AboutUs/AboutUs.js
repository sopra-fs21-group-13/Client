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
import char1 from "../profile/char1.jpg";
import char2 from "../profile/char2.jpg";
import char3 from "../profile/char3.jpg";
import char15 from "../profile/char15.jpg";
import char5 from "../profile/char5.jpg";



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
                        <h1> What is Flashy? </h1>
                            <h3>
                            Flashy is an application with which students (and other users) can create digital flashcard stacks.
                            Besides the ordinary capabilities of physical flashcards, the ability to share the created stacks with
                            other users will be offered by our service, promoting the learning experience using social interaction
                            and creating a good working environment.
                            </h3>
                        <h1> Who are we? </h1>
                        <h3> We are students from UZH. </h3>
                        <div class="item">
                            <img src={char1} />
                            <span class="caption">Nazim</span>
                        </div>
                        <div class="item">
                            <img src={char2} />
                            <span class="caption">Seonbin</span>
                        </div>
                        <div class="item">
                            <img src={char3} />
                            <span class="caption">Silvan</span>
                        </div>
                        <div class="item">
                            <img src={char15} />
                            <span class="caption">Remus</span>
                        </div>
                        <div class="item">
                            <img src={char5} />
                            <span class="caption">Kiram</span>
                        </div>
                    </main>
                    <section class="future">
                    <h3> Future Projects </h3>
                    </section>
                    <section class="uzh">
                        <h3> Link UZH </h3>
                    </section>
                    <emptyspace>
                    </emptyspace>
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