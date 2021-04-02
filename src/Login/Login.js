import React from "react";


const login = props => {
    // state = {
    //     username: '',
    //     password: '',
    //     token:'',
    //     tokenExpires: ''
    // };
    // constructor(){
    //     super();
    //     console.log(localStorage.getItem("token"));
    // }

    // getBooksHandler(){
    //     axios.get('https://www.googleapis.com/books/v1/volumes?q=subject:fiction&printType=books&maxResults=40').then(
    //         response => {
    //             console.log(response);
    //         }
    //     );
    // }

        // helloRequestHandler = () => {
        //     console.log('clicked hello');
        //     const options = {
        //         headers: {
        //             'Authorization': this.state.token
        //         }
            
        //     };

        //     axios.get('http://localhost:8080/getHello', options).then(
        //         response => {
        //             console.log(response);
        //         }
        //     );
            
        // }

    // loginHandler = () => {
    //     console.log('clicked login');
    //     console.log(this.state.username);
    //     console.log(this.state.password);
    //     const headers = {
    //         'username': this.state.username,
    //         'password': this.state.password
    //     }
    //     axios.post('http://localhost:8080/login',null,
    //     {
    //         headers: headers,
    //         credentials:'include'
    //     }
    //     ).then(
    //         response => {
    //             console.log(response);
    //             this.setState({
    //                 token: response.headers.authorization,
    //                 tokenExpires: response.headers.expires
    //             });
    //             console.log(this.state.token);
    //             localStorage.setItem("token", this.state.token);
    //             localStorage.setItem("tokenExpires", this.state.tokenExpires);
    //             localStorage.setItem("username", this.state.username);
    //             localStorage.setItem("authenticated", 1);
    //         }
    //     )
        
    // }

    



    // usernameChangeHandler = (event) => {
        
    //         this.setState({
    //             username: event.target.value
    //             }
    //         );
            
    // }

    // passwordChangeHandler = (event) => {
    //     this.setState({
    //         password: event.target.value
    //         }
    //     );
        
    // }
    
        return (
            <div className='Login'>
                <label>Username</label><input type='text' onChange={props.changeuser} /><br></br>
                <label>Password</label><input type='password' onChange={props.changepass} /><br></br>
                <button type='submit' onClick={props.click}>Login</button><br></br>
            </div>
        );
}

export default login;