//debate chat
import React from 'react';
import ReactDOM from 'react-dom';
import { Button, ControlLabel, Form, FormControl, FormGroup } from 'react-bootstrap';
const socket = require('socket.io-client')('http://localhost:3000/spectator');

export default class Chatview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      chat: {}
    }

    this.handleSubmit = (event) => {
      const username = ReactDOM.findDOMNode(this.refs.username).value.trim();
      const message = ReactDOM.findDOMNode(this.refs.message).value.trim();
      // console.log('Send message');
      // console.log('username', username);
      // console.log('message', message);
      socket.emit('chat', {
        username: username,
        message: message,
        side: 'spectator'
      });
    };
    
    // Listen for chats
    socket.on('chat', (data) => {
      const output = ReactDOM.findDOMNode(this.refs.outputSpectator);
      console.log(output);
      output.innerHTML += `<p><strong>${data.username}:</strong>  ${data.message}</p>`;
      output.lastChild.scrollIntoView();
    });
  }

 render() {
  return (
      <div className="chat-container">
        <span className="user-role">Spectator</span><span className="glyphicon glyphicon-comment"></span>
        <div className="panel-body">
          <div id="chat-window-output" ref="outputSpectator"></div>
        </div>
        
        <ul className="pages">
          <div className="form">
            <span className="title">Nickname?</span>
            <input className="usernameInput" ref="username" type="text" maxLength="14" />
          </div>
          <li className="chat page">
            <div className="chatArea">
              <ul className="messages"></ul>
            </div>
          </li>
        </ul>

        <div className="input-group">
          <input id="btn-input" type="text" className="inputMessage form-control input-sm" ref="message" placeholder="Type your message here..." />
          <span className="input-group-btn">
            <button className="btn btn-warning btn-sm" id="btn-chat" onClick={(event) => this.handleSubmit(event)}>Send</button>
          </span>
        </div>

      </div>
       
    )
  }
}
