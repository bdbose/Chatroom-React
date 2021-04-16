import React, { createRef, useEffect } from 'react';
import { io } from 'socket.io-client';
let socket;

const Chat = (props) => {
  const msg = createRef();
  useEffect(() => {
    socket = io('http://192.168.0.103:4040/');
    socket.emit(
      'join',
      {
        username,
      },
      () => {},
    );
    return () => {
      if (socket.connect) socket.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socket.on('getMessage', (data) => {
      const displayBox = document.getElementsByClassName('chat-display')[0];
      const messageDisplay = document.createElement('div');
      messageDisplay.className = 'message';
      messageDisplay.innerHTML = `<div class='message-sender'><b>${
        data.username
      }</b></div>
            <div>${data.message}</div>
            <span>${new Date().toLocaleTimeString()}</span>
            `;
      displayBox.appendChild(messageDisplay);
    });
  }, []);
  console.log('data');
  const onSend = () => {
    // console.log(msg.current.value);
    if (msg.current.value) {
      socket.emit('sendMessage', {
        username,
        message: msg.current.value,
      });
      msg.current.value = '';
    }
  };
  const username = props.match.params.id;
  return (
    <div className='chat-wrapper'>
      <div className='navbar'>{username}</div>
      <div className='chat-display'></div>
      <div className='message-box'>
        <input
          ref={msg}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSend();
            }
          }}
        />
        <button onClick={onSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
