import './modal.css';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import React, {useState, useEffect} from "react";
import { api, handleError } from '../../helpers/api';
import SocialButton from './Socialbutton';
import User from '../shared/models/User';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import Invite from '../InviteHeader/invite.js'

//profile pictures
import char1 from "../profile/char1.jpg";
import char2 from "../profile/char2.jpg";
import char3 from "../profile/char3.jpg";
import char4 from "../profile/char4.jpg";
import char5 from "../profile/char5.jpg";
import char6 from "../profile/char6.jpg";
import char7 from "../profile/char7.jpg";
import char8 from "../profile/char8.jpg";
import char9 from "../profile/char9.jpg";
import char10 from "../profile/char10.jpg";
import char11 from "../profile/char11.jpg";
import char12 from "../profile/char12.jpg";
import char13 from "../profile/char13.jpg";
import char14 from "../profile/char14.jpg";
import char15 from "../profile/char15.jpg";
import char16 from "../profile/char16.jpg";

//export const /*erase if not working*/ 
function Modal({ handleClose, show, children, currentWindow, members,mainPageModalTypeSetter, clickUsers, ...props }){

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [suitableUsers, setSuitableUsers] = useState(clickUsers);
    const [invitedPlayers, setInvitedPlayers] = useState([]);
    const [lastTime, setLastTime] = useState(30);
    const [lastCard, setLastCard] = useState(10);

    //handles showing the right user picture
    const [userPicturesDict, setUserPicturesDict] = useState({1: char1, 2: char2, 3: char3, 4: char4, 5: char5, 6: char6,
        7: char7, 8: char8, 9: char9,10: char10, 11: char11, 12: char12,13: char13, 14: char14, 15: char15, 16: char16});
    const [currentPic, setCurrentPic] = useState();

    let history = useHistory();

    const [time] = useState([
        {value: 30},
        {value: 60},
        {value:120}
    ]);

    const [numberCards] = useState([
        {value: 10},
        {value: 20},
        {value: 30}
    ]);

    useEffect(() => { 
        setSuitableUsers(clickUsers);
        setInvitedPlayers([]);
    },[clickUsers])

    useEffect(() => {
        setInvitedPlayers([]);
    }, [handleClose])


    async function invite(){
        try {
            console.log('functionWorks')
            const requestBody = JSON.stringify({
            inviter: {userId: Number(localStorage.getItem("userId"))},
            playSetId: Number(localStorage.getItem('invitationSetId')),
            gameSettings: {
                time: Number(lastTime),
                numberOfCards: Number(lastCard),
                numberOfPlayers: 2 
            },
            countDown: 'false'  
            });
            console.log('createdJSON');
            // Create a Game instance
            const gameResponse = await api.post('/games', requestBody);
            console.log('gameCreated');
            const invitedPlayersId =[];
            for (var i=0; i < invitedPlayers.length; i++) {
                invitedPlayersId.push({'userId': invitedPlayers[i].userId})
            }

            // Get Set for the set title
            const setResponse = await api.get('/sets/' + localStorage.getItem('invitationSetId'));
            
            // Get User for the userName
            const userResponse = await api.get('/users/' + localStorage.getItem('userId'));      

            console.log(invitedPlayersId);
            const invitation = JSON.stringify({
                gameId: Number(gameResponse.data.gameId),
                sentFromUserName: userResponse.data.username,
                sentFromId: Number(gameResponse.data.inviter.userId),
                receivers: invitedPlayersId,
                setTitle: setResponse.data.title,
                gameSetting:{gameSettingId: Number(gameResponse.data.gameSettings.gameSettingId)}
                });
            
            await api.post('/games/invitations', invitation);
            history.push('/game/' + Number(gameResponse.data.gameId));

        } catch (error){
            alert(`Something went sending the Invitation(s): \n${handleError(error)}`);
        }
    }

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

    function addPlayers(invitedPlayer){
        try{ 
            if (!invitedPlayers.includes(invitedPlayer)){
                var players = [...invitedPlayers];
                players.push(invitedPlayer);
                setInvitedPlayers(players);
            }else{
                var playersDelete = [...invitedPlayers]
                var index = playersDelete.indexOf(invitedPlayer);
                playersDelete.splice(index, 1);
                setInvitedPlayers(playersDelete)
            }
        } catch (error) {
            alert(`Something went wrong during adding players to invitation: \n${handleError(error)}`);
        }
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
                        Invitation
                    </div>
                    <div class='section_title'>
                        Available Users
                    </div>
                    {suitableUsers.map((user, i)=> (
                    <div id="modal_content" >
                        <div key={i} 
                            onClick={()=> {addPlayers(user);
                                console.log(invitedPlayers);}} 
                            className={invitedPlayers.includes(user) ? 'userCardModalSelected' : 'userCardModal'} >
                            <div class="userBasic">
                                <div class="photoFrame">
                                    <img src={userPicturesDict[Number(user.photo)]} />                            
                                </div>
                                <p class="profile_username">
                                    {user.username}
                                </p>
                            </div>
                            <div class="userMore">
                                <p class="likes_wins">
                                    <span class="thumbIcon"><ThumbUpAltOutlinedIcon/></span> {user.liked}
                                    <span class="winIcon"><EmojiEventsIcon/></span> {user.numberOfWins}
                                </p>
                                <p>
                                    {user.email}
                                </p>   
                            </div>
                            <div class="invitationButton"> INVITE </div>
                        </div>
                    </div>
                    ))}
                {/* 
                <div class='section_title'>
                Game Settings
                </div>
                <div class='selectContainer'>
                    <div class='select_time'>
                        <div class='selectTitle'>
                            Select Time in Seconds:
                        </div>
                        <div class = 'custom-select'>
                        <select>
                            {time.map((t,i)=>(
                                <option
                                    key={i}
                                    value={t.value}
                                    onClick={() => setLastTime(t.value)}
                                >
                                    {t.value}
                                </option>
                            ))}
                        </select>
                        <span class='custom-arrow'></span>
                        </div>
                    </div>

                    <div class='select_cards'>
                            <div class='selectTitle'>
                                Select Number of Cards:
                            </div>
                        <div class='custom-select'>     
                            <select>
                                {numberCards.map((card,i)=>(
                                    <option
                                        key={i}
                                        value={card.value}
                                        onClick={() => setLastCard(card.value)}
                                    >
                                        {card.value}
                                    </option>
                                ))}
                            </select>
                            <span class='custom-arrow'></span>
                        </div>
                    </div>
                </div>
                */}     
                 
                <button class="closeModal" type="button" onClick={handleClose} >
                    Close
                </button>

                <button class='sendInvite' onClick={() => invite()}>
                    Send Invitation
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
                        type = "password"
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
                        type = "password"
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