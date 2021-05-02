import './heartBtn.css'
import React, { useState } from 'react';

function HeartBtn(props) {
    const [isSaved,setSaved]=useState(false); 
    
    
     if(!isSaved){
         return(
             <div class="green_h">
                 <button onClick={()=>{setSaved(true)}}>
                        Save in my dashboard
                </button>
             </div>
         )
     }
    
    else{
        return(
            <div class="red_h">
                <button onClick={()=>{setSaved(false)}}>
                    Unsave
                </button>
            </div>
        )

    }
    
  }

  
  export default HeartBtn;