import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import "./searchBox.css";

import { withRouter } from 'react-router-dom';
//import { api, handleError } from "../../helpers/api";

//icons
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


/*
function SearchBox({keyword, setKeyword, ...props }){
    */
function SearchBox(props){
    const [keyword, setKeyword]=useState();
    return(
        <div class="search-area">
            <div class="search-box">
                <input type="text" placeholder="Search sets/users" onChange={(e) =>setKeyword(e.target.value)}></input> {/*onChange={(e) => setKeyword(e.target.value)*/}
                <div class="search-btn" onClick={() => {
                                                    //Pushes the set to the set view page
                                                    props.history.push({pathname: "searchAll",keyword:keyword})
                                                    console.log(keyword)
                                                }}>
                    {/*
                        클릭시 searchpage로 이동
                    */}
                    {/*
                    <i class="fas fa-search"></i>
                    */}
                    <SearchRoundedIcon/>
                </div>
            </div>
          
        </div>
    );
}
    


export default withRouter(SearchBox);