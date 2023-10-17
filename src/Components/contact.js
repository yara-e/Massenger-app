import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

import '../Style/user.css';
const User = () => {
    const [chats, setChats] = useState([]);

    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
    };

    return (
        <section>
            {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (


                <section class='user' style={{ display: "flex" }} key={chat[0]}
                    onClick={() => handleSelect(chat[1].userInfo)}>
                    <img src={chat[1].userInfo.photoURL} class="uimg left"></img><section class="right">
                        <h4 style={{ margin: 0, paddingTop: 10 }}> {chat[1].userInfo.displayName}</h4>
                        <span>{chat[1].lastMessage?.text}</span>
                    </section>
                </section>


            ))}
        </section>
    );
};

export default User;