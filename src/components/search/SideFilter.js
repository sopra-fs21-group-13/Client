import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './sideFilter.css';



function SearchFilter(props){
    //current value of the filter
    const [value, setValue] = React.useState(props.view);
    let history = useHistory();



    return(
   
            <div class="searchFilter"> 

                <h3>Type</h3>

                <label class="container">Sets
                    <input type="radio" name="radio" 
                        onClick={()=>{
                            history.push("searchsets");
                            setValue("sets");
                        }}
                        checked={value=="sets"}
                    />
                  
                    <span class="checkmark"></span>
                </label><br/>

                <label class="container">Users
                    <input type="radio" name="radio" 
                        onClick={()=>{
                            history.push("searchusers");
                            setValue("users");
                        }}
                        checked={value=="users"}
                    />
                    <span class="checkmark"></span>

                </label><br/>

            </div>
    );
}

export default SearchFilter; 
