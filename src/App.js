import React from "react";
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from './Chat.js';
import Pusher from 'pusher-js';
import { useEffect } from "react";
import axios from "./axios";
import { useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync').then(response => {
      setMessages(response.data);
      });
  }, []);

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

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
        <Sidebar/>
        <Chat messages={messages}/>
      </div>
    </div>
  );
}

export default App;
