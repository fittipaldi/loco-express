import React, {useState} from 'react';

const Header = (props) => {
    return (
        <div className="header">
            <a className="menu-home" href="/" title="Go Home">Loco Express</a>
            <a className="menu-item" href="/drivers">Drivers</a>
            <a className="menu-item" href="/routes">Routes</a>
        </div>
    );
};

export default Header;
