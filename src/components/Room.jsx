// // Room.jsx
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// function Room({ username, socket }) {
//   const navigate = useNavigate();
//   const [showRoomIdInput, setShowRoomIdInput] = useState(false);
//   const [roomId, setRoomId] = useState('');

//   const sendMessage = (action, data = {}) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify({ action, username, ...data }));
//     }
//   };

//   const handleCreateRoomClick = () => {
//     sendMessage('create room');
//     navigate("/board");
//   };

//   const handleJoinRoomClick = () => {
//     setShowRoomIdInput(true);
//   };

//   const handleRoomIdSubmit = (e) => {
//     e.preventDefault();
//     sendMessage('join room', { roomId });
//     navigate("/board");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
//             Join or Create a Room
//           </h2>
//         </div>
//         {showRoomIdInput ? (
//           <form onSubmit={handleRoomIdSubmit} className="rounded-md shadow-sm -space-y-px">
//             <div>
//               <label htmlFor="roomId" className="sr-only">Room ID</label>
//               <input
//                 id="roomId"
//                 name="roomId"
//                 type="text"
//                 autoComplete="off"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
//                 placeholder="Enter  6-digit Room ID"
//                 value={roomId}
//                 onChange={(e) => setRoomId(e.target.value)}
//               />
//             </div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//             >
//               Join Room
//             </button>
//           </form>
//         ) : (
//           <div className="space-y-2">
//             <button
//               type="button"
//               onClick={handleCreateRoomClick}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//             >
//               CREATE A ROOM
//             </button>
//             <button
//               type="button"
//               onClick={handleJoinRoomClick}
//               className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//             >
//               JOIN A ROOM
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Room;
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from "../App.jsx"; // Import the context from App.js

function Room() {
  const { username, socket } = useContext(AppContext); // Use the context to access username and socket
  const navigate = useNavigate();
  const [showRoomIdInput, setShowRoomIdInput] = useState(false);
  const [roomId, setRoomId] = useState('');

  // Set up the WebSocket message listener
  useEffect(() => {
    const handleMessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.action) {
        case "JoinedRoom":
          // Navigate to the board when the player has joined the room
          navigate("/board");
          break;
        // Handle other actions as needed
        default:
          console.log('Unknown action:', message.action);
      }
    };

    socket.addEventListener('message', handleMessage);
    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [navigate, socket]);

  const sendMessage = (action, data = {}) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ action, username, ...data }));
    }
  };

  const handleCreateRoomClick = () => {
    sendMessage('create room');
  };

  const handleJoinRoomClick = () => {
    setShowRoomIdInput(true);
  };

  const handleRoomIdSubmit = (e) => {
    e.preventDefault();
    sendMessage('join room', { roomId });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Join or Create a Room
          </h2>
        </div>
        {showRoomIdInput ? (
          <form onSubmit={handleRoomIdSubmit} className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="roomId" className="sr-only">Room ID</label>
              <input
                id="roomId"
                name="roomId"
                type="text"
                autoComplete="off"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                placeholder="Enter   6-digit Room ID"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Join Room
            </button>
          </form>
        ) : (
          <div className="space-y-2">
            <button
              type="button"
              onClick={handleCreateRoomClick}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              CREATE A ROOM
            </button>
            <button
              type="button"
              onClick={handleJoinRoomClick}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              JOIN A ROOM
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Room;
