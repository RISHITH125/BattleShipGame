import PlayerOne from './PlayerOne';
import PlayerTwo from './PlayerTwo';
import { AppContext } from "../App.jsx";
import { useContext, useState, useEffect } from 'react';

function Board() {
  const { socket } = useContext(AppContext);
  const [P1UserName, setP1UserName] = useState('');
  const [P2UserName, setP2UserName] = useState('')
  useEffect(() => {
    if (socket && socket.readyState === WebSocket.OPEN) {
        const handleMessage = async(event) => {
        try{
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
        }
        catch(error){
          console.error('Error parsing WebSocket message:', error);
        }
      };
    
      // if (socket.readyState === WebSocket.OPEN) {
      //   socket.onmessage = handleMessage
      // } else {
      //   socket.addEventListener('open', () => {
      //     socket.addEventListener('message', handleMessage);
      //   });
      // }
      socket.onmessage=handleMessage;
    }


  }, [socket]);
  return (
    <>
      <div className="monitor h-screen w-full flex flex-col p-1 gap-1">
        {/* first segment */}
        <div className="flex justify-between bg-gray-200 h-[20vh] border-black border-4 rounded-xl p-2 gap-4">
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
