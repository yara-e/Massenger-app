import { useState } from 'react';
import React from 'react';
import '../Style/register.css'
import profile from '../assets/pro.jpg'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
//import Axios from 'axios';


const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const date = new Date().getTime();

            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,

                        })

                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");

                    } catch (err) {
                        console.log(err);

                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };


    return (
        <div class="all">
            <div className="formContainer">
                <div className="formWrapper">
                    <h1 className="title">Register</h1>
                    <form class="data" onSubmit={handleSubmit}>

                        <input className="info" required type="text" placeholder="Enter name" />

                        <input className="info" required type="email" placeholder="Enter email" />

                        <input className="info" required type="password" placeholder="Enter password" />

                        <label class="label">
                            <input type="file" required />
                            <img src={profile}></img>
                            <span style={{ paddingTop: 10 }}>Add Profile</span>

                        </label>

                        {err && console.log(err)}

                        <button className="btn" >Sign up</button>

                    </form>
                    <p>
                        You do have an account? Login
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;