import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Sidebar from '../Components/Sidebar';
import '../Style/Home.css';
import Chat from '../Components/Chat';
//import Axios from 'axios';



const Home = () => {


    return (

        <div class="home">
            <Sidebar></Sidebar>
            <Chat></Chat>

        </div>
    );
};

export default Home;