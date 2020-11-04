import React from 'react';

function Header (props){
    return(
        <div className={props.className}>
            <h1>Currency converter</h1>
        </div>
    )
}

export default Header;