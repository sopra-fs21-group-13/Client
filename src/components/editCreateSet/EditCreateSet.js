import React, { useState } from 'react';
import SideNav from '../shared/sideNav/SideNav';
import './editCreate.css';




function EditCreateSet(props){

    //example input set
    const example_set = [
        "Business English",
        "This set is for people that want to learn some business english. Study well, live well.",
        "FlashyBoss2003",
        32
    ]

    //example input quizes
    const response = [
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
            <SideNav checked={1}/>

            <div id="board"> 
                <h1>Edit My Set</h1>
            
                <div class="separator">Basic Info</div>
                <div id="basic_info">
                    

                    <div class="formContainer">
                        <form class="editSetInfoForm">

                            <label type>
                                Name of the set<br/>
                                <input type="text" name="set_name" />
                            </label>
                            <br/>
    

                            <label>
                                Description for the set <br/>
                                <input type="text" name="set_des" />
                            </label>
                            <br/>

                        </form>

                        <button class="thinButton" type="button" onClick={() => {
                                    this.props.history.push("dashboard");}}>                 
                            Manage class members                   
                        </button>

                    </div>


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

                </div>

                <div class="separator">Contents</div>
                <div id="contents">
                    

                </div>
            </div>
        </div>



    );
}

export default EditCreateSet; //is default right..?