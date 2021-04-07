import { React, Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Genre from '../Genre/Genre';
import BuyBook from '../Genre/BuyBook/BuyBook';
import Analytics from '../Analytics/Analytics';


class Browse extends Component {

    constructor(props){
        super(props);

        this.state = {
            subjects: ['Search', 'History', 'Fiction', 'Science']
        }
    }
    

    render(){
        let todo = null;
        
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
        if(this.props.user.role == "ROLE_USER"){
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
            
        return (
            <div>
                <p>Welcome Home {this.props.user.username}</p>
            <button onClick={this.props.click}>Logout</button>
            {analytics}
            {todo}
            <Route path="/analytics" render={(props) => <Analytics/>}/>
            <Route path="/search" render={(props) => <Genre sub="search"/>}/>
            <Route path="/history" render={(props) => <Genre sub="history"/>}/>
            <Route path="/fiction" render={(props) => <Genre sub="fiction"/>}/>
            <Route path="/science" render={(props) => <Genre sub="science"/>}/>
            <Route path="/book" render={(props) => <BuyBook item={props} cart={this.props.cart} atc={this.props.atc} />}/>
            </div>
        );
    }
}
export default Browse;