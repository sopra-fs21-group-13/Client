import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './sideFilter.css';



    
  

function SearchFilter({onClick, currentView}){
    const [value, setValue] = React.useState();

   
    function handleChange(value) {
        setValue({
            value: value
          });
    }


    return(
   
            <div class="searchFilter"> 

                <h3>Type</h3>

                <label class="container">Sets
                    <input type="radio" name="radio" checked= {value=="sets"} /*onClick={onClick}*/ onClick={()=>handleChange("users")}/>
                    <span class="checkmark"></span>
                </label><br/>

                <label class="container">Users
                    <input type="radio" name="radio" checked= {value=="users"} /*onClick={onClick}*/ onClick={()=>handleChange("sets")}/>
                    <span class="checkmark"></span>
                </label><br/>

            </div>
    );
}

export default SearchFilter; 
