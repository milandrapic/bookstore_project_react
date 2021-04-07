import React from "react";


const item = props => {
    return(
        <div style={{
            backgroundColor:"#fff8dc",
            border: "2px solid black",
            borderRadius: "3%",
            marginLeft: "20%",
            marginRight: "20%",
            marginBottom: "1%",
            marginTop: "1%",
            padding:"1%",
            boxShadow: "10px 10px grey"
            }}>
                <img alt="" src={props.item.image} style={{
            borderRadius: "10%",
            boxShadow: "3px 3px grey"}}></img>
                <br></br>
        <div
        style={{
            border: "2px solid black",
            borderRadius: "15%",
            marginLeft: "20%",
            marginRight: "20%",
            marginBottom: "1%",
            marginTop: "1%",
            padding:"1%",
            fontFamily:"cursive",
            backgroundColor:"white"
            }}> <div>{props.item.title}</div><br></br>
            <div><small>by: {props.item.author} </small></div><br></br>
        <div><label>Price:</label> ${props.item.price.toFixed(2)} </div>
        </div>
        </div>

    );
}

export default item;