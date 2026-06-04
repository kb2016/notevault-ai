import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPwd, setLoginPwd] = useState("");

  const navigate = useNavigate();

  const handleLoginEmail = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPwd = (e) => {
    setLoginPwd(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPwd,
      );
      alert("Logged in as: " + userCredential.user.email);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      <Sidebar />
      <div
        className="w-full max-w-md bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl  mt-8"
        style={{ boxShadow: "0 10px 30px var(--card-shadow)" }}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">
            Welcome Back
          </h1>

          <p className="text-[var(--text-secondary)] mt-2">
            Login to continue your journey
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-[var(--text-secondary)]">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] outline-none focus:border-[var(--input-focus)] transition duration-300"
              value={loginEmail}
              onInput={handleLoginEmail}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2 text-[var(--text-secondary)]">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] outline-none focus:border-[var(--input-focus)] transition duration-300"
              value={loginPwd}
              onInput={handleLoginPwd}
            />
          </div>

          {/* Button */}
          <button className="w-full py-3 rounded-xl font-semibold text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] transition duration-300 cursor-pointer">
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[var(--text-muted)] mt-6">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-[var(--accent-secondary)] hover:text-[var(--accent-primary)] transition"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
