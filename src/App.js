import { io } from 'socket.io-client';
import Chat from './components/Chat/Chat';

import './App.css';

function App() {
  const socket = io('http://mysocketvps.chost.com.ua:3001');
  // const socket = io('http://localhost:3001');

  return (
    <div className='App'>
      <Chat socket={socket} />
    </div>
  );
}

export default App;
