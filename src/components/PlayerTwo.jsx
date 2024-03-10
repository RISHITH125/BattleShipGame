import { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { AppContext } from "../App.jsx";

function PlayerTwo() {
  const { socket } = useContext(AppContext);
  const [myTurn, setMyTurn] = useState(false);
  const[rotation,setMyrotations]=useState(0);
//   const [SelectedShip, setSelectedShip] = useState(0);
  const [clickedIndices, setClickedIndices] = useState([]);

  const sendMessage = (action, data = {}) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action, ...data }));
    } else {
      console.error('WebSocket is not open. Cannot send message.');
    }
  };

  const handleIconClick = (index) => {
    setClickedIndices((prevIndices) => {
      if (!prevIndices.includes(index)) {
        const newIndices_p2 = [...prevIndices, index];
        console.log('Selected Indices(player2):', newIndices_p2);
        // setSelectedShip(index);
        setMyrotations((prev) =>prev+1)
        console.log('rotation:',rotation);
        sendMessage("turn complete", { SelectedShip: index, rotation:rotation});
        return newIndices_p2;
      }
      return prevIndices;
    });
  };

  useEffect(() => {
    const handleMessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log(message);
        switch (message.action) {
          case "My turn":
            setMyTurn(true);
            break;
          case "Opponent turn":
            setMyTurn(false);
            break;
          default:
            console.log('Unknown action:', message.action);
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const getOpacity = (index) => {
    return clickedIndices.includes(index) ? 1 : 0.35;
  };

  return (
    <div className={`border-black border-4 rounded-xl p-1 flex flex-wrap w-1/2 ${!myTurn ? 'opacity-50 pointer-events-none disabled:pointer-events-none disabled:opacity-50' : ''}`}>
      {Array.from({ length: 25 }, (_, index) => (
        <div
          key={index}
          onClick={() => handleIconClick(index)}
          style={{ opacity: getOpacity(index) }}
          onMouseEnter={() => {
            if (!clickedIndices.includes(index)) {
              document.getElementById(`icon2-${index}`).style.opacity = '0.5';
            }
          }}
          onMouseLeave={() => {
            if (!clickedIndices.includes(index)) {
              document.getElementById(`icon2-${index}`).style.opacity = '0.35';
            }
          }}
          id={`icon2-${index}`}
          className={`relative bg-blue-500 rounded-md border-2 border-black w-1/5 disabled:pointer-events-none <disabled:opacity-0></disabled:opacity-0> ${clickedIndices.length > 6 ? 'opacity-50 pointer-events-none' : ''}`}
        ></div>
      ))}
    </div>
  );
}

PlayerTwo.propTypes = {
  P2UserName: PropTypes.string.isRequired,
};

export default PlayerTwo;