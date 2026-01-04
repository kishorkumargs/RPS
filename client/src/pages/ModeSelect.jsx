import { useNavigate } from "react-router-dom";
import "./ModeSelect.css";

function ModeSelect({ playSound }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative bg-neutral-900 text-white p-15">
      <button className="text-black rounded-sm bg-white font-bold absolute top-4 left-4 px-3 py-2" onClick={() => navigate("/")} id="home-btn">Home</button>
      <title>Select Mode</title>
      <p className="text-xl font-bold text-center ">Choose Your Game Mode</p>
      <p className="text-sm text-center text-neutral-500">Play the way you want - casual or competitive</p>
      <div className="group flex gap-2 px-3 py-2 justify-center">
        <div className="shiny-card group-hover:opacity-50 group-hover:blur-[1px] hover:opacity-100 hover:blur-none text-center max-w-sm border-3 border-white rounded-lg h-fit px-2 py-2 m-1 hover:scale-102 hover:border-cyan-400 cursor-pointer active:scale-98" onMouseEnter={() => playSound("hover")}>
          <p className="m-1 text-2xl">🎲 🤖</p>
          <p className="text-xl font-bold m-1">Random Bot</p>
          <p className="m-2">Play against a purely random opponent.
            Perfect for quick matches and warm-ups</p>
          <p className="flex gap-2 justify-center m-1"><span className="bg-green-500 px-2.5 py-0.5 rounded-full">Casual</span><span className="bg-green-800 px-2.5 py-0.5 rounded-full">No patterns</span></p>
          <button className="rounded-sm bg-white text-black font-bold px-3 py-2 m-1 relative z-10 cursor-default" onClick={() => navigate("/game?mode=random")}>
            Play vs Random Bot
          </button>
        </div>

        <div className="shiny-card group-hover:opacity-50 group-hover:blur-[1px] hover:opacity-100 hover:blur-none text-center max-w-sm border-3 border-white rounded-lg h-fit px-2 py-2 m-1 hover:scale-102 hover:border-cyan-400 cursor-pointer active:scale-98" onMouseEnter={() => playSound("hover")}>
          <p className="m-1 text-2xl">🧠 🤖</p>
          <p className="text-xl font-bold m-1">AI Bot</p>
          <p className="m-2">Face an adaptive opponent that learns your playstyle.</p>
          <p className="flex gap-2 justify-center m-1"><span className="bg-yellow-500 px-2.5 py-0.5 rounded-full">Challenging</span><span className="bg-amber-500 px-2.5 py-0.5 rounded-full">Learn patterns</span></p>
          <button className="rounded-sm bg-white text-black font-bold px-3 py-2 m-1 relative z-10 cursor-default" onClick={() => navigate("/game?mode=ai")}>
            Play vs AI Bot
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModeSelect;