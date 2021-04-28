import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '../../views/design/Button.js';
import '../dashBoard/dashBoard.css';
import SideNav from '../shared/sideNav/SideNav';
import './contact.css';
import Header from "../header/header.js";
import Footer from '../footer/Footer.js'


class Contact extends React.Component {

    constructor() {
        super();
    }


    render(){
        return(
            <div>
                <grid-container>
                    <main>
                    <textBox>
                        <h1> Contact Form </h1>
                            <h3> If you have any unanswered questions or would like to get in contact with the creators of this website
                            please fill out the form below. </h3>
                            <h3> We will try and get back to you as soon as possible. </h3>

                    </textBox>
                    </main>
                    <section class="future">
                        <h1> Current Version </h1>
                    </section>
                    <section class="uzh">
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
export default withRouter(Contact);