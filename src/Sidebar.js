import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat.js';
import Pusher from 'pusher-js';
import axios from "./axios";
import { useStateValue } from './StateProvider';
import User from './User';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    // eslint-disable-next-line
    const[{user}, dispatch] = useStateValue();
    const [show, setShow] = useState(false);

    const createChat = () => {
        const roomName = prompt("Please enter the room name for chat");

        if (roomName){
            axios.post('/rooms/new', {
                name: roomName
            });
        }
    };

    useEffect(() => {
        axios.get('/rooms/sync').then(response => {
            //console.log(response.data);
            setRooms(response.data);
        });
    }, []);

    useEffect(() => {
    var pusher = new Pusher('ab8ff6a25757b8dcc9ca', {
        cluster: 'mt1'
      });
      
      var channel = pusher.subscribe('rooms');
      channel.bind('inserted', function(newRoom) {
        setRooms([...rooms, newRoom]);
      });

    return () => {
        channel.unbind_all();
        channel.unsubscribe();
    };
    }, [rooms])

    //console.log(rooms);
    
    return (
        <div className="sidebar" id="sidebar">
            {show ? 
            (<User onClose={() => setShow(false)}>
                <div className="user__img">
                    <img src={user.photoURL} alt={user.displayName}/>
                </div>
                <div className="user__name">
                    <p>Your Name</p>
                    <h4>{user.displayName}</h4>
                </div>
                <div className="user__name__info">
                    <p>This name will be visible to your WhatsApp web clone contacts.</p>
                </div>
            </User>)
            :(
            <div>
                <div className="sidebar__header">
                    <Avatar title="Profile" src={user?.photoURL} onClick={() => setShow(true)}/>
                    <div className="sidebar__headerRight">
                        <IconButton title="Status">
                            <DonutLargeIcon/>
                        </IconButton>
                        <IconButton title="New Room">
                            <ChatIcon onClick={createChat}/>
                        </IconButton>
                        <IconButton title="Menu">
                            <MoreVertIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className="sidebar__search">
                    <div className="sidebar__searchContainer">
                        <SearchOutlined/>
                        <input placeholder="Search or start new chat" type="text" size="45" />
                    </div>
                </div>
                <div className="sidebar__chats">
                    <SidebarChat addNewChat/>
                    {rooms.map(room => (
                        <SidebarChat key={room._id} id={room._id} name={room.name}/>))}
                </div>
            </div>)}
        </div>
    )
}

export default Sidebar
