import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import Register from './Register/Register';
import Home from './Home/Home';
import axios from 'axios';

class App extends Component {

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
    // this.state = {
    //   login: true,
    //   user: {
    //     username: null,
    //     password: null
    //   },
    //   authuser: {
    //     authenticated: false,
    //     username: null,
    //     token: null,
    //     tokenExpires: null
    //   }
    // }
    const jsonString = localStorage.getItem('authuser');
    console.log(jsonString);
    if (jsonString != null) {
      const authuser = JSON.parse(jsonString);
      console.log(authuser);
      const today = new Date();
      const tokenDate = authuser.tokenExpires;
      const dates = tokenDate.split('-');
      const tdate = new Date(parseInt(dates[0]), parseInt(dates[1]) - 1, parseInt(dates[2]));
      const isNotExpiredToken = (today.getFullYear() <= tdate.getFullYear())
        && (today.getMonth() <= tdate.getMonth())
        && (today.getDate() < tdate.getDate());
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

    //   if(localStorage.getItem('username') != null){
    //   const today = new Date();
    //   console.log(today);
    //   const tokenDate = localStorage.getItem('tokenExpires');
    //   const token = localStorage.getItem("token");
    //   const dates = tokenDate.split('-');
    //   const tdate = new Date(parseInt(dates[0]), parseInt(dates[1])-1, parseInt(dates[2]));
    //   const isNotExpiredToken = (today.getFullYear() <= tdate.getFullYear()) && (today.getMonth() <= tdate.getMonth()) && (today.getDate() < tdate.getDate());
    //   console.log(isNotExpiredToken);
    //   if(isNotExpiredToken){
    //     this.setState({
    //       authuser: {
    //         authenticated: true,
    //         username: localStorage.getItem('username'),
    //         token: token,
    //         tokenExpires: tdate
    //   }
    //     }) 
    //     console.log(this.state.user);
    //   }
    // }

  }

  usernameChangeHandler = (event) => {
    // console.log('------username change------');
    // console.log(this.state.user.username);
    // console.log(this.state.user);
    // console.log('------username change------');
    this.setState({
      user: {
        username: event.target.value,
        password: this.state.user.password
      }
    }
    );

  }

  passwordChangeHandler = (event) => {
    // console.log('------password change------');
    // console.log(this.state.user.username);
    // console.log(this.state.user);
    // console.log('------password change------');
    this.setState({
      user: {
        username: this.state.user.username,
        password: event.target.value
      }
    }
    );

  }

  toggleLogin = () => {
    let logVal = this.state.login;
    this.setState({ login: !logVal });
  }
  logout = () => {
    localStorage.removeItem("authuser");
    // localStorage.removeItem("token");
    // localStorage.removeItem("tokenExpires");
    // localStorage.removeItem("username");
    // localStorage.removeItem("authenticated");
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
        //console.log(this.state.token);
        localStorage.setItem("authuser", JSON.stringify(this.state.authuser));
        // localStorage.setItem("token", this.state.token);
        // localStorage.setItem("tokenExpires", this.state.tokenExpires);
        // localStorage.setItem("username", this.state.username);
        // localStorage.setItem("authenticated", 1);
      }
    ).catch(
      err => {
        console.log(err);
      }
    )
      ;
  }

  render() {
    let todo = null;

    if (this.state.authuser.authenticated) {
      todo = (
      <Home user={this.state.user.username} click={this.logout} />
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

    return (
      <div className="App">
        <h1>Home App</h1>
        {todo}
        
      </div>

    );
  }
}

export default App;
