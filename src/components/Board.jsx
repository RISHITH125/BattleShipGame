import PlayerOne from './PlayerOne';
import PlayerTwo from './PlayerTwo';
import { AppContext } from "../App.jsx";
import { useContext } from 'react';
function Board() {
  const { username, socket } = useContext(AppContext);
  return (
    <>
      <div className="monitor h-screen w-full flex flex-col p-1 gap-1">
        {/* first segment */}
        <div className="relative bg-gray-200 h-[20vh] border-black border-4 rounded-xl p-5 gap-4">
                   
        </div>
        {/* second segment */}
        <div className="relative flex flex-1">
          <PlayerOne username={username} socket={socket}/>
          <PlayerTwo/>
        </div>
      </div>
    </>
  );
}

export default Board;
