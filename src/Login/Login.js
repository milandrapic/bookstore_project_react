import React from "react";


const login = props => {
    console.log(props);
        return (
            <div className='Login'>
                <h2>Login</h2>
                <label>Username</label><input type='text' onChange={props.changeuser} /><br></br>
                <label>Password</label><input type='password' onChange={props.changepass} /><br></br>
                <button type='submit' onClick={props.click}>Login</button><br></br>
            </div>
        );
}

export default login;