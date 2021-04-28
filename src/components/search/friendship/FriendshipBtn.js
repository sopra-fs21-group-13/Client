import './friendshipBtn.css'
import React, { useState } from 'react';

function FriendshipBtn(props) {
    const [isFriend,setFriend]=useState(props.friendship); 
    
    
     if(!isFriend){
         return(
             <div class="green_f">
                 <button onClick={()=>{setFriend(true)}}>
                        Be Friends
                </button>
             </div>
         )
     }
    
    else{
        return(
            <div class="red_f">
                <button onClick={()=>{setFriend(false)}}>
                    Unfriend
                </button>
            </div>
        );

    }
    
  }

  
  export default FriendshipBtn;