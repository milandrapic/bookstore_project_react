import { React, Component} from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import Item from './Item/Item';

class Genre extends Component {
    //is only returned if the user is logged in.

    
    constructor(props){
        super(props);

        this.state = {
            books:[],
            allBooks: []
        }
    }

    componentDidMount(){
        let url = null;
        if(this.getSubjectLowerCase() != "search"){
        url = 'http://localhost:8080/getByGenre?genre='+ this.getSubjectLowerCase();
        }
        else{
            url = 'http://localhost:8080/getAllBooks';
        }
        let booksApi = [];
        axios.get(url)
        .then(
        response => {
            this.setState(
                {
                    books: response.data,
                    allBooks: response.data
                }
            );
        }
        );
    }


    getSubject = ()=>{
        
        if(this.props.sub == "history"){
            return "History";
        }
        if(this.props.sub == "science"){
            return "Science";
        }

        if(this.props.sub == "fiction"){
            return "Fiction";
        }

        return "Search";
        
        
    }

    getSubjectLowerCase = ()=>{
        
        if(this.props.sub == "history"){
            return "history";
        }
        if(this.props.sub == "science"){
            return "science";
        }

        if(this.props.sub == "fiction"){
            return "fiction";
        }

        return "search"
        
    }

    reviewValue = (book)=>{
        if (book.reviews[0] === undefined) return null;
        let todo = null;

           todo = book.reviews.map(review => 
                (
                    <div style={{
                        border: "2px solid grey",
                        marginLeft: "20%",
                        marginRight: "20%",
                        marginBottom: "1%",
                        marginTop: "1%"
                        }}>
                        <label style={{
                            textDecorationLine:'underline'
                            }}>Review</label>
                    <p>Review: {review.reviewText}</p>
                    <p>Rating: {review.rating}/5</p>
                    </div>
                )
        );

        return (
            <div>
                {todo}
                </div>
            );
    }

    searchBook = (event) => {
        let search = event.target.value.toLowerCase();
        let newBooks = [];
        this.state.allBooks.map(
            book => {
                if(book.title.toLowerCase().includes(search)) newBooks.push(book);
            }
        )
        this.setState({
            books: newBooks
        });
    }

    render(){


        let search = null;
        if(this.getSubjectLowerCase() === "search"){
            search = (
                <div>
                    <label>Search Title:</label><input onChange={this.searchBook} type="text"/>
                </div>
            );
        }

        let todo = null;
        if(this.state.books != null){
           todo = this.state.books.map(book =>
                (
                <Link to={"book#" + book.bookId}>
                    <Item item={book} reviews={this.reviewValue(book)}/>
                </Link>
                )
        );
            
        }
        
    return (
        <div>
            <h3>{this.getSubject()} Books</h3>
            {search}
            {
                todo
            }
        </div>
        );
    }
}

export default Genre;


