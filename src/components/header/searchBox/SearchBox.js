import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import "./searchBox.css";

import { withRouter } from 'react-router-dom';
//import { api, handleError } from "../../helpers/api";

//icons
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';


function SearchBox(){
    return(
        <div class="search-area">
            <div class="search-box">
                <input type="text" placeholder="type to search"></input>
                <div class="search-btn">
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