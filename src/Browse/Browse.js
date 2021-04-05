import { React, Component} from 'react';
import {Route, Link} from 'react-router-dom';
import Genre from '../Genre/Genre';


class Browse extends Component {

    constructor(props){
        super(props);

        this.state = {
            subjects: ['History', 'Fiction', 'Science']
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
            
        return (
            <div>
                <p>Welcome Home {this.props.user}</p>
            <button onClick={this.props.click}>Logout</button>
            {todo}
            <Route path="/history" component={Genre}/>
            <Route path="/fiction" component={Genre}/>
            <Route path="/science" component={Genre}/>
            </div>
        );
    }
}
export default Browse;