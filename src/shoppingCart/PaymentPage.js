import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from 'axios';
class PaymentPage extends Component {
    _isMounted = false;

    state = {
        declined: false,
        success:false,
        showPage: false,
        billingInfo: {
            declined: true,
            type: "billing",
            firstName: "",
            lastName: "",
            city: "",
            province: "",
            country: "",
            postalCode: "",
            phoneNumber: ""
        },
        shippingInfo: {
            type: "shipping",
            firstName: "",
            lastName: "",
            city: "",
            province: "",
            country: "",
            postalCode: "",
            phoneNumber: ""
        },
        uInf:"",
        hasInfo:false
        }

    constructor(props){
        super(props);
        this.state.showPage=false;
        

        
    }

    componentDidMount() {
        this._isMounted = true;
    };
    componentWillUnmount() {
        this._isMounted = false;
      }
    billingHandler = (event) => {
        this.setState({
        defaultBilling: event.target.value
            }
        );
    }
    shippingCityHandler = (event) => {
        let newCity=event.target.value;
        this.setState({
            shippingInfo: {
                type: "shipping",
                firstName: this.state.shippingInfo.firstName,
                lastName: this.state.shippingInfo.lastName,
                city: newCity,
                province: this.state.shippingInfo.province,
                country: this.state.shippingInfo.country,
                postalCode: this.state.shippingInfo.postalCode,
                phoneNumber: this.state.shippingInfo.phoneNumber
            }
                }
        );
    }
    billingCityHandler = (event) => {
        let newCity=event.target.value;
        this.setState({
            billingInfo: {
                type: "billing",
                firstName: this.state.billingInfo.firstName,
                lastName: this.state.billingInfo.lastName,
                city: newCity,
                province: this.state.billingInfo.province,
                country: this.state.billingInfo.country,
                postalCode: this.state.billingInfo.postalCode,
                phoneNumber: this.state.billingInfo.phoneNumber
            }
                }
        );
    }
    billingFirstNameHandler = (event) => {
        let value=event.target.value;
        this.setState({
            billingInfo: {
                type: "billing",
                firstName: value,
                lastName: this.state.billingInfo.lastName,
                city: this.state.billingInfo.city,
                province: this.state.billingInfo.province,
                country: this.state.billingInfo.country,
                postalCode: this.state.billingInfo.postalCode,
                phoneNumber: this.state.billingInfo.phoneNumber
            }
                }
        );
    }
    shippingFirstNameHandler = (event) => {
        let value=event.target.value;
        this.setState({
            shippingInfo: {
                type: "shipping",
                firstName: value,
                lastName: this.state.shippingInfo.lastName,
                city: this.state.shippingInfo.city,
                province: this.state.shippingInfo.province,
                country: this.state.shippingInfo.country,
                postalCode: this.state.shippingInfo.postalCode,
                phoneNumber: this.state.shippingInfo.phoneNumber
            }
                }
        );
    }

    shippingLastNameHandler = (event) => {
        let value=event.target.value;
        this.setState({
            shippingInfo: {
                type: "shipping",
                firstName: this.state.shippingInfo.firstName,
                lastName: value,
                city: this.state.shippingInfo.city,
                province: this.state.shippingInfo.province,
                country: this.state.shippingInfo.country,
                postalCode: this.state.shippingInfo.postalCode,
                phoneNumber: this.state.shippingInfo.phoneNumber
            }
                }
        );
    }
    billingLastNameHandler = (event) => {
        let value=event.target.value;
        this.setState({
            billingInfo: {
                type: "billing",
                firstName: this.state.billingInfo.firstName,
                lastName: value,
                city: this.state.billingInfo.city,
                province: this.state.billingInfo.province,
                country: this.state.billingInfo.country,
                postalCode: this.state.billingInfo.postalCode,
                phoneNumber: this.state.billingInfo.phoneNumber
            }
                }
        );
    }
        billingProvinceHandler = (event) => {
            let value=event.target.value;
            this.setState({
                billingInfo: {
                    type: "billing",
                    firstName: this.state.billingInfo.firstName,
                    lastName: this.state.billingInfo.lastName,
                    city: this.state.billingInfo.city,
                    province: value,
                    country: this.state.billingInfo.country,
                    postalCode: this.state.billingInfo.postalCode,
                    phoneNumber: this.state.billingInfo.phoneNumber
                }
                    }
            );
        }
        shippingProvinceHandler = (event) => {
            let value=event.target.value;
            this.setState({
                shippingInfo: {
                    type: "shipping",
                    firstName: this.state.shippingInfo.firstName,
                    lastName: this.state.shippingInfo.lastName,
                    city: this.state.shippingInfo.city,
                    province: value,
                    country: this.state.shippingInfo.country,
                    postalCode: this.state.shippingInfo.postalCode,
                    phoneNumber: this.state.shippingInfo.phoneNumber
                }
                    }
            );
        }
        shippingCountryHandler = (event) => {
            let value=event.target.value;
            this.setState({
                shippingInfo: {
                    type: "shipping",
                    firstName: this.state.shippingInfo.firstName,
                    lastName: this.state.shippingInfo.lastName,
                    city: this.state.shippingInfo.city,
                    province: this.state.shippingInfo.province,
                    country: value,
                    postalCode: this.state.shippingInfo.postalCode,
                    phoneNumber: this.state.shippingInfo.phoneNumber
                }
                    }
            );
        }
        billingCountryHandler = (event) => {
            let value=event.target.value;
            this.setState({
                billingInfo: {
                    type: "billing",
                    firstName: this.state.billingInfo.firstName,
                    lastName: this.state.billingInfo.lastName,
                    city: this.state.billingInfo.city,
                    province: this.state.billingInfo.province,
                    country: value,
                    postalCode: this.state.billingInfo.postalCode,
                    phoneNumber: this.state.billingInfo.phoneNumber
                }
                    }
            );
        }

        shippingPostalCodeHandler = (event) => {
            let value=event.target.value;
            this.setState({
                shippingInfo: {
                    type: "shipping",
                    firstName: this.state.shippingInfo.firstName,
                    lastName: this.state.shippingInfo.lastName,
                    city: this.state.shippingInfo.city,
                    province: this.state.shippingInfo.province,
                    country: this.state.shippingInfo.country,
                    postalCode: value,
                    phoneNumber: this.state.shippingInfo.phoneNumber
                }
                    }
            );
        }
        billingPostalCodeHandler = (event) => {
            let value=event.target.value;
            this.setState({
                billingInfo: {
                    type: "billing",
                    firstName: this.state.billingInfo.firstName,
                    lastName: this.state.billingInfo.lastName,
                    city: this.state.billingInfo.city,
                    province: this.state.billingInfo.province,
                    country: this.state.billingInfo.country,
                    postalCode: value,
                    phoneNumber: this.state.billingInfo.phoneNumber
                }
                    }
            );
        }

        shippingPhoneNumberHandler = (event) => {
            let value=event.target.value;
            this.setState({
                shippingInfo: {
                    type: "shipping",
                    firstName: this.state.shippingInfo.firstName,
                    lastName: this.state.shippingInfo.lastName,
                    city: this.state.shippingInfo.city,
                    province: this.state.shippingInfo.province,
                    country: this.state.shippingInfo.country,
                    postalCode: this.state.shippingInfo.postalCode,
                    phoneNumber: value
                }
                    }
            );
        }

        billingPhoneNumberHandler = (event) => {
            let value=event.target.value;
            this.setState({
                billingInfo: {
                    type: "billing",
                    firstName: this.state.billingInfo.firstName,
                    lastName: this.state.billingInfo.lastName,
                    city: this.state.billingInfo.city,
                    province: this.state.billingInfo.province,
                    country: this.state.billingInfo.country,
                    postalCode: this.state.billingInfo.postalCode,
                    phoneNumber: value
                }
                    }
            );
        }
    verifyBilling = (event) => {//is this supposed to be the same as the _Handler in Register
        this.setState({
        defaultBilling: event.target.value
            }
        );
    }
    verifyShipping = (event) => {
        this.setState({
            defaultShipping: event.target.value
                }
        );
    }

    /*
    firstName: this.state.billingInfo.firstName,
                    lastName: this.state.billingInfo.lastName,
                    city: this.state.billingInfo.city,
                    province: this.state.billingInfo.province,
                    country: this.state.billingInfo.country,
                    postalCode: this.state.billingInfo.postalCode,
                    phoneNumber: value*/
    displayDefault=()=>{
        return( <div>
            <div>
            <h3>Billing</h3>
            <label>First Name</label><input type='text' onChange={this.billingFirstNameHandler} /><br></br>
            <label>Last Name</label><input type='text' onChange={this.billingLastNameHandler} /><br></br>
            <label>City</label><input type='text' onChange={this.billingCityHandler} /><br></br>
            <label>Province</label><input type='text' onChange={this.billingProvinceHandler} /><br></br>
            <label>Country</label><input type='text' onChange={this.billingCountryHandler} /><br></br>
            <label>Postal Code</label><input type='text' onChange={this.billingPostalCodeHandler} /><br></br>
            <label>Phone Number</label><input type='text' onChange={this.billingPhoneNumberHandler} /><br></br>
            </div>
            <div>
            <h3>Shipping</h3>
            
            <label>First Name</label><input type='text' onChange={this.shippingFirstNameHandler} /><br></br>
            <label>Last Name</label><input type='text' onChange={this.shippingLastNameHandler} /><br></br>
            <label>City</label><input type='text' onChange={this.shippingCityHandler} /><br></br>
            <label>Province</label><input type='text' onChange={this.shippingProvinceHandler} /><br></br>
            <label>Country</label><input type='text' onChange={this.shippingCountryHandler} /><br></br>
            <label>Postal Code</label><input type='text' onChange={this.shippingPostalCodeHandler} /><br></br>
            <label>Phone Number</label><input type='text' onChange={this.shippingPhoneNumberHandler} /><br></br>

            </div>
            
        </div>);
    }

    loadDefaultBill=async ()=>{
        let uInf;
       try{ const res= await axios.get('https://thebookclub4413.herokuapp.com/getUser?username='+this.props.user.username);
       console.log(res);
    
       uInf=res.data;
       this.setState({uInf:uInf})
       if(uInf.billingInfo==null){
           this.setState({hasInfo:false});//Let user fill in default fieldsthis.displayDefault()
       }
       else{
        this.setState({hasInfo:true});
        }}
        catch(err){
            console.log(err);
        }
    }
    
    togglePayment = () => {console.log("HEREE");
       // console.log(this.props.user);
        if(this.props.user.authenticated){
        this.state.showPage=true;
        }
    }
    displayOrder=()=>{
        if(this.props.cart!=null){
            return( this.props.cart.map(book => (
                <div>
                    Book Title: {book.book.title}, Quantity: {book.quantity}, Price: ${book.book.price*book.quantity}
                </div>
              )))};
    }

    sendTransaction= async ()=>{
        const headers = {
            'usernameSubmitted': this.props.user.username,
            'Authorization':this.props.user.token
          }
          let newCart = []
          this.props.cart.forEach(item => {
              let o = {
                  bookId: item.book.bookId,
                  username: this.props.user.username,
                  quantity:item.quantity
              }
              newCart.push(o);
          });;
        let body={
            username:this.props.user.username,
            transactions:newCart,
            shippingInfo:this.state.shippingInfo,
            billingInfo:this.state.billingInfo
        };
        const c = parseInt(sessionStorage.getItem("counter"));
        try{
            if(c%3 !== 0){
            const response = await axios.post('https://thebookclub4413.herokuapp.com/checkout',body,{headers:headers});
            console.log(response);
            this.setState({
                declined:false,
                success:true
            });
            sessionStorage.removeItem("currCart");
            sessionStorage.setItem("counter", c +1);
            }
            else{
                throw "payment declined";
            }
        }
        catch(err){
            this.setState({
                declined:true,
                success:false
            });
            sessionStorage.setItem("counter", c +1);
            console.log(err);
        }
    }

    render(){
        this.togglePayment();
        if(this.state.success===true){
            return (
                <Redirect to="/"/>
                    );
        }
        if(this.state.showPage===false){
            return (
                <Redirect to="/login"/>
                    );
        }
        let error = null;
        if(this.state.declined === true){
            error = (<small style={{fontStyle: "italic", color:"red"}}>payment declined, please try again</small>);
        }
        let todo=null;
    if(this.state.hasInfo){
            todo=(<div>
               <label>Default Billing Address</label> {this.state.uInf.billingInfo}<br></br>
               <label>Default Shipping Address</label> {this.state.uInf.shippingInfo}<br></br>
           </div>)
           }
           else{
               todo=this.displayDefault();
           }
        
        return (
            
    <div>
        {todo}
        <label>CreditCard number</label> <input type="number" required/><br></br>
        <label>security code</label> <input type="number" required/><br></br>
        <label>Expiry Month</label> <input type="number" required/><br></br>
        <label>Expiry Year</label> <input type="number" required/><br></br>
        {this.displayOrder()}
        <div><h3>TOTAL PAYMENT: ${this.props.totalPayment.toFixed(2)}</h3></div>
        <button onClick={this.sendTransaction}>Confirm Order</button><br></br>
        {error}
      </div>);
    };
    
}
/* this.togglePayment();
        if(this.state.showPage===false){
            return (
                <Redirect to="/login"/>
                    );
        }
        return (
    <div>
        {this.loadDefaultBill()}
        {this.displayOrder()}
        <div><h3>TOTAL PAYMENT: ${this.props.totalPayment}</h3></div>
        <button onClick={this.sendTransaction}>Confirm Order</button>
      </div>*/ 
export default PaymentPage;