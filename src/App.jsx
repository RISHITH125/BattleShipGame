import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import LoginPage from './components/LoginPage';
import Room from './components/Room'
import Error from './components/Error';

function App() {
  const [username, setUsername] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (username) {
      const newSocket = new WebSocket(`ws://localhost:8000?username=${encodeURIComponent(username)}`);
      setSocket(newSocket);
    }
  }, [username]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/board" element={<Board />} />
        <Route path="/" element={<LoginPage setUsername={setUsername} socket={socket} />}/>
        <Route path="/*" element={<Error />} />
        <Route path="/room" element={<Room username={username} socket={socket}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
