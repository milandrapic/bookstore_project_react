import React from 'react';

const home = (props) => {
    return (
        <div>
            <p>Welcome Home {props.user}</p>
            <button onClick={props.click}>Logout</button>
        </div>
        );
}

export default home;