import React, { useEffect, useState } from 'react'
import './SidebarChat.css';
import { Avatar } from "@material-ui/core";
import axios from "./axios";
import Pusher from 'pusher-js';
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
    const createChat = () => {
        const roomName = prompt("Please enter the room name for chat");

        if (roomName){
            axios.post('/rooms/new', {
                name: roomName
            });
        }
    };

    const [messages, setMessages] = useState([]);

    useEffect (() => {
        if(id){
            axios.get('/messages/' + id).then(response => {
                setMessages(response.data);
            });
        }
    }, [id]);

    useEffect(() => {
        const pusher = new Pusher('e93ff837d580d9e24f6a', {
            cluster: 'mt1'
        });
    
        const channel = pusher.subscribe('messages');
        channel.bind('inserted', (newMessage) => {
            setMessages([...messages, newMessage]);
        });
    
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [messages])

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages.length-1 > 0 ? (messages[messages.length - 1].name + ": " + messages[messages.length - 1].message) : ("No messages yet.")}</p>
            </div>            
        </div>
        </Link>
    ): (
        <div onClick={createChat} className="sidebarChat">
            <h2>Add New Chat</h2>
        </div>
    );
}

export default SidebarChat
