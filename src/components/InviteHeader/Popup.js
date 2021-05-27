import React from 'react';
import { withRouter } from 'react-router-dom';
import {Button} from '../../views/design/Button.js';
import './Popup.css'
function Popup(props) {
    return (props.trigger) ? (
        <div>
            <div className="textContainer">
                <Button className = "btn" onClick={() => {props.setTrigger(false)}}>close</Button>
                {props.children}
            </div>
        </div>
    ) : "";

}

export default Popup;