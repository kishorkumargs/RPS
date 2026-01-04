import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Header( { playSound, savedTheme, setSavedTheme } ) {
  const { isAuthenticated, logout } = useAuth();
  
  
  function toggleTheme() {
    playSound("btn");
    if (savedTheme === "dark") {
      setSavedTheme("light");
    } else {
      setSavedTheme("dark");
    }
  }

  return (
    <header className="top-bar flex justify-between mt-5 p-3 text-center">
      <p className="text-4xl font-bold text-white mb-6">Rock paper scissors</p>
      <nav className="nav-links flex gap-5">
        <p>
          <a href="#home">Home</a>
        </p>
        <p>
          <a href="#about">About</a>
        </p>
      </nav>
      <div className="btn-container flex">
        <button
          className="text-black bg-white h-fit mr-3 rounded-sm px-3 py-2 font-bold toggle-theme"
          id="theme-toggled"
          onClick={toggleTheme}
        >
          Light Mode
        </button>
        {isAuthenticated ? (
          <div className="flex gap-3 justify-end">
            <Link to="/select-mode">
              <button className="call-to-action">Play Now</button>
            </Link>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="flex gap-3 justify-end">
            <Link to="/login">
              <button className="call-to-action text-white bg-amber-400 rounded-sm px-3 py-2 font-bold" onClick={() => playSound("btn")}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="call-to-action text-white bg-amber-400 rounded-sm px-3 py-2 font-bold" onClick={() => playSound("btn")}>
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
