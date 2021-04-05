import { React, Component} from 'react';
import axios from 'axios';
import Item from './Item/Item';

class Genre extends Component {
    //is only returned if the user is logged in.

    
    constructor(props){
        super(props);

        this.state = {
            books:[]
        }
    }

    componentDidMount(){
        console.log(this.props.match.path == "/history");
        let url = 'http://localhost:8080/getByGenre?genre='+ this.getSubjectLowerCase();
        let booksApi = [];
        axios.get(url)
        .then(
        response => {
            console.log(response);
            this.setState(
                {
                    books: response.data
                }
            );
        }
        );


        // axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&maxResults=40')
        // .then(
        // response => {
        //     booksApi = response.data.items;
        //     this.addbooks(booksApi);
        //     //console.log(booksApi);
        // }
        // );

        

    }

    // addbooks = (booksApi) => {
    //     let responseBooks = [];

    //     booksApi.forEach(
    //         (book) => {
    //             let iprice = 0;
    //             if(book.saleInfo.listPrice === undefined){
    //                 iprice =  book.volumeInfo.pageCount * 0.09;
    //             }
    //             else{
    //                 iprice = book.saleInfo.listPrice.amount;
    //             }

    //             let a = null;
    //             if(book.volumeInfo.authors === undefined){
    //                 a =  null;
    //             }
    //             else{
    //                 a = book.volumeInfo.authors[0];
    //             }
    //             let object = {
    //                 title: book.volumeInfo.title,
    //                 genre: "fiction",
    //                 author: a,
    //                 price: iprice,
    //                 image: book.volumeInfo.imageLinks.thumbnail,
    //                 description: book.volumeInfo.description
    //             }
    //             responseBooks.push(
    //                 object
    //             );
    //         }
    //     );

    //     console.log("response Books array");
    //     console.log(responseBooks);
    //     axios.post('http://localhost:8080/addBooks',responseBooks)
    //     .then(
    //         response => {
    //             console.log(response);
    //         }
    //     );

    // }

    getSubject = ()=>{
        
        if(this.props.match.path == "/history"){
            return "History";
        }
        if(this.props.match.path == "/science"){
            return "Science";
        }

        return "Fiction";
        
    }

    getSubjectLowerCase = ()=>{
        
        if(this.props.match.path == "/history"){
            return "history";
        }
        if(this.props.match.path == "/science"){
            return "science";
        }

        return "fiction";
        
    }

    reviewValue = (book)=>{
        if (book.reviews[0] === undefined) return null;
        console.log(book.reviews[0].reviewText);
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

    render(){


        

        let todo = null;
        if(this.state.books != null){
           todo = this.state.books.map(book => 
                (
                <Item item={book} reviews={this.reviewValue(book)}/>
                )
        );
            
        }
        
    return (
        <div>
            <h3>{this.getSubject()} Books</h3>
            {
                todo
            }
        </div>
        );
    }
}

export default Genre;


