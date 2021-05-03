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
                        <h1> What is Flashy? </h1>
                            <h3>
                            Flashy is an application with which students (and other users) can create digital flashcard stacks.
                            Besides the ordinary capabilities of physical flashcards, the ability to share the created stacks with
                            other users will be offered by our service, promoting the learning experience using social interaction
                            and creating a good working environment.
                            </h3>
                        <h1> Who are we? </h1>
                            <h3>
                            We are students from UZH. The team is made up by Silvan, Nazim, Seonbin, Remus and Kiram.
                            </h3>
                    </main>
                    <section class="future">
                    <h3> Future Projects </h3>
                    </section>
                    <section class="uzh">
                        <h3> Link UZH </h3>
                    </section>
                    <emptyspace>
                    </emptyspace>
                    <header>
                        <Header>
                        </Header>
                    </header>
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