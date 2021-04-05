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
            addReview: false
        }
        console.log(this.getHash());

        
    }

    componentDidMount(){
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
            {addReview: true}
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
        console.log(this.state.book.reviews);
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

        {this.getReviews()}
        <div><button onClick={this.incrementQuantity}>+</button><p>{this.state.quantity}</p><button onClick={this.decrementQuantity}>-</button>  <br></br>
        <button>Add to Cart</button>
        </div>
        <div><button>Add Review</button></div>
        </div>
        );
    }
}
export default BuyBook;

