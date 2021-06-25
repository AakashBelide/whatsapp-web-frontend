import React from 'react'
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, SearchOutlined, MoreVert, InsertEmoticon, MicOutlined} from '@material-ui/icons';

function Chat() {
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>Room Name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className="chat__body">
                <p className="chat__message">
                    <span className="chat__name">Aakash</span>
                    <br></br>
                    This is the message
                    <span className="chat__timestamp">{
                    new Date().toLocaleTimeString()}</span>
                </p>
                <p className="chat__message chat__receiver">
                    <span className="chat__name">Aakash</span>
                    <br></br>
                    This is the message
                    <span className="chat__timestamp">{
                    new Date().toLocaleTimeString()}</span>
                </p>
                <p className="chat__message">
                    <span className="chat__name">Aakash</span>
                    <br></br>
                    This is the message
                    <span className="chat__timestamp">{
                    new Date().toLocaleTimeString()}</span>
                </p>
            </div>

            <div className="chat__footer">
                <InsertEmoticon/>
                <form>
                    <input placeholder="Type a message" type="text"/>
                    <button type="submit"> Send a message</button>
                </form>
                <MicOutlined/>
            </div>
        </div>
    )
}

export default Chat
