import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { io } from "socket.io-client";
import { useTokenStore } from "../store/tokenContext";
import { SV_API_URL } from "../config/config";

const socket = io(SV_API_URL, {
    withCredentials: true,
});

export function Chat() {
    const { profile } = useTokenStore(state => state.profile);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            body: "",
            from: `${profile?.username || "Usuario desconocido"} Ha entrado al chat`,
        },
    ]);
    const profiles = useTokenStore(state => state.profile);
console.log(profiles);  // Verifica qué contiene profile
    const inputRef = useRef(null);
    const chatRef = useRef(null);

    useEffect(() => {
        const receiveMessage = (message) => {
            setMessages((prev) => [...prev, message]);
        };

        socket.on("message", receiveMessage);

        return () => {
            socket.off("message", receiveMessage);
        };
    }, []);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (!message.trim() || !profile) return;

        const newMessage = {
            body: message,
            from: profile.username,
        };

        socket.emit("message", newMessage);

        setMessages((prev) => [...prev, newMessage]);

        setMessage("");
    };

    return (
        <ChatStyled>
            <div id="chat" className="chat" ref={chatRef}>
                {messages.map((message, index) => (
                    <div key={index} className="message">
                        <p><strong>{message.from}:</strong></p>
                        <p>{message.body}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    ref={inputRef}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escribe tu mensaje..."
                />
                <button type="submit">Enviar</button>
            </form>
        </ChatStyled>
    );
}

const ChatStyled = styled.div`
  .chat {
    min-height: 400px;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }

  .message {
    margin-bottom: 1rem;
  }

  form {
    display: flex;
    gap: 10px;
  }

  input {
    flex-grow: 1;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #f1356d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #e02458;
  }
`;
