import { React, Component} from 'react';
import axios from 'axios';

//come to this component after clicking on the item from one of the Genre components
class BuyBook extends Component {
//initialize the props and the state
    constructor(props){
        super(props);
        this.state={
            user: null,
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
//sets the book value of the state after the initial render
    componentDidMount(){
        this.setState(
            {user: this.props.user}
        );
        this.updateBookOnMount();
        console.log(this.props);
    }
    //this one is only called innitially after the page loads so it can
    //get the vallue for the book from the database and also
    //add a view for this book in the database, and wouldn't re add after
    //the addition of a review
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

    //similar to the function above but it doesn't add a view when loading the
    //book from the database, used after a review is added
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

    //tells the database to add a view to the book
    bookView = ()=>{
        axios.post('http://localhost:8080/addView?id=' + this.state.book.bookId).then(
            (response) => {
                console.log(response.data);
            }
        );
    }

    //toggles the addReview state variable, which determines whether or not to show
    //the add review form
    toggleReview = () => {
        this.setState(
            {addReview: !this.state.addReview}
        );
    }

    //gets the bookId from the hash in the url, uses this to 
    //get the book from the database
    getHash = () => {
        let hash = null;
        hash = this.props.item.location.hash.substring(1);
        return hash;
    }

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

    //sets the reviewText value in the state from the review input
    changeReviewText = (event)=> {
        this.setState({
            review: {
              rating: this.state.review.rating,
              reviewText: event.target.value
            }
          }
          );
    }

    //sets the rating value in the state from the rating input
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

    //submits the users review for the book
    submitReview = () => {
        const body = {
            bookId: this.state.book.bookId,
            username: this.state.user.username,
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

    //gets the div with all the review values from the state
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
        <button onClick={() => this.props.atc(this.state.book,this.state.quantity, this.state.user.username)}>Add to Cart</button>
        </div>
        {this.getReviews()}
        
        <div><button onClick={this.toggleReview}>Add Review</button></div>
        {revs}
        </div>
        );
    }
}
export default BuyBook;

