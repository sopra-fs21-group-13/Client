import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './sideFilter.css';
import SearchBox from "../../header/searchBox/SearchBox";



function SearchFilter(props){
    //current value of the filter
    const [value, setValue] = React.useState(props.view);
    let history = useHistory();



    return(
   
            <div class="searchFilter"> 
            <p>
                <h3>View all</h3>
             </p>    <br/>
{/*  
                 <h2 class="middle-wrapper">View all</h2>
*/}
                <p><h3>Filter</h3></p>
                <p><b> ▶️ Type</b></p>

{/*
                <label class="container">All results
                    <input type="radio" name="radio" 
                        onClick={()=>{
                            history.push("allResults");
                            setValue("all");
                        }}
                        checked={value=="all"}
                    />
                    <span class="checkmark"></span>

                </label><br/>
*/}

                <label class="container">All types
                    <input type="radio" name="radio" 
                        onClick={()=>{
                            history.push("searchusers");
                            setValue("users");
                        }}
                        checked={value=="users"}
                    />
                    <span class="checkmark"></span>

                </label><br/>

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

                </label>

                

                <h4>▶️ keyword</h4>
               


                <div class="middle-wrapper">
                    <input type="text" class="filter-key"/>

                    <br/><br/>

                    <button class="filter-apply-btn">
                        apply
                    </button>
                </div>

            </div>
    );
}

export default SearchFilter; 
