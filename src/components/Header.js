import React from 'react'
import './header.css';
import {Link} from 'react-router-dom';

export default function Header() {
    return (
        <div className='navRacoon'>
            <div className='nav-logo'><h3>Racoonia</h3></div>
            <ul className='navbar'>
                <li className='nav-item'><Link to='/'>Home</Link></li>
                <li className='nav-item'><Link to='/my-blog'>Blog</Link></li>
                <li className='nav-item'><Link to='/profile'>Profile</Link></li>
            </ul>
            <div className='nav-righty'><Link  to='/login'>Login</Link></div>
        </div>
    )
}
