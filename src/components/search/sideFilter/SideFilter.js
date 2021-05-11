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
                <h2>View all</h2>
{/*               
                 <h2 class="middle-wrapper">View all</h2>
*/}
                
                <h2>Filter</h2>
                <h3>Type</h3>

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

                <h3>keyword</h3>
               


                <div class="middle-wrapper">
                    <input type="text" class="filter-key"/>

                    <br/><br/><br/>

                    <button class="filter-apply-btn">
                        apply
                    </button>
                </div>

            </div>
    );
}

export default SearchFilter; 
