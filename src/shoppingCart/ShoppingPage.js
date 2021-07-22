import React, { Component } from "react";
import axios from 'axios';
import Book from './Book';
import {Route, Link} from 'react-router-dom';
class ShoppingPage extends Component {
 /*   state = {
        showPayment:false
        }
        constructor(props){
            super(props);
            this.state.showPayment=false;
        }*/

/* */ 
      //increments the value in the cart using the state variable
      incrementQuantity = () => {
        let inc = this.state.quantity + 1;
        this.setState(
            {
                quantity: inc
            }
        );
    }

    //decrements the Add to cart quantity if it is > 0
    decrementQuantity = () => {
        if(this.state.quantity === 0) return;
        let inc = this.state.quantity - 1;
        this.setState(
            {
                quantity: inc
            }
        );
    }

    loadPaymentPage = () => {
        if(this.state.quantity === 0) return;
        let inc = this.state.quantity - 1;
        this.setState(
            {
                quantity: inc
            }
        );
    }

    display=()=>{
        if(this.props.cart!=null){
            return(this.props.cart.map(book => (
                <Book
                  key ={book.book.bookId}
                  onDecrement={this.props.onDecrement}
                  onIncrement={this.props.onIncrement}
                  onDelete={this.props.onDelete}
                  book={book.book}
                  quantity={book.quantity} 
                />
              )));
        }
    }
    render(){
        return (
    <div>
            {this.display()}
        <div><h3>TOTAL PAYMENT: ${this.props.totalPayment.toFixed(2)}</h3></div>

        <Link style={{margin:"2px"}} to="/paymentPage">
            <button>Payment</button>
          </Link>

          
      </div>
        );
    }
}
/*   <div>
          
            </div>*/ 
export default ShoppingPage;