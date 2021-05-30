import React, {useState} from 'react'
import { withRouter } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EditIcon from '@material-ui/icons/Edit';
import {Button} from '../../views/design/Button.js';
import '../dashBoard/dashBoard.css';
import SideNav from '../shared/sideNav/SideNav';
import './help.css';
import Header from "../header/header.js";
import Footer from '../footer/Footer.js'


class Help extends React.Component {

    constructor() {
        super();
    }


    render(){
        return(
            <div>
                <grid-container>
                    <main>
                            <h1> FAQ </h1>

                                <h2 className="questions"> What login possibilities exist? </h2>
                                <h3> As a user you can either create an account using your email address or you can use your
                                     Google-Login.</h3>
                                <br></br>
                                <h2 className="questions"> What should I do if I come across any bugs or other problems? </h2>
                                <h3> Please contact the development team. We will be happy to support you solving should
                                     you encounter any issues.</h3>
                                <br></br>
                                <h2 className="questions"> How do I contact the developer team?</h2>
                                <h3> Just click on "contact" in the footer and fill out the contact form. We will
                                     reply as quickly as possible.</h3>
                                <br></br>
                                <h2 className="questions"> Can the game be played by more than two players? </h2>
                                <h3> At the moment the limit is set to 2 players. We are currently working on the development
                                     of a multiplayer option. </h3>

                    </main>
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
export default withRouter(Help);