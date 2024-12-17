import { useState,useEffect,useRef } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import { useTokenStore } from "../store/tokenContext";
import {SV_API_URL} from "../config/config";


const socket = io(SV_API_URL, {
    withCredentials: true, // Si es necesario 
});

function Chat() {
    const { profile } = useTokenStore((state) => state.profile);
    
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            body:``,
            from:`${profile.username} Ha entrado al chat`
        }
    ]);

    const inputRef = useRef(null);
    const chatRef = useRef(null);
    
    useEffect(() => {
        const receiveMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        }
    
        socket.on("message", receiveMessage);

        return () => {
            socket.off("message", receiveMessage);
        }
    }
    , []);

    useEffect(() => {
        if(chatRef.current){
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }
    , [messages]);

    const sendMessage = (e) => {
        e.preventDefault()
        if(!message.trim() || !profile) return;

        socket.emit("message", {
            body: message,
            from: profile.username,
        });

        const newMessage = {
            body: message,
            from: profile.username,
        }
        setMessages((prev) => [...prev, newMessage]);
        console.log(messages);

        inputRef.current.value = "";
        setMessage("");
    }

    return (
        <ChatStyled>
            <div id="chat" className="chat" ref={chatRef}>
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <p>{message.from}</p>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    ref={inputRef}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>
        </ChatStyled>
    );

}
