import React, { Component } from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';

class Register extends Component {

    state = {
        username: '',
        password: '',
        confirmPassword: '',
        error: false,
        exception:false,
        approved: false
    }

    constructor(props){
        super(props);
    }

    //the next 4 methods all take input from their respective fields and set it to the value
    //in the state
usernameChangeHandler = (event) => {
        
        this.setState({
            username: event.target.value,
            exception:false,
            approved: false
            }
        );
        
}

passwordChangeHandler = (event) => {
    this.setState({
        password: event.target.value,
        exception:false,
        approved: false
        }
    );
    
}

confirmPasswordChangeHandler = (event) => {
    this.setState({
        confirmPassword: event.target.value,
        exception:false,
        approved: false
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
    console.log('tf');
    console.log(tf);
    if(!tf) {
        this.setState({error: true});
        return;
    }
    //if input is ok, send register request to backend
    const body = {
        username: this.state.username,
        password: this.state.password
    }
    if(tf){
        axios.post('http://localhost:8080/register',body
        ).then(
            response => {
                this.clearPassword();
                this.setState({error: false, approved:true, exception:false});
                console.log(response);
            }
        ).catch(
            (err)=>{
                console.log(err);
                this.setState({exception: true});
            }
        );
        ;
    }

    
}




    render(){
        console.log('Rendered state:');
        console.log(this.state);
        //check if there was an error in the login request, if there was then show <p> that says the passwords dont match
        const error = (
            <small style={{fontStyle: "italic", color:"red"}}>Passwords must match</small>
        );
        const exception = (
            <small style={{fontStyle: "italic", color:"red"}}>Username already in use</small>
        );
        let todo = null;
        let redi = null;

        // let regButton = (<Link to="/login"><button type='submit' onClick={this.submitRequestHandler}>Register</button></Link>);
        // if(this.state.password !== this.state.confirmPassword){
        //     regButton = (<button type='submit' onClick={this.submitRequestHandler}>Register</button>);
        // }
        if(this.state.error){
            todo = error;
        }
        if(this.state.exception){
            todo = exception;
        }
        if(this.state.exception=== false && this.state.approved === true){
            redi = (<Redirect to="/login"/>);
        }

        return (
            <div className='Register'>
                <h2>Register</h2>
                <label>Username:</label><input type='text' onChange={this.usernameChangeHandler} /><br></br>
                <label>Password:</label><input type='password' onChange={this.passwordChangeHandler} /><br></br>
                <label>Confirm Password:</label><input type='password' onChange={this.confirmPasswordChangeHandler} /><br></br>
                <button type='submit' onClick={this.submitRequestHandler}>Register</button><br></br>
                {todo}
                {redi}
            </div>
        );
    }
}

export default Register;