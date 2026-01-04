import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Signup() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("") || firstName + lastName;

  useEffect(() => {
    setName(firstName, lastName);
  }, [firstName, lastName]);

  useEffect(() => {
    if (isAuthenticated) navigate("/select-mode");
  }, [isAuthenticated, navigate]);

  const goToLogin = () => {
    navigate("/login");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("signup", { name, email, password });
      console.log(res);
      navigate("/game");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex justify-center relative bg-neutral-900 h-dvh">
      <title>Sign Up</title>
      <button
        className="text-black rounded-sm bg-white font-bold absolute top-4 left-4 px-3 py-2"
        onClick={() => navigate("/")}
        id="home-btn"
      >
        Home
      </button>
      <button
        className="text-black rounded-sm bg-white font-bold absolute top-4 right-4 px-3 py-2 toggle-theme"
        id="theme-toggled"
      >
        Light Mode
      </button>
      <div className="signup-container border-3 flex flex-col m-20 px-8 py-10 text-white bg-neutral-800 border-white rounded-lg h-fit">
        <div className="text-center mb-4">
          <p className="text-xl font-bold mt-2">Create your account</p>
          <p className="text">Start your journey with us</p>
        </div>
        <form
          id="signup-form" 
          className="text-center" 
          onSubmit={handleSubmit}
        >
          <div className="flex gap-5">
            <div className="flex flex-col gap-1.5 mb-3 text-left text-white">
              <label for="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control border rounded-md p-2 bg-white text-neutral-800"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required={true}
              />
              <div
                className="error-message text-danger"
                id="firstNameError"
              ></div>
            </div>
            <div className="flex flex-col gap-1.5 mb-3 text-left text-white">
              <label for="lastName" className="form-label"> 
                Last Name
              </label>
              <input
                type="text"
                className="form-control border rounded-md p-2 bg-white text-neutral-800"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required={true}
              />
              <div
                className="error-message text-danger"
                id="lastNameError"
              ></div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-left">
            <label for="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control border rounded-md p-2 bg-white text-neutral-800"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={true}
            />
            <div className="error-message text-danger" id="emailError"></div>

            <label for="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control border rounded-md p-2 bg-white text-neutral-800"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />
            <div className="error-message text-danger" id="passwordError"></div>

            <label for="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control border rounded-md p-2 bg-white text-neutral-800"
              id="confirmPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <div
              className="error-message text-danger"
              id="confirmPasswordError"
            ></div>

            <div className="form-check flex gap-1.5 mb-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="terms"
                required
              />
              <label className="form-check-label" for="terms">
                I agree to the{" "}
                <Link href="#" className="text-blue-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="text-blue-700">
                  Privacy Policy
                </Link>
              </label>
              <div className="error-message text-danger" id="termsError"></div>
            </div>
          </div>
          <div className="btn-container">
            <button
              type="submit"
              className="btn rounded-md bg-sky-500 text-white min-w-30 px-3 py-2 font-bold"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="text-center mt-3">
          Already have an account?{" "}
          <button className="text-blue-700 cursor-pointer" onClick={goToLogin}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
