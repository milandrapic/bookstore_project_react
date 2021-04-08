import React from "react";
import {Link} from 'react-router-dom';

//the login form, values stored in the app state
const login = props => {
    console.log(props);
        return (
            <div className='Login'>
                <h2>Login</h2>
                <label>Username</label><input type='text' onChange={props.changeuser} /><br></br>
                <label>Password</label><input type='password' onChange={props.changepass} /><br></br>
                <Link to="/"><button type='submit' onClick={props.click}>Login</button></Link>
            </div>
        );
}

export default login;