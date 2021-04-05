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
                id:null,
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
                rating: 0,
                reviewText: null
            }
        }
        console.log(this.getHash());

        
    }

    componentDidMount(){
        this.updateBook();
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
        this.setState({
            review: {
              rating: event.target.value,
              reviewText: this.state.review.reviewText
            }
          }
          );
    }

    submitReview = () => {
        const body = {
            bookId: this.state.book.id,
            username: "demo_u",
            review: this.state.review
        }
        axios.post('http://localhost:8080/addReview',body).then(
            (response) => {
                console.log(response);
                this.updateBook();
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
                        boxShadow: "10px 10px grey"
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
        console.log(this.state.addReview);

        let revs = null;

        if(this.state.addReview === true){
            revs = (
                <div>
                    <label>Rating:</label><input type="number" onChange={this.changeRating}/><br></br>
                    <label>Review:</label><textarea onChange={this.changeReviewText}/><br></br>
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
        <div><label>Price:</label> ${this.state.book.price.toFixed(2)} </div>
        </div>
        <div><button onClick={this.incrementQuantity}>+</button><p>{this.state.quantity}</p><button onClick={this.decrementQuantity}>-</button>  <br></br>
        <button>Add to Cart</button>
        </div>
        {this.getReviews()}
        
        <div><button onClick={this.toggleReview}>Add Review</button></div>
        {revs}
        </div>
        );
    }
}
export default BuyBook;

