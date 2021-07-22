import React, { Component } from "react";
import axios from 'axios';

class Book extends Component {

    

    render(){
        return (
            <div
            style={{
                backgroundColor:"#fff8dc",
                border: "2px solid black",
                borderRadius: "3%",
                marginLeft: "20%",
                marginRight: "20%",
                marginBottom: "1%",
                marginTop: "1%",
                padding:"1%",
                boxShadow: "10px 10px grey"
                }}
            >

            <img alt="" src={this.props.book.image} style={{
            borderRadius: "10%",
            boxShadow: "3px 3px grey"}}></img>
        <div
            style={{
                border: "2px solid black",
                borderRadius: "15%",
                marginLeft: "20%",
                marginRight: "20%",
                marginBottom: "1%",
                marginTop: "1%",
                padding:"1%",
                fontFamily:"cursive",
                backgroundColor:"white"
            }}> <div>{this.props.book.title} </div><br></br>
            <div><small>by: {this.props.book.author} </small></div><br></br>
        <div><label>Price: $</label> {this.props.book.price*this.props.quantity} </div>
        </div>
        <div><button onClick={() =>this.props.onIncrement(this.props.book.bookId)}>+</button><p>{this.props.quantity}</p>
        <button onClick={() =>this.props.onDecrement(this.props.book.bookId)}>-</button>  
        
        
        <button
          onClick={() => this.props.onDelete(this.props.book.bookId)}
        >
          Delete
        </button>
        <br></br>
        </div>
        </div>
          );
    }

      
}

export default Book;