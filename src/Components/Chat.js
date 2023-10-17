import { useContext } from "react";
import React, { useState } from 'react';
import '../Style/Navbar.css';

import '../Style/Chat.css';
import Messages from './Messages';
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

import {
    arrayUnion,
    doc,
    serverTimestamp,
    Timestamp,
    updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
const Chat = () => {
    const { data } = useContext(ChatContext);
    const [text, setText] = useState("");
    const { currentUser } = useContext(AuthContext);

    const handleSend = async () => {

        await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
            }),
        });


        await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
            },
            [data.chatId + ".date"]: serverTimestamp(),
        });

        setText("");

    };
    return (


        <section class="chat">
            <section class='nav'>


                <span class=""> {data.user?.displayName}</span>

            </section>
            <section  >
                <Messages />
            </section>
            <section class='send'>
                <input type='text' placeholder='send a message'
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                ></input>
                <button class='sbtn' onClick={handleSend}>send</button>

            </section>
        </section>
    );
};

export default Chat; 