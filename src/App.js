import React, { Component } from 'react';
import './App.css';
import Login from './Login/Login';
import Register from './Register/Register';
import Browse from './Browse/Browse';
import Genre from './Genre/Genre';
import BuyBook from './Genre/BuyBook/BuyBook';
import Analytics from './Analytics/Analytics';
import axios from 'axios';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import ShoppingPage from './shoppingCart/ShoppingPage';
import PaymentPage from './shoppingCart/PaymentPage';

class App extends Component {
//initialize state
  state = {
    cart: [],
    user: {
      username: null,
      password: null
    },
    authuser: {
      authenticated: false,
      username: null,
      token: null,
      tokenExpires: null,
      role: null
    }
  }

  constructor(props) {
    super(props);
    //see if there is an authenticated user in the local storage
   // .log(JSON.parse(sessionStorage.getItem("currCart")));
   let c;
   if(sessionStorage.getItem("currCart")!=null){
    c=JSON.parse(sessionStorage.getItem("currCart"));
    console.log("BOOK: ",c);
   }

   sessionStorage.setItem('counter', 1);
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
          cart: [],
          login: true,
          user: {
            username: authuser.username,
            password: null
          },
          authuser: {
            authenticated: authuser.authenticated,
            username: authuser.username,
            token: authuser.token,
            tokenExpires: authuser.tokenExpires,
            role: authuser.role
          }
        };
        
      }
    }
  }

  //clears password in state after logging in for security reasons 
  clearPassword = () => {
    this.setState({
      user: {
        username: this.state.user.username,
        password: null
      }
    }
    );
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
   login = async () => {
    let loggedin = false;
    console.log('clicked login');
    const headers = {
      'username': this.state.user.username,
      'password': this.state.user.password
    }
     
    try{
      const aa = await axios.post('https://thebookclub4413.herokuapp.com/login', null,
      {
        headers: headers
      }
    );
        //remove the password since we use JWT for Authorization
        this.clearPassword();
        this.setState(
          {
            authuser: {
              authenticated: true,
              username: this.state.user.username,
              token: aa.headers.authorization,
              tokenExpires: aa.headers.expires,
              role: aa.headers.role
            }
          }
        );
        localStorage.setItem("authuser", JSON.stringify(this.state.authuser));
        return true;
    }
    //catch any errors in the request
    catch(err)  {
      console.log(err);
      return false;
    }
      
      
    
      ;
  }

  //function for adding to cart in the BuyBook Component
  //changes the cart value in this state 
  //gets the complete book object and the quantity to order
  addToCart = (book, quantity, username) =>{
    let newCart = [];
    let i;
    //if book is  already in cart,
    // this will be the index of the book in the array
    let pos = -1;

    
    let cCart=JSON.parse(sessionStorage.getItem("currCart"));
    if(cCart !== null){
    for(i=0;i<cCart.length; i++){
      newCart.push(cCart[i]);
      console.log(cCart[i].book.bookId);
      console.log(book.bookId);
      console.log(cCart[i].book.bookId === book.bookId);
      if((cCart[i].book.bookId === book.bookId)
       && (pos < 0)){
          pos = i;
          console.log(pos);
      }
    }
    }
    //if item is already in array just update its quantity value
    if(pos>=0){
      newCart[pos].quantity = newCart[pos].quantity + quantity;
    }
    //otherwise add the book as a new item in the cart
    else{
      newCart.push({book:book, quantity:quantity, username: username});
    }
    this.setState(
      {cart: newCart}
    );
    sessionStorage.setItem("currCart", JSON.stringify(newCart));
    console.log(sessionStorage.getItem("currCart"));
    console.log('cart books:');
    console.log(this.state.cart);
  }

  onDecrement=(bID)=>{
    let c=parseInt(bID);
    let cart = JSON.parse(sessionStorage.getItem("currCart"));
    for (let i = 0; i < cart.length; i++) {
      let book=cart[i];
      if(book.book.bookId===c){
        if(book.quantity>=0){
          book.quantity--;
        }
      }
    }
    this.setState(
      {cart: cart}
    );
    sessionStorage.setItem("currCart", JSON.stringify(cart));
  }
  onIncrement=(bID)=>{
    let c=parseInt(bID);
    let cart = JSON.parse(sessionStorage.getItem("currCart"));
    for (let i = 0; i < cart.length; i++) {
      let book=cart[i];
      if(book.book.bookId===c){
        book.quantity++;
      }
    }
    this.setState(
      {cart: cart}
    );
    sessionStorage.setItem("currCart", JSON.stringify(cart));
  }

  onDelete=(bID)=>{
    let c=parseInt(bID);
    let cart = JSON.parse(sessionStorage.getItem("currCart"));
    let nCart=[];
    for (let i = 0; i < cart.length; i++) {
      let book=cart[i];
      if(book.book.bookId!=c){
        nCart.push(book);
      }
    }
    this.setState(
      {cart: nCart}
    );
    sessionStorage.setItem("currCart", JSON.stringify(nCart));
  }

  getCart=()=>{
    let newCart = [];
    if(sessionStorage.getItem("currCart")!=null){
      return JSON.parse(sessionStorage.getItem("currCart"));
     }
     else{
      sessionStorage.setItem("currCart", JSON.stringify(newCart));
     }
  }

  calcPayment=()=>{
    let cart = JSON.parse(sessionStorage.getItem("currCart"));
    let totalPrice=0;
    for (let i = 0; i < cart.length; i++) {
       totalPrice=totalPrice+cart[i].book.price*cart[i].quantity;
    }
    sessionStorage.setItem("totalPayment", JSON.stringify(totalPrice));
    return totalPrice;
  }
  render() {    

    let loginPath = "/login";
    let loginComponent = (<Login click={this.login} changeuser={this.usernameChangeHandler} changepass={this.passwordChangeHandler} />);
    let registerPath = "/register";
    let registerComponent = (<Register />);

    if(this.state.authuser.authenticated === true){
      loginComponent=(<Browse user={this.state.authuser} cart={this.state.cart} atc={this.addToCart}  click={this.logout} />);
      registerComponent=(<Browse user={this.state.authuser} cart={this.state.cart} atc={this.addToCart}  click={this.logout} />);

    }

    //this determines what component to output, a router will likely replace this code
    let todo = null;
    let logoutLink = null;
    let loginLink = (
        <Link style={{margin:"2px"}} to="/login">
            Login
          </Link>
    );
    let registerLink = (
      <Link style={{margin:"2px"}} to="/register">
          Register
        </Link>
  );
    //if the user is logged in already then go to Browse component, otherwise goes to Login
    // or Register component, depending on the 'login' value in the state
    todo = (
      <Link style={{margin:"2px"}} to="">
        Browse
      </Link>
      );
    if (this.state.authuser.authenticated) {

        logoutLink = (
          <Link to="" style={{margin:"2px"}} onClick={this.logout}>
            Logout
          </Link>
          );

          loginLink = null;
          registerLink= null;
    }
    // else if (this.state.login) {
    //   todo = (
    //   <div>
    //   <Login click={this.login} changeuser={this.usernameChangeHandler} changepass={this.passwordChangeHandler} />
    //   <button onClick={this.toggleLogin}>Switch</button>
    //   </div>
    //   );
    // }
    // else {
    //   todo = (<div>
    //       <Register click={this.toggleLogin}/>
    //       <button onClick={this.toggleLogin}>Switch</button>
    //   </div>
    //     );
    // }
    //return the todo variable into the render. its value is based on the conditionals above
    //console.log("APP:"+this.state.authuser);
    return (
     

      <BrowserRouter>
      <div style={{marginBottom:"10%"}} className="App">
        <h1>The Book Club</h1>
            {todo} {logoutLink}{loginLink}{registerLink}<Link style={{margin:"2px"}} to="/shoppingPage">
            Show Cart
          </Link>
            <Route path={registerPath} render={(props) => registerComponent}/>
            <Route path={loginPath} render={(props) => loginComponent}/>
            <Route path="/" exact render={(props) => <Browse user={this.state.authuser} cart={this.state.cart} atc={this.addToCart}  click={this.logout} />}/>
            <Route path="/browse" render={(props) => <Browse user={this.state.authuser} cart={this.state.cart} atc={this.addToCart}  click={this.logout} />}/>
            <Route path="/shoppingPage" render={(props) => <ShoppingPage cart={this.getCart()} onDecrement={this.onDecrement} onIncrement={this.onIncrement} onDelete={this.onDelete}  totalPayment={this.calcPayment()}/>}/>
            <Route path="/paymentPage" render={(props) => <PaymentPage cart={this.getCart()} totalPayment={this.calcPayment()} user={this.state.authuser}/>}/>
            <Route path="/analytics" render={(props) => <Analytics user={this.state.authuser}/>}/>
            <Route path="/search" render={(props) => <Genre sub="search" />}/>
            <Route path="/history" render={(props) => <Genre sub="history"/>}/>
            <Route path="/fiction" render={(props) => <Genre sub="fiction"/>}/>
            <Route path="/science" render={(props) => <Genre sub="science"/>}/>
            <Route path="/book" render={(props) => <BuyBook item={props} cart={this.state.cart} atc={this.addToCart} user={this.state.authuser}/>}/>
      </div>
      </BrowserRouter>

    );
  }
}

export default App;
