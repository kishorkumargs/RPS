import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game from "./pages/Game";
import ModeSelect from "./pages/ModeSelect";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { unlockAudio, initSounds } from "./services/sound";

function App(){
  let sounds;
  function playSound(type) {
      // Play sound based on result
      unlockAudio().then(() => {
        sounds = sounds || initSounds();
  
        sounds[type]?.play();
        console.log("Played sound: " + type);
      });
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home playSound={playSound}/>}/>
        <Route path="/login" element={<Login playSound={playSound}/>}/>
        <Route path="/forgot-password" element={<ForgotPassword playSound={playSound}/>} />
        <Route path="/reset-password/:token" element={<ResetPassword playSound={playSound}/>} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/select-mode" element={
          // <ProtectedRoute>
            <ModeSelect playSound={playSound}/>
          //  </ProtectedRoute>
        }/>
        <Route path="/game" element={
          // <ProtectedRoute>
            <Game playSound={playSound}/>
          //  </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App