import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useState , useEffect} from "react";
import api from "../services/api";

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  // Email and password is Link state variable as it must be updated from form using onChange event handler
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(isAuthenticated) navigate("/select-mode");
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate("/select-mode");
      // Prevent the page from reloading after the form submission

      try {
        const res = await api.post("/login", {email, password});
        login(res.data.user, res.data.accessToken);
        navigate("/game");
      } catch (e) {
        alert("Invalid credentials", e);
      }
  };

  const goToSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="flex justify-center relative bg-neutral-900 h-dvh">
      <button className="text-black rounded-sm bg-white font-bold absolute top-4 left-4 px-3 py-2" onClick={() => navigate("/")} id="home-btn">Home</button>
      <button className="text-black rounded-sm bg-white font-bold absolute top-4 right-4 px-3 py-2 toggle-theme" id="theme-toggled">Light Mode</button>
      <div className="container max-w-sm border-3 flex flex-col m-20 px-8 py-10 text-white bg-neutral-800 border-white rounded-lg h-fit">
        <div className="text-center mb-4">
          <h2 className="heading font-bold mt-2">Rock Paper Scissors</h2>
          <p className="text">Welcome back</p>
        </div>
        <form
          method="POST"
          id="login-form"
          className="w-82 self-center"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              className="form-control border rounded-md p-2 bg-white text-neutral-800"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <label for="password" className="form-label">
              Password
            </label>
            <input
              className="form-control border rounded-md p-2 bg-white text-neutral-800"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
          </div>

          <div className="flex justify-between m-1">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberMe"
              />
              <label className="form-check-label" for="rememberMe">
                Remember me
              </label>
            </div>
            <Link to="/forgot-password" id="forgotPassword" className="text-decoration-none">
              Forgot password?
            </Link>
          </div>
          <div className="btn-container m-3 flex justify-center">
            <button
              type="submit"
              id="login-btn"
              className="btn rounded-sm bg-sky-500 text-white font-bold min-w-30 p-2"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <button className="text-primary" onClick={goToSignup}>
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
