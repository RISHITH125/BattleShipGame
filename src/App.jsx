// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Board from './components/Board';
// import LoginPage from './components/LoginPage';
// import Room from './components/Room'
// import Error from './components/Error';

// function App() {
//   const [username, setUsername] = useState('');
//   const [socket, setSocket] = useState(null);
//   const port=4748
//   useEffect(() => {
//     if (username) {
//       const newSocket = new WebSocket(`ws://localhost:${port}?username=${encodeURIComponent(username)}`);
//       setSocket(newSocket);
//     }
//   }, [username]);

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/board" element={<Board />} />
//         <Route path="/" element={<LoginPage setUsername={setUsername} socket={socket} />}/>
//         <Route path="/*" element={<Error />} />
//         <Route path="/room" element={<Room username={username} socket={socket}/>}/>
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;
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

  useEffect(() => {
    if (username) {
      const newSocket = new WebSocket(`ws://localhost:${port}?username=${encodeURIComponent(username)}`);
      setSocket(newSocket);
    }
  }, [username]);

  // Step  2: Use the Provider component to wrap your routes
  return (
    <AppContext.Provider value={{ username, setUsername, socket, setSocket }}>
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
