import React from "react";
import styled from "styled-components";
import ReactDOM from 'react-dom';
import styles from '../AboutUs/AboutUs.css';
import { withRouter } from 'react-router-dom';

class AboutUs extends React.Component {
    constructor() {
        super();
    }

     render() {
        return (
            <div class="grid-container">
                <main>
                    main
                </main>
                <section class="nom">
                    nom
                </section>
                <section class="yum">
                    yum
                </section>
                <section class="yam">
                    yam
                </section>
                <header>
                    header
                </header>
                <div class = "flashy">

                </div>
            </div>
        );
    }
}

export default withRouter(AboutUs);