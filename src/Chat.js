import React , { useEffect, useState } from 'react'
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, MicOutlined} from '@material-ui/icons';
import axios from "./axios";
import Pusher from 'pusher-js';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function Chat() {
    const [input, setInput] = useState("");
    const [show, setShow] = useState(false);
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    // eslint-disable-next-line
    const[{user}, dispatch] = useStateValue();
    //console.log('/roomname/' + roomId);

    const sendMessage = async(e) => {
        e.preventDefault();

        await axios.post('/messages/new', {
            message: input,
            name: user.displayName,
            timestamp: new Date(),
            roomid: roomId
        });

        setInput('');
        setShow(!show);
    };

    useEffect (() => {
        if(roomId){
            axios.get('/roomname/' + roomId).then(response => {
                //console.log(response.data);
                setRoomName(response.data.name);
            });
            axios.get('/messages/' + roomId).then(response => {
                setMessages(response.data);
                //console.log(messages.length-1 > 0 ? (new Date(messages[messages.length-1].timestamp).toUTCString(), messages.length-1) : ("No messages yet."));
            });
        }// eslint-disable-next-line
    }, [roomId]);
      
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
    
    //console.log(messages);

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`} style={{backgroundColor: "#dfe4e6"}}/>
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen {messages.length-1 > 0 ? (new Date(messages[messages.length-1].timestamp).toUTCString()) : ("No messages yet.")}</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton title="Search...">
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton title="Menu">
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <ScrollToBottom className="chat__body">
                {messages.map(message => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className="chat__name">{message.name}</span>
                        <br></br>
                        {message.message}
                        <span className="chat__timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                    </p>
                ))}
            </ScrollToBottom>
            {show ? <Picker set="apple" emojiSize={34} showPreview={false} color={"#009688"} onSelect={emoji => setInput(input + emoji.native)} style={{ width: '100%' }}/> : null}
            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticon onClick={() => setShow(!show)}/>
                </IconButton>
                <IconButton title="Attach">
                    <AttachFile/>
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit"> Send a message</button>
                </form>
                <IconButton>
                    <MicOutlined/>
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
