import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './sideFilter.css';



    
  

function SearchFilter(props){
    const [value, setValue] = React.useState('female');
    const handleChange = (event) => {
      setValue(event.target.value);
    };

    let history = useHistory();

    return(
   
            <div class="searchFilter"> 

                <h3>Type</h3>

                <label class="container">Sets
                    <input type="radio" checked="checked" name="radio"/>
                    <span class="checkmark"></span>
                </label><br/>

                <label class="container">Users
                    <input type="radio" name="radio"/>
                    <span class="checkmark"></span>
                </label><br/>

            </div>
    );
}

export default SearchFilter; 
