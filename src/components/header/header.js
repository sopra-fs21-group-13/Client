import React, {useState} from 'react'
import "./header.css";
import flashy_h_white from '../shared/images/flashy_h-white.svg';


class Header extends React.Component {
    render(){
        return(
            <div>
                <header>
                        <img 
                        class = "logoImage"
                        src = {flashy_h_white}/>
                </header>
 
            </div>
        );
    }
}
export default Header;