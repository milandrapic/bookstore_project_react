import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import Register from './Register/Register';
import Browse from './Browse/Browse';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';


class App extends Component {
//initialize state
  state = {
    login: true,
    user: {
      username: null,
      password: null
    },
    authuser: {
      authenticated: false,
      username: null,
      token: null,
      tokenExpires: null
    }
  }

  constructor(props) {
    super(props);
    //see if there is an authenticated user in the local storage
    const jsonString = localStorage.getItem('authuser');
    console.log(jsonString);
    //if there is a user check to see if its token has expired or not
    if (jsonString != null) {
      const authuser = JSON.parse(jsonString);
      console.log(authuser);
      const today = new Date();
      const tokenDate = authuser.tokenExpires;
      const dates = tokenDate.split('-');
      //token date
      const tdate = new Date(parseInt(dates[0]), parseInt(dates[1]) - 1, parseInt(dates[2]));
      //boolean value, return true if token date is valid
      const isNotExpiredToken = (today.getFullYear() <= tdate.getFullYear())
        && (today.getMonth() <= tdate.getMonth())
        && (today.getDate() < tdate.getDate());
        //if there is a token that is still valid, update the state to add the local storage auth user values
      if (isNotExpiredToken) {
        this.state = {
          login: true,
          user: {
            username: authuser.username,
            password: null
          },
          authuser: {
            authenticated: authuser.authenticated,
            username: authuser.username,
            token: authuser.token,
            tokenExpires: authuser.tokenExpires
          }
        };
        console.log(this.state.authuser);
      }
    }
  }
// gets the value of the username form the login component username input, and sets it to the state
  usernameChangeHandler = (event) => {
    this.setState({
      user: {
        username: event.target.value,
        password: this.state.user.password
      }
    }
    );

  }
// gets the value of the password form the login component password input, and sets it to the state
  passwordChangeHandler = (event) => {
    this.setState({
      user: {
        username: this.state.user.username,
        password: event.target.value
      }
    }
    );

  }
//sets boolean value in the state which determines if it should show the Login or register page
  toggleLogin = () => {
    let logVal = this.state.login;
    this.setState({ login: !logVal });
  }

  //used in the Home component to log a user out. removes the local storage variable and resets the state
  logout = () => {
    localStorage.removeItem("authuser");

    this.setState(
      {
        user: {
          username: null,
        },
        authuser: {
          authenticated: false,
          username: null,
          token: null,
          tokenExpires: null
        } 
      }
    )
  }
//used in the login component, logs the user in
  login = () => {
    console.log('clicked login');
    console.log(this.state.user.username);
    console.log(this.state.user.password);
    const headers = {
      'username': this.state.user.username,
      'password': this.state.user.password
    }
    axios.post('http://localhost:8080/login', null,
      {
        headers: headers
      }
    ).then(
      //if successful login, update the state and the local storage
      response => {
        console.log(response);
        this.setState(
          {
            authuser: {
              authenticated: true,
              username: this.state.user.username,
              token: response.headers.authorization,
              tokenExpires: response.headers.expires
            }
          }
        );
        localStorage.setItem("authuser", JSON.stringify(this.state.authuser));
      }
    )
    .catch(
      //catch any errors in the request
      err => {
        console.log(err);
      }
    )
      ;
  }

  render() {
    //this determines what component to output, a router will likely replace this code
    let todo = null;
    //if the user is logged in already then go to home component, otherwise goes to Login
    // or Register component, depending on the 'login' value in the state
    if (this.state.authuser.authenticated) {
      todo = (
      <Browse user={this.state.user.username} click={this.logout} />
        );
    }
    else if (this.state.login) {
      todo = (
      <div>
      <Login click={this.login} changeuser={this.usernameChangeHandler} changepass={this.passwordChangeHandler} />
      <button onClick={this.toggleLogin}>Switch</button>
      </div>
      );
    }
    else {
      todo = (<div>
          <Register />
          <button onClick={this.toggleLogin}>Switch</button>
      </div>
        );
    }
    //return the todo variable into the render. its value is based on the conditionals above
    return (
      <BrowserRouter>
      <div style={{marginBottom:"10%"}} className="App">
        <h1>Home App</h1>
        {todo}
        
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
