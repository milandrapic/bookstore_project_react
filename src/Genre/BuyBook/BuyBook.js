import { React, Component} from 'react';
import axios from 'axios';

class BuyBook extends Component {

    constructor(props){
        super(props);
        this.state={
            book:{
                title:null,
                author:null,
                genre:null,
                price:0,
                bookId:null,
                reviews: [{
                    id: 0,
                    rating: 0,
                    reviewText: null,
                    user:{
                        username: null
                    }
                }],
                image: null
            },
            quantity: 0,
            addReview: false,
            review: {
                rating: 5,
                reviewText: null
            }
        }

        
    }

    componentDidMount(){
        this.updateBookOnMount();
        console.log(this.props);
    }

    updateBookOnMount = () => {
        axios.get('http://localhost:8080/getBookById?id=' + this.getHash()).then(
            (response) => {
                console.log(response.data);
                this.setState({
                    book: response.data
                }) ;
                this.bookView();   
            }
        );
    }
    updateBook = () => {
        axios.get('http://localhost:8080/getBookById?id=' + this.getHash()).then(
            (response) => {
                console.log(response.data);
                this.setState({
                    book: response.data
                }) ;  
            }
        );
    }

    bookView = ()=>{
        console.log('http://localhost:8080/addView?id=' + this.state.book.bookId);
        axios.post('http://localhost:8080/addView?id=' + this.state.book.bookId).then(
            (response) => {
                console.log(response.data);
            }
        );
    }
    toggleReview = () => {
        this.setState(
            {addReview: !this.state.addReview}
        );
    }
    getHash = () => {
        let hash = null;
        hash = this.props.item.location.hash.substring(1);
        return hash;
    }

    incrementQuantity = () => {
        let inc = this.state.quantity + 1;
        this.setState(
            {
                quantity: inc
            }
        );
    }
    decrementQuantity = () => {
        if(this.state.quantity === 0) return;
        let inc = this.state.quantity - 1;
        this.setState(
            {
                quantity: inc
            }
        );
    }

    changeReviewText = (event)=> {
        this.setState({
            review: {
              rating: this.state.review.rating,
              reviewText: event.target.value
            }
          }
          );
    }

    changeRating = (event)=> {
        console.log(event.target.value > 5);
        if(event.target.value > 5) {
            event.target.value=5;
            return;
        }
        this.setState({
            review: {
              rating: event.target.value,
              reviewText: this.state.review.reviewText
            }
          }
          );
    }

    submitReview = () => {
        const jsonString = localStorage.getItem('authuser');
        const authuser = JSON.parse(jsonString);
        const uname = authuser.username;
        const body = {
            bookId: this.state.book.bookId,
            username: uname,
            review: this.state.review
        }
        axios.post('http://localhost:8080/addReview',body).then(
            (response) => {
                console.log(response);
                this.updateBook();
                this.toggleReview();
            }
        );
    }
    getReviews = () => {
        let reviews = [];
        this.state.book.reviews.forEach(
            (review) => {
                reviews.push(
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
                        boxShadow: "5px 5px grey"
                        }}>
                 <h3 style={{textDecorationLine: "underline"}}>{review.user.username}</h3> 
                 <h5>{review.rating}/5</h5>
                 <p style=
                     {{fontFamily: "monospace",
                        fontStyle:"italic"
                    }}
                    >{review.reviewText}</p>
                </div>
                );
            }
        );
        return reviews;
    }

    render(){

        let revs = null;

        if(this.state.addReview === true){
            revs = (
                <div>
                    <label style={{textDecorationLine:"underline"}}>Rating</label><br></br>
                    <input style={{width:"35px", textAlign:'center'}} type="number" min="1" max="5" onChange={this.changeRating}/><br></br>
                    <label style={{textDecorationLine:"underline"}}>Review</label><br></br>
                    <textarea style={{width:"80%", height:'70px', textAlign:'center'}} onChange={this.changeReviewText}/><br></br>
                    <button onClick={this.submitReview}>Submit Review</button>
                </div>
            );
        }

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

            <img alt="" src={this.state.book.image} style={{
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
            }}> <div>{this.state.book.title} </div><br></br>
            <div><small>by: {this.state.book.author} </small></div><br></br>
        <div><label>Price:</label> ${this.state.book.price.toFixed(2)} </div>
        </div>
        <div><button onClick={this.incrementQuantity}>+</button><p>{this.state.quantity}</p><button onClick={this.decrementQuantity}>-</button>  <br></br>
        <button onClick={() => this.props.atc(this.state.book,this.state.quantity)}>Add to Cart</button>
        </div>
        {this.getReviews()}
        
        <div><button onClick={this.toggleReview}>Add Review</button></div>
        {revs}
        </div>
        );
    }
}
export default BuyBook;

