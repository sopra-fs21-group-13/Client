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
                        <h1 className ="fragen"> CONTACT US </h1>
                            <h3> If you have any unanswered questions or would like to get in contact with the creators
                            of this website please fill out the form below. As the website is not constantly monitored
                            it may take a few days to answer but we will try and get back to you as soon as possible!
                            We are always open to new suggestions or any other feedback. </h3>
                            <FeedbackForm>
                            </FeedbackForm>
                    </main>

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