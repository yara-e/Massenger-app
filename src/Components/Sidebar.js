import React from 'react';
import '../Style/Sidebar.css';
import Navbar from './Navbar';
import User from './contact';
import Search from './Search';

const Sidebar = () => {
    return (
        <section className='sidebar'>
            <Navbar></Navbar>
            <Search></Search>
            <User></User>

        </section>
    );
};

export default Sidebar;