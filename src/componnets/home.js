import React, { createRef } from 'react';

const Home = (props) => {
  const username = createRef();
  const onJoin = () => {
    if (username.current.value) {
      props.history.push(`/chat/${username.current.value}`);
    }
  };
  return (
    <div className='home-wrapper'>
      <h1>Chatroom</h1>
      <input ref={username} />
      <button onClick={onJoin}>Join</button>
    </div>
  );
};

export default Home;
