import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import './sideFilter.css';
import SearchBox from "../../header/searchBox/SearchBox";
import BackButton from "../../learnPage/BackButton.png";




function SearchFilter(props){
    function goToDashboard() {
        history.push(`/Dashboard`);
      }
    //current value of the filter
    const [value, setValue] = React.useState(props.view);
    const [keyword, setKeyword]=useState();
    let history = useHistory();

    function valueToPath(){
        if (value=="all"){
            console.log(value);
            history.push({pathname: "searchAll",keyword:keyword})
        }
        else if (value=="users"){
         history.push({pathname: "searchUsers",keyword:keyword})
        }
        else if (value=="sets"){
         history.push({pathname: "searchSets",keyword:keyword})
        }
    }


    return(
   
            <div class="searchFilter"> 
            
                <button
                    class="back-button"
                    onClick={() => {
                    goToDashboard();
                    }}
                >
                    <img class="back-button-image" src={BackButton} />
                </button>
           
            
            <p>
                <h3 class="view-all" onClick={()=> history.push({pathname: "searchAll"})}>View all</h3>
             </p>
{/*  
                 <h2 class="middle-wrapper">View all</h2>
*/}
                <p><h3>Filter</h3></p>
                <p><b> ▶️ Type</b></p>

                <label class="container">All Types
                    <input type="radio" name="radio" 
                        onClick={()=>{
                            history.push("searchall");
                            setValue("all");
                        }}
                        checked={value=="all"}
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
                    <input type="text" class="filter-key" onChange={(e) =>setKeyword(e.target.value)}/>

                    <br/><br/>

                    <button class="filter-apply-btn" onClick={valueToPath}>
                        apply
                    </button>

                    {/*
                    <button class="filter-apply-btn" onClick={() => {
                                                                //Pushes the set to the set view page
                                                                //console.log(value);
                                                               if (value=="all"){
                                                                   console.log(value);
                                                                   history.push({pathname: "searchAll",keyword:keyword})
                                                               }
                                                               else if (value=="users"){
                                                                history.push({pathname: "searchUsers",keyword:keyword})
                                                               }
                                                               else if (value=="sets"){
                                                                history.push({pathname: "searchSets",keyword:keyword})
                                                               }
                                                            }}>
                        apply
                    </button>
                    */}
                </div>

            </div>
    );
}

export default SearchFilter; 
