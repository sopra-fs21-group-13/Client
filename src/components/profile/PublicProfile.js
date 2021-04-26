import React, {useState, useEffect, useCallback} from 'react'
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import Header from "../header/header.js";
import Footer from '../footer/Footer.js'


//icons from google..
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';

import './profile.css'
import SideNav from '../shared/sideNav/SideNav';


const Image = styled.img`
`
Image.defaultProps = {
    src: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
}

export default function PublicProfile(){

    //I changed it to a functional component. Can be reverted anytime. Old code is below!

    const response = 
        {
            username:"Unicorn",
            info: "I like rainbows!",
            likes: 205,
            wins: 30,
            photo: "https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80",
            sets: [
                {
                    id:0,
                    title: "Business English",
                    explain: "This set is for people that want to learn some business english. Study well, live well",
                    owner:"yeah",
                    liked:102,
                    photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
                },{
                    id:5,
                    title: "TOEFL 80+",
                    explain: "This set is for people that want to learn some business english. Study well, live well.",
                    owner:"hahaha",
                    liked:32,
                    photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
                },
                {
                    id:6,
                    title: "TOEFL 100+",
                    explain: "Aim higher",
                    owner:"snowy",
                    liked:21,
                    photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
                },
                {
                    id:6,
                    title: "TOEFL 100+",
                    explain: "Aim higher",
                    owner:"snowy",
                    liked:21,
                    photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
                },
                {
                    id:6,
                    title: "TOEFL 100+",
                    explain: "Aim higher",
                    owner:"snowy",
                    liked:21,
                    photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
                }
            ]
        }


        return(

            <div>
                <Header/>
                
                <div id="board"> 
                <SideNav/>
                <div id="pureboard">
                    <h1> User profile </h1>
                        
                    
                    <div className ="profileCard"> 
                        
                        
                        <div className ="photoFrame">
                            <img src={response.photo} />                            
                        </div>
                            
                            
                        <p className ="profile_username">
                            {response.username}
                        </p>

                        <p className ="likes_wins">
                            <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {response.likes} <span class="winIcon"><EmojiEventsIcon/></span> {response.wins}
                        </p>
                        <p>
                            {response.info}

                        </p>   
                    </div>

                    <div id="allSets"> 
                        {response.sets.map(res => (
                                    <div class="oneSetWrapper">
                                        <div class="oneSet">
                                            
                                            <div class="oneSetImage">
                                                <Image
                                                src={res.photo} />
                                
                                            </div>
                                            <div class="setTitle">
                                                {res.title}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                    </div>
                </div>
                
                </div>
                <Footer>Footer</Footer>
            </div>
        );
    
}