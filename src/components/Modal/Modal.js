import './modal.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import React, {useState, useEffect} from "react";
import { api, handleError } from '../../helpers/api';
import SocialButton from './Socialbutton';
import User from '../shared/models/User';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

export const users = [
    {
        username:"realUnicorn",
        info: "Rainbows are mine",
        likes: 205,
        wins: 30,
        photo:"https://images-na.ssl-images-amazon.com/images/I/51mBDeh7PcL.jpg"
    },
    {
        username:"Squirrel",
        info: "Where are more nuts??",
        likes: 23,
        wins: 31,
        photo:"https://i.pinimg.com/originals/ea/53/fd/ea53fdd77bfcf158b3015ed93ab39d8a.jpg"
    },
    {
        username:"Kitty",
        info: "I want to be alone",
        likes: 1000,
        wins: 1,
        photo:"https://www.meme-arsenal.com/memes/f04ebf47a09312cbedfca22256c5722d.jpg"
}]


//export const /*erase if not working*/ 
function Modal({ handleClose, show, children, currentWindow, members,mainPageModalTypeSetter, set, ...props }){

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [suitableUsers, setSuitableUsers] = useState([]);
    const [invitedUsers, setInvitedUsers] = useState([]);
    const [setInternal, setSet] = useState(set);

    useEffect(() => {
        console.log(set)
        if (setInternal != null){
            api.get('/users/online').then(response => {

                var suitableUsersList = [];
                         
                for(var i=0; i<response.data.length; i++){
                    if (setInternal.members.includes(response.data[i].userId)){
                        suitableUsersList.push(response.data[i]);
                    }
                }
                
                setSuitableUsers(suitableUsersList);    
                console.log(suitableUsersList);
                }).catch(error=>{
                    alert(`Something went wrong during fetching online users with same learn set: \n${handleError(error)}`);
                })
        }
        
    }, [setInternal])



    async function login(){
        try {
            const requestBody = JSON.stringify({
            username: username,
            password: password,
            });
            const response = await api.post('/users/login', requestBody);
    
            // Get the returned user and update a new object.
            const user = new User(response.data);
    
            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user.userId);
    
            // Login successfully worked --> navigate to the route /dashboard in the GameRouter
            props.history.push(`/dashboard`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    }

    async function register(){
        try {
            const requestBody = JSON.stringify({
            username: username,
            password: password,
            name: name,
            photo: "1"
            });
            const response = await api.post('/users', requestBody);
    
            // Get the returned user and update a new object.
            const user = new User(response.data);
    
            // Store the token into the local storage.
            localStorage.setItem('token', user.token);
            localStorage.setItem('userId', user.userId);
    
            // Register successfully worked --> navigate to the route /dashboard in the GameRouter
            props.history.push(`/dashboard`);
        } catch (error) {
            alert(`Something went wrong during registering: \n${handleError(error)}`);
        }
    }

    //google login
    const handleSocialLogin = (user) => {
        console.log(user)
        let requestBody = {email: user._profile.email, name:`${user._profile.firstName} ${user._profile.lastName}`,
        token:user._token.accessToken 
        }; 
        
        api.post('/users/socialLogin', requestBody).then(Data=>{
        
        const user = new User(Data.data);
        localStorage.setItem('token', user.token);   
        localStorage.setItem('userId', user.userId);
        props.history.push(`/dashboard`);

        }).catch(err=>{
        console.log(err);
        })
    }
    
    const handleSocialLoginFailure = (err) => {
        console.error(err)
    }



  /*where to put?*/
console.log("current window:", currentWindow)
    if(currentWindow == "dashboard"){
        return (
            <div
            className={showHideClassName} >
                <div className = "outside"
                onClick = {() => {
                    handleClose()
                }}>

                </div>
            <section className="modal-main" id="modal_play">
                    <div id="modal_title">
                        Available Users
                    </div>
                    <button onClick={() => {console.log(set)}}>
                        Click me
                    </button>
                    {suitableUsers.map(user => (
                    <div id="modal_content">
                            <div class="userCardModal">
                                    <div class="userBasic">
                                        <div class="photoFrame">
                                            <img src={user.photo} />                            
                                        </div>
                                        <p class="profile_username">
                                            {user.username}
                                        </p>
                                    </div>

                                    <div class="userMore">
                                    <p class="likes_wins">
                                        <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {user.userId} <span class="winIcon"><EmojiEventsIcon/></span> {user.numberOfWins}
                                    </p>
                                    <p>
                                        {user.email}
                                    </p>   
                                    </div>
                                
                                    <div class="invitationButton"> INVITE </div> 
                            </div>
                        {/* {children}*/}
                    </div>
                    ))}
                    
                <button class="closeModal" type="button" onClick={handleClose} >
                Close
                </button>
                
            </section>
            </div>
        );
    }else if(currentWindow == "mainLogin"){
        //This is the modal shown when pressing on register / login on the main page
        return (
            <div className={showHideClassName}>
                <div className = "outside"
                onClick = {() => {
                    handleClose()
                }}>

                </div>
              <section className="modal-main">
                    <div id="modal_title">
                        Login
                    </div>

                    <div className = "contents">
                    <input 
                        className = "input-field"
                        placeholder = "username"
                        onChange={e => {
                            setUsername(e.target.value);
                        }}>

                    </input>
                    <input 
                        className = "input-field"
                        placeholder = "password"
                        onChange={e => {
                            setPassword(e.target.value);
                            }}>
                        
                    </input>
                    <button 
                    disabled={!username || !password}
                    onClick = {() => {
                        login();
                    }}
                    className = "input-button">
                        login
                    </button>

                    <SocialButton
                        provider='google'
                        appId='1068306205440-f2i0rndpgpj7nl9e06pjvf1kjo9eklol.apps.googleusercontent.com'
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                        style={{cursor:"pointer"}}
                        >
                    </SocialButton>

                    <text className = "register-text"
                    onClick = {() => {
                        //switches between register and login modal
                        mainPageModalTypeSetter();
                    }}>
                        Don't have an account yet?
                    </text>
                    </div>
                
              </section>
            </div>
          );
    } else if(currentWindow == "mainRegister"){
        //This is the modal shown when pressing on register / login on the main page
        return (
            <div className={showHideClassName}>
                <div className = "outside"
                onClick = {() => {
                    handleClose()
                }}>

                </div>
              <div className="modal-main">
                    <div id="modal_title">
                        Register
                    </div>

                    <div className = "contents">
                    <input className = "input-field"
                        placeholder = "username"
                        onChange={e => {
                            setUsername(e.target.value);
                        }}>

                    </input>
                    <input className = "input-field"
                        placeholder = "password"
                        onChange={e => {
                            setPassword(e.target.value);
                        }}>
                        
                    </input>
                    <input className = "input-field"
                        placeholder = "Full name"
                        onChange={e => {
                            setName(e.target.value);
                        }}>
                        
                    </input>
                    <button className = "input-button"
                    disabled={!username || !password}
                    onClick = {() => {
                        register();
                    }}>
                        register
                    </button>
                    <SocialButton
                        provider='google'
                        appId='1068306205440-f2i0rndpgpj7nl9e06pjvf1kjo9eklol.apps.googleusercontent.com'
                        onLoginSuccess={handleSocialLogin}
                        onLoginFailure={handleSocialLoginFailure}
                        style={{cursor:"pointer"}}
                        >
                    </SocialButton>

                    <text className = "register-text"
                    onClick = {() => {
                        //switches between register and login modal
                        mainPageModalTypeSetter();
                    }}>
                        Already have an account?
                    </text>

                    </div>
                
              </div>
            </div>
          );
    }
    else if(currentWindow == "overview"){
            return (
                <div
                className={showHideClassName} >
                    <div className = "outside"
                    onClick = {() => {
                        handleClose()
                    }}>
    
                    </div>
                <section className="modal-main" id="modal_play">
                        <div id="modal_title">
                            Learning mates of this set
                        </div>
    
                        {members.map(user => (
                        <div id="modal_content">       
                            
                                <div class="userCardModal">
                                    
    
                                        <div class="userBasic">
                                            <div class="photoFrame">
                                                <img src={user.photo} />                            
                                            </div>
                                            <p class="profile_username">
                                                {user.username}
                                            </p>
                                        </div>
    
                                        <div class="userMore">
                                        <p class="likes_wins">
                                            <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {user.likes} <span class="winIcon"><EmojiEventsIcon/></span> {user.wins}
                                        </p>
                                        <p>
                                            {user.info}
                                        </p>   
                                        </div>
                                    
                                        <div class="invitationButton"> INVITE </div> 
                                </div>
                                
    
                            
                            
                            {/* {children}*/}
                        </div>
                        ))}
                        
                    <button class="closeModal" type="button" onClick={handleClose} >
                    Close
                    </button>
                    
                </section>
                </div>
            );
        
    }
}

export default withRouter(Modal);