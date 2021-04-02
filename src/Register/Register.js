import React, { Component } from "react";
import axios from 'axios';

class Register extends Component {

    state = {
        username: '',
        password: ''
    }

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

submitRequestHandler = () => {
    console.log('clicked register');
    console.log(this.state.username);
    console.log(this.state.password);
    const body = {
        username: this.state.username,
        password: this.state.password
    }
    axios.post('http://localhost:8080/register',body
    ).then(
        response => {
            console.log(response);
            // this.setState({
            //     token: response.headers.authorization
            // });
            // console.log(this.state.token);
        }
    )
    
}

    render(){
        return (
            <div className='Login'>
                <label>Username</label><input type='text' onChange={this.usernameChangeHandler} /><br></br>
                <label>Password</label><input type='password' onChange={this.passwordChangeHandler} /><br></br>
                <button type='submit' onClick={this.submitRequestHandler}>Register</button><br></br>
            </div>
        );
    }
}

export default Register;