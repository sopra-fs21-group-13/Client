import React, { useState } from 'react';
import SideNav from '../shared/sideNav/SideNav';
import './editCreate.css';
import Header from "../header/header.js";

//icon
import { DeleteForever } from '@material-ui/icons';




function EditCreateSet(props){

    //example input set
    const example_set = [
        {title:"Business English",
        info:"This set is for people that want to learn some business english. Study well, live well.",
        owner:"FlashyBoss2003",
        likes:32
    }]

    //example input quizes
    const quizes = [
        {id: 0,
        answer: "Fläche",
        question: "Area"
    },{
        id:1,
        answer: "Unternehmen",
        question: "Business"
    },
    {
        id:2,
        answer: "Mathe",
        question: "Math"
    }];
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: formData
    });
  };


    return(
        <div>
            <Header/>
            
            <div id="screen"> 
                <SideNav checked={1}/>
                <div id="board">
            

                <div id="pureboard">
                <h1>Edit My Set</h1>

                <form class="editForm">
            
                    <div class="separator">Basic Info</div> 

                    {example_set.map(set => (
                    <div id="basic_info">
                        
                        <div id="set_info">
                            <label type>
                                Name of the set<br/>
                                <input type="text" name="set_name" value={set.title} />
                            </label>
                            <br/>


                            <label>
                                Description for the set <br/>
                                <input type="text" name="set_des" value={set.info}/>
                            </label>
                            <br/>

                            <button class="thinButton" type="button" onClick={() => {
                                        this.props.history.push("dashboard");}}>                 
                                Manage class members                   
                            </button>
                        </div>
                        <div id="set_img_upload">
                            Image for the set
                            <div class="set_img_frame">
                                <div class="img_upload_btn">
                                    +
                                </div>


                            </div>
                        </div>

                    


                        {/*
                        <div class= "add_set_img">
                            <label htmlFor="upload-button">
                                {image.preview ? (
                                <img src={image.preview} alt="dummy" width="300" height="280" />
                                ) : (
                                <>
                                    <span className="fa-stack fa-2x mt-3 mb-2">
                                    <i className="fas fa-circle fa-stack-2x" />
                                    <i className="fas fa-store fa-stack-1x fa-inverse" />
                                    </span>
                                    <h5 className="text-center">Upload your photo</h5>
                                </>
                                )}
                            </label>
                            <input
                                type="file"
                                id="upload-button"
                                style={{ display: "none" }}
                                onChange={handleChange}
                            />
                            <br />
                            <button onClick={handleUpload}>Upload</button>
    
                        </div>
                        */}
                        

                    </div>
                    ))}
                   

                    <div class="separator">Contents</div> 

                    <div id="contents">
                        {quizes.map(quiz => (
                            <div class="qna">
                                <div class="q_id"> 
                                    {quiz.id+1} 
                                </div>
                                
                                                    
                        
                                <div class="qna_card">
                                    
                                    <div class="q_title">Question</div>
                                    <div class="q_content">
                                        <input type="text" name="question_text" value={quiz.question}/>
                                    </div>
                                    <div class="a_title">Answer</div>
                                    <div class="a_content">
                                        <input type="text" name="question_text" value={quiz.answer}/>
                                    </div>

                                </div>
                                <div class="throw_card">
                                    Throw this card away
                                    <DeleteForever color="secondary"/>
                                </div>
                            </div>
                        
                        ))}

                        <div class="new_qna">
                            <div class="add_qna_btn">
                                + Add Card
                            </div>
                        

                            
                        </div>
                        

                    </div>

                    <input type="submit" class="thinButton" value="Save changes"/>
                      
            

                    </form>
                </div>
                </div>
                
            </div>

        </div>



    );
}

export default EditCreateSet; //is default right..?