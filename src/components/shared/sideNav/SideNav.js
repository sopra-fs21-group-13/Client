import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

function SideNav(props){
    let history = useHistory();

    return(
        
        <div class="sidenav"> 
            <div class= {props.checked==1?"checkedMenuItem":"menuItem"} onClick={() => {
                history.push("dashboard");
            }}>
                Dashboard
            </div>

            <div class={props.checked==2?"checkedMenuItem":"menuItem"} onClick={() => {
                history.push("profile");
            }}>
                Profile
            </div>
            
        </div>
    );
}

export default SideNav; 