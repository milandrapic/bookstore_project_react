import React, { Component } from "react";
import axios from 'axios';

class Register extends Component {

    state = {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        error: false,
        success: false
    }

    constructor(props){
        super(props);
    }

    //the next 4 methods all take input from their respective fields and set it to the value
    //in the state
usernameChangeHandler = (event) => {
        
        this.setState({
            username: event.target.value
            }
        );
        
}

passwordChangeHandler = (event) => {
    this.setState({
        password: event.target.value
        }
    );
    
}

emailChangeHandler = (event) => {
    this.setState({
        email: event.target.value
        }
    );
}

confirmPasswordChangeHandler = (event) => {
    this.setState({
        confirmPassword: event.target.value
        }
    );
}

clearPassword = () => {
    this.setState({
        password: null,
        confirmPassword: null
        }
    );
}

//this is the register request method, executes when the register button is clicked
submitRequestHandler = () => {
    console.log('clicked register');
    console.log(this.state);
    const pw = this.state.password;
    const confpw = this.state.confirmPassword;
    //check if the password and confirmed password are the same,
    //if different set the value of error (in state) to true. and end method before http request
    const tf = pw === confpw
    if(!tf) {
        this.setState({error: true});
        return;
    }
    //if input is ok, send register request to backend
    this.setState({error: false});
    const body = {
        username: this.state.username,
        password: this.state.password
    }
    axios.post('http://localhost:8080/register',body
    ).then(
        response => {
            this.clearPassword();
            console.log(response);
        }
    );

    
}




    render(){
        //check if there was an error in the login request, if there was then show <p> that says the passwords dont match
        const error = (
            <p>Passwords don't match</p>
        );
        let todo = null;
        if(this.state.error){
            todo = error
        }
        return (
            <div className='Register'>
                <h2>Register</h2>
                <label>Email</label><input type='email' onChange={this.emailChangeHandler} /><br></br>
                <label>Username</label><input type='text' onChange={this.usernameChangeHandler} /><br></br>
                <label>Password</label><input type='password' onChange={this.passwordChangeHandler} /><br></br>
                <label>Password</label><input type='password' onChange={this.confirmPasswordChangeHandler} /><br></br>
                <button type='submit' onClick={this.submitRequestHandler}>Register</button><br></br>
                {todo}
            </div>
        );
    }
}

export default Register;