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
                    <textBox>
                        <h1> What is Flashy? </h1>
                            <h3> Founded in 2008, Stack Overflow’s public platform is used by nearly everyone who codes to learn, share their knowledge, collaborate, and build their careers.

                                 Whether it’s on Stack Overflow or within Stack Overflow for Teams, community is at the center of all that we do. </h3>
                        <h1> Who are we? </h1>
                            <h3> Founded in 2008, Stack Overflow’s public platform is used by nearly everyone who codes to learn, share their knowledge, collaborate, and build their careers.

                                 Whether it’s on Stack Overflow or within Stack Overflow for Teams, community is at the center of all that we do. </h3>
                    </textBox>
                    </main>
                    <section class="nom">
                        <h1> Future Projects </h1>
                    </section>
                    <section class="yum">
                        <h1> Link UZH </h1>
                    </section>
                    <section class="emptyspace">
                    </section>
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