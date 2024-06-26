
import { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from './components/Board';
import LoginPage from './components/LoginPage';
import Room from './components/Room';
import Error from './components/Error';

// Step  1: Create a new context
export const AppContext = createContext();

function App() {
  const [username, setUsername] = useState('');
  const [socket, setSocket] = useState(null);
  const port =  4748;

  const [P1UserName, setP1UserName] = useState('');
  const [P2UserName, setP2UserName] = useState('')

  useEffect(() => {
    if (username) {
      const newSocket = new WebSocket(`ws://localhost:${port}?username=${encodeURIComponent(username)}`);
      setSocket(newSocket);
    }
    // return () => {
    //   if (socket) {
    //     socket.close();
    //   }
    // }
  }, [username]);

  // Step  2: Use the Provider component to wrap your routes
  return (
    <AppContext.Provider value={{ username, setUsername, socket, setSocket ,P1UserName, setP1UserName,P2UserName, setP2UserName}}>
      <BrowserRouter>
        <Routes>
          <Route path="/board" element={<Board />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/*" element={<Error />} />
          <Route path="/room" element={<Room />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
