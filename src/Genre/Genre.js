import { React, Component} from 'react';
import axios from 'axios';
import {Route, Link} from 'react-router-dom';
import Item from './Item/Item';

class Genre extends Component {
    
    constructor(props){
        super(props);

        //books, and allBooks is defined. books is the books shown on the screen
        //while allBooks is all the books from the initial api call
        //having both these state values is important for the searching
        this.state = {
            books:[],
            allBooks: []
        }
    }

    componentDidMount(){
        let url = null;

        //determine the url depending on whether the user is searching for
        //a book or browsing a category
        if(this.getSubjectLowerCase() != "search"){
            //for category
        url = 'https://thebookclub4413.herokuapp.com/getByGenre?genre='+ this.getSubjectLowerCase();
        }
        else{
            //for search
            url = 'https://thebookclub4413.herokuapp.com/getAllBooks';
        }
        this.setState(
            {
                isFetching:true
            });
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

        this.setState(
            {
                isFetching:false
            });
    }


    //what is the subject passed through props in the component?
    //used for the header in the render method
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

    //same as function above but returns lowerCase for the api call
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

    //check if reviews are undefined, if not return the div with all
    //the reviews listed for the book
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

    //searches for book
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


        //defining the search input
        let search = null;
            search = (
                <div>
                    <label>Search Title:</label><input onChange={this.searchBook} type="text"/>
                </div>
            );

            //defines what books to list, uses Item component to list them
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
        <div className="Genre">
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


