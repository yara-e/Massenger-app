import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import "../Style/Messages.css"
const Message = ({ message }) => {
    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    return (
        <section
            ref={ref}
            className={`message ${message.senderId === currentUser.uid && "owner"}`}
        >
            <section className="messageInfo">
                <img
                    src={
                        message.senderId === currentUser.uid
                            ? currentUser.photoURL
                            : data.user.photoURL
                    }
                    alt=""
                />
                <span>just now</span>
            </section>
            <section className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} alt="" />}
            </section>
        </section>
    );
};

export default Message;