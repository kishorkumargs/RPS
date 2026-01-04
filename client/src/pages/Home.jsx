import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Home({ playSound }) {
  const navigate = useNavigate();
  const [savedTheme, setSavedTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  
  return (
    <div className="min-h-screen min-w-fit flex flex-col justify-center bg-neutral-900 text-white">
      <title>Homepage</title>
      <Header playSound={playSound} savedTheme={savedTheme} setSavedTheme={setSavedTheme}/>
      <section id="home" class="container flex flex-col self-center border-3 text-center rounded-lg m-1.5 w-dvw bg-neutral-800 px-2 py-3">
        <p className="text-3xl font-bold mb-3">Welcome to Rock Paper Scissors Game!</p>
        <p>
          Challenge yourself and have fun playing the classic game of Rock Paper
          Scissors against the computer.
        </p>
        <p className="text-gray-300 mt-4 mb-4">
          Play. Compete. Climb the leaderboard.
        </p>
        <div class="btn-container flex gap-6 self-center">
          <button className="bg-white text-black px-3 py-2 rounded-sm font-bold hover:bg-neutral-300" onClick={() => navigate("/game")} id="play-btn">Play Now</button>
          <button className="bg-white text-black px-3 py-2 rounded-sm font-bold hover:bg-neutral-300" id="learn-btn">How to play</button>
        </div>
      </section>

      <section id="about" class="container flex flex-col self-center border-3 rounded-lg m-1.5 w-dvw bg-neutral-800 px-2 py-3">
        <p className="text-2xl font-bold ml-3 mt-3 mb-3">About the Game</p>
        <p className="ml-3 mb-3">
          Rock Paper Scissors is a simple hand game that has been played for
          centuries. The game is played between two players, where each player
          simultaneously forms one of three shapes with an outstretched hand.
          The possible shapes are rock, paper, and scissors. The winner is
          determined based on the rules: rock crushes scissors, scissors cuts
          paper, and paper covers rock.
        </p>
        <p className="ml-3 mb-2">
          In this web-based version, you can play against the computer and keep
          track of your score and rank as you progress through the game. Enjoy
          the fun and excitement of Rock Paper Scissors!
        </p>
      </section>

      <section class="container how-to-play-section flex flex-col self-center border-3 rounded-lg m-1.5 w-dvw bg-neutral-800 px-2 py-3">
        <p className="text-2xl font-bold ml-3 mt-2 mb-3">How to Play</p>
        <ol className="ml-5">
          <li>1️⃣ Select your move: rock, paper, or scissors.</li>
          <li>2️⃣ The computer will randomly select its move.</li>
          <li>
            3️⃣ Compare moves to determine the winner:
            <ul className="ml-5">
              <li>💠 Rock crushes Scissors</li>
              <li>💠 Scissors cuts Paper</li>
              <li>💠 Paper covers Rock</li>
            </ul>
          </li>
          <li>
            4️⃣ Your score will be updated based on the outcome:
            <ul className="ml-5">
              <li>💠 Win: +3 points</li>
              <li>💠 Tie: +1 point</li>
              <li>💠 Loss: -1 point</li>
            </ul>
          </li>
          <li>5️⃣ Try to reach the Pro rank by accumulating points!</li>
        </ol>
      </section>

      <footer className="container flex flex-col self-center border-3 text-center rounded-lg m-1.5 w-dvw bg-neutral-800 px-2 py-3">
        <p>
          &copy; 2025 Rock Paper Scissors Game by Kishor Kumar G S. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
