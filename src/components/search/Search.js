import React, { useState } from 'react';
import SideFilter from './SideFilter.js';
import './search.css';
import Header from "../header/header.js";

//icons, default profile img
import FavoriteIcon from '@material-ui/icons/Favorite';
import ProfilePicture from '../shared/images/ProfilePicture.png';



function Search(props){

    //example input set
    const allSets=[
            {
                id:0,
                title: "Business English",
                explain: "This set is for people that want to learn some business english. Study well, live well",
                userId:1,
                liked:102,
                photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
            },{
                id:5,
                title: "TOEFL 80+",
                explain: "This set is for people that want to learn some business english. Study well, live well.",
                userId:2,
                liked:32,
                photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
            },
            {
                id:6,
                title: "TOEFL 100+",
                explain: "Aim higher",
                userId:3,
                liked:21,
                photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
            },
            {
                id:6,
                title: "TOEFL 100+",
                explain: "Aim higher",
                userId:4,
                liked:21,
                photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
            },
            {
                id:6,
                title: "TOEFL 100+",
                explain: "Aim higher",
                userId:5,
                liked:21,
                photo: "https://www.onatlas.com/wp-content/uploads/2019/03/education-students-people-knowledge-concept-P6MBQ5W-1080x675.jpg"
            }
    ]




    return(
        <div>
            <Header/>
            <div id="body"> {/* grid */}
                <SideFilter/>
                <div id="result_board">
                    <div id="board_title"> {/*this should be changeable */}
                        <h1>All Sets</h1>
                    </div>
                    <div id="board_contents"> {/* grid */}
                    {allSets.map((res ,i)=> (
                            <div class="oneSetWrapper" key={i}>
                                <div class="oneSet">
                                    <div class="oneSetImage">
                                        <img src={res.photo} />
                        
                                    </div>
                                    <div class="setTitle">
                                        {res.title}
                                    </div>
                                </div>

                                <div class ="owner_likes">
                                    {/* should be changed to user name(not user ID)*/}
                                    <img src={ProfilePicture}/>{res.userId}
                                    <br/>
                                    <FavoriteIcon/> {res.liked} 
                                </div>

                            </div>

                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Search; //is default right..?