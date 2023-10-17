import React, { useContext } from 'react';
import '../Style/Navbar.css';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';

import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
    const { currentUser } = useContext(AuthContext)
    return (

        <div class='navbar'>
            <span class="right">Lest's Chat </span>
            <img src={currentUser.photoURL} class="left img"></img>
            <span class="left"> {currentUser.displayName}</span>
            <span class="left" onClick={() => signOut(auth)}>Logout</span>
        </div>
    );
};

export default Navbar;