import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
class Login extends Component {

    state = {
        loggedIn : false,
        error: false
    }
    constructor(props){
        super(props);
    }

    login = async ()=>{
        console.log('login method');
        try{
            const call = await this.props.click();
            console.log("start response");
            console.log(call);
            console.log("end response");
            this.setState({
            loggedIn: call,
            error: !call
        });
        }
        catch(err){
            console.log("err");
            console.log(err);
        }
        console.log('post promise');
        // .then(
        // (tf)=>{
        //     let error = !tf;
        // this.setState({
        //     loggedIn: tf,
        //     error: error
        // });
        // });
        // console.log('login end');
    }

//the login form, values stored in the app state
render() {
    console.log('login render');
    console.log(this.state);
    let todo = null;
    let err = null;
    console.log(this.state.loggedIn === true);
    if(this.state.loggedIn === true){
        todo = (<Redirect to="/login"/>);
    }
    if(this.state.error === true){
        err = (<small style={{fontStyle: "italic", color:"red"}}>invalid credentials</small>);
    }
        return (
            <div className='Login'>
                <h2>Login</h2>
                <label>Username</label><input type='text' onChange={this.props.changeuser} /><br></br>
                <label>Password</label><input type='password' onChange={this.props.changepass} /><br></br>
                <button type='submit' onClick={this.login}>Login</button><br></br>
                {todo}
                {err}
            </div>
        );
}
}
export default Login;