import { useState } from "react";
import api from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/forgot-password", { email });
      setSent(true);
    } catch (err) {
      // intentionally same UI response
      console.log(err);
      setSent(true);
    }
  };

  if (sent) {
    return <p>If this email exists, a reset link has been sent.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <button type="submit">Send Reset Link</button>
    </form>
  );
}

export default ForgotPassword;
