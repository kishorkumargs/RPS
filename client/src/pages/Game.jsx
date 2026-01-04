import { useState, useEffect } from "react";
import api from "../services/api";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Leaderboard from "../components/Leaderboard";
import { initSounds, unlockAudio } from "../services/sound";

function Game() {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "random";
  const [gameMode] = useState(mode);
  const [savedTheme, setSavedTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );
  const [wins, setWins] = useState(0);
  const [loses, setLoses] = useState(0);
  const [ties, setTies] = useState(0);
  const [score, setScore] = useState(0);
  const [tries, setTries] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [rank, setRank] = useState("Newbie");
  const [currentMove, setCurrentMove] = useState("");
  const [resultText, setResultText] = useState("");
  const [showGameOverModel, setShowGameOverModel] = useState(false);
  const [newlyLoaded, setNewlyLoaded] = useState(false);
  const facts = [
    "Rock Paper Scissors originated in ancient China over 2000 years ago.",
    `The game is known as "Jan-Ken" in Japan.`,
    `It's used to make decisions fairly in many countries!`,
    "In 2005, a man won a $20 million art deal using Rock Paper Scissors!",
    "This game first appeared in China in the 17th century. Yes, it was not invented in Europe or America but in Asia. Europe started to play this game only in 19th century",
    "Statistics say that people usually choose Scissors in the first round and Rock in the second",
    "There is a robot developed in Japan which wins with 100% chance. It analyzes movement of your hand muscles to predict what choice you'll show",
    "The World Rock Paper Scissors Championship has been held annually since 2002",
    "There are online tournaments, local competitions, and even professional leagues with cash prizes reaching thousands of dollars"
  ];
  const navigate = useNavigate();
  const MAX_TRIES = 50;

  useEffect(() => {
    setNewlyLoaded(true);
  }, [])
  async function finishGame(finalScore) {
    try {
      await api.post("/game/finish", {
        score: finalScore,
        mode: gameMode,
      });
      setRefreshKey((p) => p + 1);
    } catch (err) {
      console.error("Failed to save game stats", err);
    }
  }
  let sounds;
  function playSound(type) {
    // Play sound based on result
    unlockAudio().then(() => {
      sounds = sounds || initSounds();

      sounds[type]?.play();
      console.log("Played sound: " + type);
    });
  }
  function toggleTheme() {
    playSound("btn");
    if (savedTheme === "dark") {
      setSavedTheme("light");
    } else {
      setSavedTheme("dark");
    }
  }

  function resetScore() {
    playSound("btn");
    setWins(0);
    setLoses(0);
    setTies(0);
    setRank("Newbie");
    setScore(0);
    setTries(0);
    localStorage.removeItem("score");
  }

  let scores = JSON.parse(localStorage.getItem("score")) || {
    win: 0,
    lose: 0,
    tie: 0,
    total: 0,
    rank: "Newbie",
    tries: 0,
  };

  // To retrive the rank of the player based on score
  function getRank(totalPoints) {
    if (totalPoints >= 55) {
      setRank("Pro");
      scores.rank = "Pro";
    } else if (totalPoints >= 35) {
      setRank("Intermediate");
      scores.rank = "Intermediate";
    } else if (totalPoints >= 20) {
      setRank("Newbie");
      scores.rank = "Newbie";
    }
  }

  function getBotMove() {
    if (gameMode === "random") {
      const moves = ["rock", "paper", "scissors"];
      let move = Math.random();
      return moves[Math.floor(move * 3)];
    }
    if (gameMode === "ai") {
      // temporary fallback (AI later)
      const moves = ["rock", "paper", "scissors"];
      return moves[Math.floor(Math.random() * 3)];
    }
  }

  function playMove(playerMove) {
    let result = 0;
    const computerMove = getBotMove();
    if (playerMove === computerMove) {
      result = 1;
      playSound("tie");
      setResultText("Tie");
      setTies((t) => t + 1);
    } else if (
      (playerMove === "rock" && computerMove === "scissors") ||
      (playerMove === "paper" && computerMove === "rock") ||
      (playerMove === "scissors" && computerMove === "paper")
    ) {
      result = 3;
      playSound("win");
      setResultText("You win");
      setWins((w) => w + 1);
    } else {
      result = -1;
      playSound("lose");
      setResultText("You lose");
      setLoses((l) => l + 1);
    }
    setCurrentMove(`You <img src="icons/${playerMove}-emoji.png" className="w-30 h-30 m-2 px-8 py-8"/>
      - <img src="icons/${computerMove}-emoji.png" className="w-30 h-30 m-2 px-8 py-8/> Computer`);

    setScore((s) => s + result);
    setTries((prev) => prev + 1);
    getRank(score);
    if (tries+1 === 50) {
      playSound("gameOver");
      setShowGameOverModel(true);
      setTimeout(() => {
        finishGame(score);
      }, 700);
    }
  }
  return (
    <>
      <title>GamePage</title>
      <div className="flex flex-col relative px-5 shrink-0 bg-neutral-900 h-dvh">
        <button className="text-black rounded-sm bg-white font-bold absolute top-2 left-4 px-3 py-2" onClick={() => navigate("/")} id="home-btn">Home</button>
        <button className="text-black rounded-sm bg-white font-bold absolute top-13.5 left-4 px-3 py-2" onClick={() => navigate("/select-mode")} id="home-btn">Select Mode</button>
        <div className="flex relative justify-end">
          <button
            className="text-black font-bold bg-white m-1 rounded-sm px-3.5 py-1.5 max-w-30 absolute top-1"
            id="theme-toggled"
            onClick={toggleTheme}
          >
            {savedTheme === "dark" ? `Light Mode` : `Dark Mode`}
          </button>
          <button
            className="text-black font-bold bg-white m-1 rounded-sm px-3.5 py-1.5 max-w-30 absolute top-12"
            onClick={() => navigate("/")}
            id="logout-btn"
          >
            Logout
          </button>
        </div>
        <div className="flex gap-5 mt-25">
          <div className="flex-3 bg-neutral-900 text-white px-5 py-3 rounded-lg border-3 border-white self-center">
            <p className="font-bold text-3xl mb-3 text-center">
              Rock Paper Scissors
            </p>
            <div className="container flex justify-center self-center  mb-5 border-3 border-white rounded-lg px-5 py-3">
              <button
                className="w-30 h-30 border-3 rounded-full m-2 px-8 py-8 active:w-28 active:h-28 active:m-2"
                onClick={() => playMove("rock")}
              >
                <img
                  src="icons/rock-emoji.png"
                  className="active:h-8 h-12 object-center"
                  alt="rock-img"
                />
              </button>
              <button
                className="w-30 h-30 border-3 rounded-full m-2 px-8 py-8 active:w-28 active:h-28 active:m-2"
                onClick={() => playMove("paper")}
              >
                <img
                  src="icons/paper-emoji.png"
                  className="active:h-8 h-12 object-center"
                  alt="paper-img"
                />
              </button>
              <button
                className="w-30 h-30 border-3 rounded-full m-2 px-8 py-8 active:w-28 active:h-28 active:m-2"
                onClick={() => playMove("scissors")}
              >
                <img
                  src="icons/scissors-emoji.png"
                  className="active:h-8 h-12 object-center"
                  alt="scissors-img"
                />
              </button>
            </div>
            <div className="flex flex-col gap-3 text-center self-center border-3 border-white px-5 py-3 rounded-lg mb-3">
              <p className="result font-bold text-xl">
                {resultText}
              </p>
              <p 
                className="moves text-center"
                >
                  {currentMove}</p>
              <p className="scores">
                Wins: <span id="win">{wins} </span> Loses:{" "}
                <span id="lose">{loses}</span> Ties:{" "}
                <span id="tie">{ties}</span>
              </p>
              <p className="score">
                Total Score: <span id="total">{score}</span>
              </p>
              <p className="score">
                Tries Left: <span id="tries">{MAX_TRIES - tries}</span>
              </p>
              <p className="score">
                High score:{" "}
                <b>
                  <span id="high_score_main">-</span>
                </b>
              </p>
              <p className="score">
                Rank: <span className="font-bold">{rank}</span>
              </p>
              <button
                className="text-white bg-sky-500 self-center font-bold w-fit m-1 rounded-sm px-3 py-2"
                onClickCapture={resetScore}
                id="resetScore"
                onClick={() => {}}
              >
                Reset Score
              </button>
            </div>

            {/* <div className="text-center self-center border-3 border-white px-5 py-3 rounded-lg mb-3">
              <button className="text-white bg-sky-500 m-1 rounded-md px-3 py-2" onClick={() => playSound("win")}>Win</button>
              <button className="text-white bg-sky-500 m-1 rounded-md px-3 py-2" onClick={() => playSound("lose")}>Lose</button>
              <button className="text-white bg-sky-500 m-1 rounded-md px-3 py-2" onClick={() => playSound("tie")}>Tie</button>
              <button className="text-white bg-sky-500 m-1 rounded-md px-3 py-2" onClick={() => playSound("btn")}>Btn</button>
              <button className="text-white bg-sky-500 m-1 rounded-md px-3 py-2" onClick={() => playSound("gameOver")}>Game Over</button>
              <button className="text-white bg-sky-500 m-1 rounded-md px-3 py-2" onClick={() => playSound("highScore")}>High Score</button>
              <button className="text-white bg-sky-500 m-1 rounded-md px-3 py-2" onClick={() => playSound("playBtn")}>Play btn</button>
            </div> */}
          </div>
          <div className="flex-1 bg-neutral-900 text-white px-2 py-1 rounded-lg border-3 border-white">
            <Leaderboard refreshKey={refreshKey} />
          </div>
          {/* Pop-up  */}
          {newlyLoaded && <div className="flex flex-col max-w-200 bg-neutral-50 bg-blend-screen text-black rounded-lg px-17 py-15 absolute" id="pop-up-container">
            <div class="pop-up-content">
              <p id="heading">Welcome to Rock Paper Scissors!</p>
              <p>
                Rock Paper Scissors is a fun and interactive web-based game
                built using HTML, CSS, and JavaScript.
                <br />
                <br />
                Play against the computer and test your luck in this digital
                version of the timeless hand game!
              </p>
              <ul>
                <li>✊ Rock beats Scissors</li>
                <li>✋ Paper beats Rock</li>
                <li>✌️ Scissors beats Paper</li>
              </ul>
              <p>
                Each win gives you <b>+3 points</b>, a tie gives you{" "}
                <b>+1 point</b>, and a loss deducts <b>1 points</b>. <br />
                Rank is determined by your total points:
              </p>
              <ul>
                <li>Newbie (0-9)</li>
                <li>Beginner (10-29)</li>
                <li>Intermediate (30-49)</li>
                <li>Pro (50+)</li>
              </ul>
              <p>
                Try to reach the <b>Pro</b> rank!
              </p>
              <p id="did-you-know">
                <b>Fun Fact:</b>
                <br />
                <b>Did you know? </b>
                {facts[Math.floor(Math.random()* facts.length)]}
              </p>
              <button className="close-btn" onClick={() => setNewlyLoaded(false)}>Start Game !</button>
            </div>
          </div>
          }
          {/* Game Over Modal  */}
          {showGameOverModel && <div id="game-over-modal" className="modal hide-model self-center align-middle text-white absolute text-center border-3 bg-amber-300 rounded-lg px-3 py-2 ">
            <div class="modal-content">
              <h2>Game Over!</h2>
              <p>
                You've reached the maximum of <b>50 tries</b>.
              </p>
              <p>
                Your final score:{score}
                <b>
                  <span id="final-score"></span>
                </b>
              </p>
              <p>
                High score:{score}
                <b>
                  <span id="high_score_modal"></span>
                </b>
              </p>
              <button onClick={() => setShowGameOverModel(false)} id="restart-btn">Restart Game</button>
            </div>
          </div>}
        </div>
      </div>
    </>
  );
}

export default Game;
