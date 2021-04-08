import React, { Component } from 'react';
import axios from 'axios';

//Analytics component, only accessible if the user is ROLE_ADMIN
class Analytics extends Component {

    //initialize state
    state = {
        userTotalSpent: null,
        userTotalSpentOnBooks:null,
        salesIntervalId: null,
        viewsIntervalId: null,
        monthlyStats: null,
        topSales: null,
        topViews: null
    };

    constructor(props){
        super(props);
        
    }

    //instantly call to get the monthly stats, books with most views and most sales
    //topViews and TopSales is on a set interveal every 15 seconds, it calls to 
    //the database again to get the updated values
    componentDidMount = () => {
       this.getUserTotalSpent()
       this.getUserTotalSpentOnBooks()
        this.getMonthlyStats();
        this.getTopViews();
        this.startTopViewsListener();
        this.getTopSales();
        this.startTopSalesListener();
    }
    //before destroying the component, clear both intervals
    componentWillUnmount = () => {
        this.stopTopSalesListener();
        this.stopTopViewsListener();
        return true;
    }

    //gets the amount each user has spent in total
    getUserTotalSpent = () => {
        const headers = {
            'Authorization': this.props.user.token
          }
        axios.get('http://localhost:8080/userTotalSpent', {headers: headers}).then(
            response => {
                this.setState({
                    userTotalSpent: response.data
                });
            }
        );   
    }

    //gets the total amount each user has spent on each book
    getUserTotalSpentOnBooks = () => {
        const headers = {
            'Authorization': this.props.user.token
          }
        axios.get('http://localhost:8080/userTotalSpentOnBooks', {headers: headers}).then(
            response => {
                this.setState({
                    userTotalSpentOnBooks: response.data
                });
            }
        );   
    }

    //gets the books sold for each month
    getMonthlyStats = () => {
        const headers = {
            'Authorization': this.props.user.token
          }
        axios.get('http://localhost:8080/monthlyStats', {headers: headers}).then(
            response => {
                this.setState({
                    monthlyStats: response.data
                });
            }
        );   
    }
    //starts the interval
    startTopViewsListener = () => {
        console.log("IN START VIEWS");
        let id ;
        this.setState({viewsIntervalId: setInterval(this.getTopViews, 15000)});
    }
    //stops the interval
    stopTopViewsListener = () => {
        console.log("IN STOP VIEWS");
        clearInterval(this.state.viewsIntervalId);
    }
    //gets the top 10 most viewed books 
    getTopViews = () => {
        console.log('in getTopVIEWs');
        const headers = {
            'Authorization': this.props.user.token
          }
        axios.get('http://localhost:8080/topViews', {headers: headers}).then(
            response => {
                this.setState({
                    topViews: response.data
                });
            }
        );
        
    }

    //starts the interval
    startTopSalesListener = () => {
        console.log("IN START SALES");
        let id;
        this.setState({salesIntervalId: setInterval(this.getTopSales, 15000)});
    }

    //stops the interval
    stopTopSalesListener = () => {
        console.log("IN STOP SALES");
        clearInterval(this.state.salesIntervalId);
    }

    //gets the books with the most sales
    getTopSales = () => {
        console.log('in getTopSales');
        const headers = {
            'Authorization': this.props.user.token
          }
        axios.get('http://localhost:8080/topSales',{headers: headers}).then(
            response => {
                this.setState({
                    topSales: response.data
                });
            }
        );
 
    }

    render() {
      
        let userSpent = [];

        if(this.state.userTotalSpent != null){

        userSpent= this.state.userTotalSpent.map(
            item =>
                    (<tr><td>{item.username}</td><td>{item.itemsBought}</td><td>{item.postalCode}</td><td>${item.spent.toFixed(2)}</td></tr>)
                
            
        );
        }

    
        let userSpentOnBooks = [];

        if(this.state.userTotalSpentOnBooks != null){

        userSpentOnBooks = this.state.userTotalSpentOnBooks.map(
            item =>
                    (<tr><td>{item.username}</td><td>{item.title}</td><td>{item.author}</td><td>${item.price.toFixed(2)}</td><td>{item.quantity}</td><td>{item.postalCode}</td><td>${item.spent.toFixed(2)}</td></tr>)
                
            
        );
    }
 
       
        let monthlyBooks = [];

        if(this.state.monthlyStats != null){

        monthlyBooks = this.state.monthlyStats.map(
            book =>
                    (<tr><td>{book.bookSold}</td><td>{book.title}</td><td>{book.month}</td></tr>)
                
            
        );
    }

    let topViews = [];


        if(this.state.topViews != null){
            topViews = this.state.topViews.map(
                book =>
                        (<tr><td>{book.userViews}</td><td>{book.title}</td></tr>)
            );
        }

        let topSales = [];


        if(this.state.topSales != null){
            topSales = this.state.topSales.map(
                book =>
                        (<tr><td>{book.booksSold}</td><td>{book.title}</td></tr>)
            );
        }

        return (
            <div className="Analytics">
                <div style= {{marginLeft:"20%", marginRight:"20%",width:"60%", textAlign:"center"}}>
                 <h2>Top Sales (Live)</h2>
                 <table style= {{border:"2px solid black", width:"100%"}}>
                 {topSales}
                 </table>
                 </div>

                 <div style= {{marginLeft:"20%", marginRight:"20%",width:"60%", textAlign:"center"}}>
                 <h2>Top Views (Live)</h2>
                 <table style= {{border:"2px solid black", width:"100%"}}>
                 {topViews}
                 </table>
                 </div>
                <div style= {{marginLeft:"20%", marginRight:"20%",width:"60%", textAlign:"center"}}>
                <h2>Books Sold by Month</h2>
                 <table style= {{border:"2px solid black", width:"100%"}}>
                 <tr><th>Books Sold</th><th>Title</th><th>Month</th></tr>
                    {monthlyBooks}
                 </table>
                 </div>
                 <div style= {{marginLeft:"20%", marginRight:"20%",width:"60%", textAlign:"center"}}>
                <h2>Total Each User Has Spent on Each Book</h2>
                 <table style= {{border:"2px solid black", width:"100%"}}>
                 <tr><th>Username</th><th>Title</th><th>Author</th><th>Price</th><th>Quantity</th><th>Postal Code</th><th>Total Spent</th></tr>
                    {userSpentOnBooks}
                 </table>
                 </div>
                 <div style= {{marginLeft:"20%", marginRight:"20%",width:"60%", textAlign:"center"}}>
                <h2>Total Each User Has Spent in Total</h2>
                 <table style= {{border:"2px solid black", width:"100%"}}>
                 <tr><th>Username</th><th>Total Items Bought</th><th>Postal Code</th><th>Total Spent</th></tr>
                    {userSpent}
                 </table>
                 </div>
            </div>
        );
    }
}
export default Analytics;

