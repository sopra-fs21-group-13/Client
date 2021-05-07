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
import FeedbackForm from './contactform.js'


class Contact extends React.Component {

    constructor() {
        super();
    }


    render(){
        return(
            <div>
                <grid-container>
                    <main>
                        <h1 className ="fragen"> Contact Form </h1>
                            <h3> If you have any unanswered questions or would like to get in contact with the creators of this website
                            please fill out the form below. </h3>
                            <h3 className = "text"> We will try and get back to you as soon as possible! </h3>
                    </main>
                    <section class="feedback">
                    <FeedbackForm>
                    </FeedbackForm>
                    </section>
                    <section class="emptyspace">
                    </section>
                    <header>
                        <Header>
                        </Header>
                    </header>
                    <section class="flashy">

                    </section>
                </grid-container>
                <Footer>
                </Footer>
            </div>
        );
    }
}
export default withRouter(Contact);