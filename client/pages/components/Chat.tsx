import React, { useState, useEffect, use } from 'react';
import { io, Socket } from "socket.io-client";

interface Message {
    username: string,
    message: string
}

const Chat = () => {
    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState(0);
    const [socket, setSocket] = useState<Socket>();

    useEffect(() => {
        const chatServer = process.env.CHAT_SERVER || 'http://localhost:8000/live/{USERNAME}.flv';
        let socket = io(chatServer);
        setSocket(socket);
    }, [])

    useEffect(() => {
        if (socket) {
            socket.on('new message', data => {
                setMessages(messages => [...messages, data]);
            });

            socket.on('user-counter', data => {
                setUsers(data);
            });
        }
    }, [socket]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (socket) {
            socket.emit('send message', { username, message });
            setMessage('');
        }
    };

    return (
        <div className="chat-container">
            <p>Users live: {users}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
            <div className="messages-container">
                {messages.map((message, index) => (
                    <p key={index}>
                        {message.username}: {message.message}
                    </p>
                ))}
            </div>
        </div>
    );
};

export default Chat;