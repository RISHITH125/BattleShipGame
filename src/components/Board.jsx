import PlayerOne from './PlayerOne';
import PlayerTwo from './PlayerTwo';
import { AppContext } from "../App.jsx";
import { useContext, useState, useEffect } from 'react';

function Board() {
  const { socket } = useContext(AppContext);
  const [P1UserName, setP1UserName] = useState('');
  const [P2UserName, setP2UserName] = useState('');

  useEffect(() => {
    if (socket) {
      const handleSocketClose = (event) => {
        console.log('WebSocket connection closed:', event.reason);
      };
      socket.addEventListener('close', handleSocketClose);

      return () => {
        socket.removeEventListener('close', handleSocketClose);
      };
    }
  }, [socket]);

  useEffect(() => {
    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      console.log(message)
      switch (message.action) {
        case "BroadCastName":
          setP1UserName(message.player1);
          setP2UserName(message.player2);
          break;
        default:
          console.log('Unknown action:', message.action);
      }
    };
  
    if (socket) {
      if (socket.readyState === WebSocket.OPEN) {
        socket.addEventListener('message', handleMessage);
      } else {
        socket.addEventListener('open', () => {
          socket.addEventListener('message', handleMessage);
        });
      }
    }
  
    return () => {
      if (socket) {
        socket.removeEventListener('message', handleMessage);
      }
    };
  }, [socket]);
  return (
    <>
      <div className="monitor h-screen w-full flex flex-col p-1 gap-1">
        {/* first segment */}
        <div className="flex justify-between relative bg-gray-200 h-[20vh] border-black border-4 rounded-xl p-2 gap-4">
          <h1 className="text-3xl text-center text-red-500">{P1UserName}</h1>
          <h1 className="text-3xl text-center text-blue-500">{P2UserName}</h1>
        </div>
       
       
        {/* second segment */}
        <div className="relative flex flex-1">
          <PlayerOne P1UserName={P1UserName} socket={socket}/>
          <PlayerTwo P2UserName={P2UserName} socket={socket}/>
        </div>
      </div>
    </>
  );
}

export default Board;
