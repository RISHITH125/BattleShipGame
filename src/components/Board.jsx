import PlayerOne from './PlayerOne';
import PlayerTwo from './PlayerTwo';
import { AppContext } from "../App.jsx";
import { useContext, useState, useEffect } from 'react';

function Board() {
  const { socket } = useContext(AppContext);
  const [P1UserName, setP1UserName] = useState('');
  const [P2UserName, setP2UserName] = useState('');

  useEffect(() => {
    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.action) {
        case "BroadCastName":
          setP1UserName(message.player1);
          setP2UserName(message.player2);
          break;
        default:
          console.log('Unknown action:', message.action);
      }
    };

    socket.addEventListener('message', handleMessage);
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  return (
    <>
      <div className="monitor h-screen w-full flex flex-col p-1 gap-1">
        {/* first segment */}
        <div className="relative bg-gray-200 h-[20vh] border-black border-4 rounded-xl p-5 gap-4">
                   
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
