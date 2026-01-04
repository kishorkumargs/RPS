import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Game from "./pages/Game";
import ModeSelect from "./pages/ModeSelect";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/select-mode" element={
          // <ProtectedRoute>
            <ModeSelect/>
          //  </ProtectedRoute>
        }/>
        <Route path="/game" element={
          // <ProtectedRoute>
            <Game/>
          //  </ProtectedRoute>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App