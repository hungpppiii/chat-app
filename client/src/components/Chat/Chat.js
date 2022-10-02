import React from 'react'
import { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'
import { useLocation } from 'react-router-dom'

import './Chat.css'
import InfoBar from '../InfoBar'
import Input from '../Input'
import Messages from '../Messages'
let socket;

const Chat = () => {
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const ENDPOINT = "localhost:5000";

    const location = useLocation();

    // join
    useEffect(() => {
        const { name, room } = queryString.parse(location?.search);
        socket = io(ENDPOINT, { transports: ['websocket', 'polling', 'flashsocket'] });

        setName(name);
        setRoom(room);

        socket.emit("join", { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        })
        
        return () => {
            // ngắt khi bị gọi lại bởi "Strict mode"
            socket.disconnect();
            // socket.off("join");
            console.log("disconnect")
        }
    }, [ENDPOINT, location.search])
    
    // listen message
    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
            console.log("set message", messages);
        });
    }, [])

    // send message
    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""))
        }
    }

    return (
        <div className='outerContainer'>
            <div className='container'>
                <InfoBar room={room}/>
                <Messages messages={messages} name ={name} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
        </div>
    )
}

export default Chat;