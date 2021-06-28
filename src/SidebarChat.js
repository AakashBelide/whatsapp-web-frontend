import React from 'react';
//import { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from "@material-ui/core";
import axios from "./axios";
//import Pusher from 'pusher-js';
import { Link } from "react-router-dom";

function SidebarChat({ id, name, addNewChat }) {
    const createChat = () => {
        const roomName = prompt("Please enter the room name for chat");

        if (roomName){
            axios.post('/rooms/new', {
                name: roomName
            });
        } else{
            alert("Invalid room name. Kindly enter a valid room name.");
        }
    };

    /*const [messages, setMessages] = useState([]);

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
    if(messages[messages.length - 1].roomid == id ){
        var last_msg = messages[messages.length - 1].name + ": " + messages[messages.length - 1].message;
        //console.log("YES", messages[messages.length - 1].roomid, id, last_msg);
    }else{
        var last_msg = messages.length-1 > 0 ? (messages[messages.length - 1].name + ": " + messages[messages.length - 1].message) : ("No messages yet.");
        //console.log("NO", messages[messages.length - 1].roomid, id, last_msg);
    } */

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${id}.svg`} style={{backgroundColor: "#dfe4e6"}}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>Last message...</p>
                {/* <p>{last_msg}</p> */}
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
