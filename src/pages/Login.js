
import "../Style/register.css"
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
//import Axios from 'axios';



const Login = () => {

    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            setErr(true);
        }
    };
    return (
        <div className="formContainer">
            <div className="formWrapper">
                <h1 className="title">Login</h1>
                <form class="data" onSubmit={handleSubmit}>



                    <input className="info" required type="email" placeholder="Enter email" />

                    <input className="info" required type="password" placeholder="Enter password" />



                    <button className="btn" >Login</button>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You do not have an account? Register
                </p>
            </div>
        </div>
    );
};

export default Login;