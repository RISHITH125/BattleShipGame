import PlayerOne from './PlayerOne';
import PlayerTwo from './PlayerTwo';
import { AppContext } from "../App.jsx";
import { useContext, useEffect, useState } from 'react';

function Board() {
  const { socket ,P1UserName, setP1UserName ,P2UserName, setP2UserName} = useContext(AppContext);
  const [isPlayerOneTurn, setIsPlayerOneTurn] = useState(false);
  const [showOpponentsTurnPopup, setShowOpponentsTurnPopup] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [SelectShips, setSelectShips] = useState(false);

  useEffect(() => {
    const handleMessage = (event) => {
      try{
        const message = JSON.parse(event.data);
        console.log(message)
        switch (message.action) {
          case "BroadCastName":
            setP1UserName(message.player1);
            setP2UserName(message.player2);
            break;
          case "SelectShips":
            setSelectShips(true);
            setTimeout(() => {
              setSelectShips(false);
            }, 1000);
            break;
          case "Let the game begin":
            setGameStarted(true);
            setTimeout(() => {
              setGameStarted(false);
            }, 2000);
            break;
          case "My turn":
            setIsPlayerOneTurn(true);
            setShowOpponentsTurnPopup(false); // Hide popup when it's player's turn
            break;
          case "Opponents turn":
            setIsPlayerOneTurn(false);
            setShowOpponentsTurnPopup(true); // Show popup when it's opponent's turn
              setTimeout(() => {
                setShowOpponentsTurnPopup(false); // Hide popup after 2 seconds
              }, 2000);
            break; 
          default:
            console.log('Unknown action:', message.action);
        }
      }
      catch(error){
        console.error('Error parsing WebSocket message:', error);
      }
    };

    if (socket) {
      socket.onmessage = handleMessage;
    }

  }, [socket]); // Removed P1UserName, P2UserName from dependencies

  return (
      <div className="monitor h-screen w-full flex flex-col p-1 gap-1">
        {/* first segment */}
        <div className="flex justify-between bg-gray-200 h-[20vh] border-black border-4 rounded-xl p-2 gap-4">
        <h1 className="text-3xl text-center text-red-500">{P1UserName}</h1>
        <h1 className="text-3xl text-center text-blue-500">{P2UserName}</h1>
      </div>
       
       
        {/* second segment */}
        <div className="relative flex flex-1">
          <PlayerOne P1UserName={P1UserName} socket={socket} isPlayerOneTurn={isPlayerOneTurn}/>
          <PlayerTwo P2UserName={P2UserName} socket={socket} isPlayerOneTurn={!isPlayerOneTurn}/>
        </div>

        {/* Opponents turn popup */}
      {showOpponentsTurnPopup && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
          <div className="bg-white p-8 rounded-lg text-center">
            <h1 className="text-4xl mb-4">Opponent&apos;s Turn</h1>
          </div>
        </div>
      )}

        {/* Game Started popup */}
        {gameStarted && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white p-8 rounded-lg text-center">
              <h1 className="text-4xl mb-4">Let&apos;s Begin!</h1>
            </div>
          </div>
        )}

        {/* Select Ships */}
        {SelectShips && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-lg">
            <div className="bg-white p-8 rounded-lg text-center">
              <h1 className="text-4xl mb-4">Select your Ships !!!</h1>
            </div>
          </div>
        )}

      </div>
  );
}

export default Board;