import React, { Component } from 'react';
import axios from 'axios';

class Analytics extends Component {

    state = {
        monthlyStats: null,
        topSales: null
    };

    constructor(props){
        super(props);
        
    }

    componentDidMount = () => {
        this.getMonthlyStats();
        this.getTopSales();
    }

    // setInterval(function(){
    //     this.getTopSales()
    // }, 30000);

    getMonthlyStats = () => {
        axios.get('http://localhost:8080/monthlyStats').then(
            response => {
                this.setState({
                    monthlyStats: response.data
                });
            }
        );
    }

    getTopSales = () => {
        axios.get('http://localhost:8080/topSales').then(
            response => {
                this.setState({
                    topSales: response.data
                });
            }
        );
    }

    render() {

        let monthlyBooks = [];
        console.log(this.state.monthlyStats != null);

        if(this.state.monthlyStats != null){

        monthlyBooks = this.state.monthlyStats.map(
            book =>
                    (<tr><td>{book.bookSold}</td><td>{book.title}</td><td>{book.month}</td></tr>)
                
            
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
            <div>
                <div style= {{marginLeft:"20%", marginRight:"20%",width:"60%", textAlign:"center"}}>
                <h2>Books Sold by Month</h2>
                 <table>
                 <tr><th>Books Sold</th><th>Title</th><th>Month</th></tr>
                    {monthlyBooks}
                 </table>
                 </div>

                 <div style= {{marginLeft:"20%", marginRight:"20%",width:"60%", textAlign:"center"}}>
                 <h2>Top Sales</h2>
                 <table>
                 {topSales}
                 </table>
                 </div>
            </div>
        )
    }
}

export default Analytics;

