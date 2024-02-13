import PlayerOne from './PlayerOne';
import PlayerTwo from './PlayerTwo';
function Board() {
  return (
    <>
      <div className="monitor h-screen w-full flex flex-col p-1 gap-1">
        <div className="relative bg-gray-200 h-[40vh] border-black border-4 rounded-xl p-5 gap-4">
        </div>
        {/* Second and third tabs */}
        <div className="relative flex flex-1">
          <PlayerOne/>
          <PlayerTwo/>
        </div>
      </div>
    </>
  );
}

export default Board;
