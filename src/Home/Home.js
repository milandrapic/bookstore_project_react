import React from 'react';

const home = (props) => {
    //is only returned if the user is logged in.
    return (
        <div>
            <p>Welcome Home {props.user}</p>
            <button onClick={props.click}>Logout</button>
        </div>
        );
}

export default home;