import { React, Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Genre from '../Genre/Genre';
import BuyBook from '../Genre/BuyBook/BuyBook';
import Analytics from '../Analytics/Analytics';


class Browse extends Component {

    constructor(props){
        super(props);
        //state defines the subjects, or the name of the links the
        //user can use to find a book, either by browsing a category
        //or by searching a title 
        this.state = {
            subjects: ['Search', 'History', 'Fiction', 'Science']
        }
    }
    

    render(){
        let todo = null;

        //maps all the subjects to links that the router handles
           todo = this.state.subjects.map(sub => 
                (<Link to={"/"+ sub}>
                <div
                style={{
                    backgroundColor:"#fff8dc",
                    border: "2px solid black",
                    borderRadius: "3%",
                    marginLeft: "20%",
                    marginRight: "20%",
                    marginBottom: "1%",
                    marginTop: "3%",
                    padding:"1%",

                    }}
                ><h4>{sub}</h4></div>
                </Link>
                )
        );

        let analytics = null;
        //check the user role, if the user role is Admin, show a "Run Analytics button"
        //this button shows analytics such as: 
                                          //(top ten most sold books),
                                          //(top ten most viewed books)
                                          //(books sold each month)
        if(this.props.user.role == "ROLE_ADMIN"){
            analytics = (
                <Link to="analytics">
                <div
                style={{
                    backgroundColor:"#fff8dc",
                    border: "2px solid black",
                    borderRadius: "3%",
                    marginLeft: "20%",
                    marginRight: "20%",
                    marginBottom: "1%",
                    marginTop: "3%",
                    padding:"1%",

                    }}
                ><h4>Analytics</h4></div>
                </Link>
            );
        }
        let partnerLink = null;

        if(this.props.user.role === "ROLE_PARTNER"){
            partnerLink = (<a href="http://localhost:8080/getAllBooks">Business Partner Link</a>);
        }
        return (
            <div>
                <p>Welcome Home {this.props.user.username}</p>
            <button onClick={this.props.click}>Logout</button><br></br><br></br>
            {partnerLink}
            {analytics}
            {todo}
            <Route path="/analytics" render={(props) => <Analytics user={this.props.user}/>}/>
            <Route path="/search" render={(props) => <Genre sub="search" />}/>
            <Route path="/history" render={(props) => <Genre sub="history"/>}/>
            <Route path="/fiction" render={(props) => <Genre sub="fiction"/>}/>
            <Route path="/science" render={(props) => <Genre sub="science"/>}/>
            <Route path="/book" render={(props) => <BuyBook item={props} cart={this.props.cart} atc={this.props.atc} user={this.props.user}/>}/>
            </div>
        );
    }
}
export default Browse;