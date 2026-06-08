import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import Sidebar from "../sidebar/Sidebar";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [conPwd, setConPwd] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(name);
    if (pwd !== conPwd) {
      alert(
        "Enter the same passwords in Password field and Confirm Password field",
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        pwd,
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      alert("User registered: " + userCredential.user.email);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePwd = (e) => {
    setPwd(e.target.value);
  };

  const handleConPwd = (e) => {
    setConPwd(e.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4 py-12">
      <Sidebar />
      <div
        className="w-full max-w-lg bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 shadow-2xl"
        style={{ boxShadow: "0 10px 30px var(--card-shadow)" }}
      >
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[var(--text-primary)]">
            Create Account
          </h1>

          <p className="text-[var(--text-secondary)] mt-2">
            Join and start building amazing things
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSignup}>
          {/* Name */}
          <div>
            <label className="block text-sm mb-2 text-[var(--text-secondary)]">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] outline-none focus:border-[var(--input-focus)] transition duration-300"
              onInput={handleName}
              value={name}
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-[var(--text-secondary)]">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] outline-none focus:border-[var(--input-focus)] transition duration-300"
              onInput={handleEmail}
              value={email}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm mb-2 text-[var(--text-secondary)]">
              Password
            </label>

            <input
              type="password"
              placeholder="Create password"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] outline-none focus:border-[var(--input-focus)] transition duration-300"
              onInput={handlePwd}
              value={pwd}
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm mb-2 text-[var(--text-secondary)]">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="Confirm password"
              className="w-full px-4 py-3 rounded-xl bg-[var(--input-bg)] border border-[var(--input-border)] text-[var(--text-primary)] outline-none focus:border-[var(--input-focus)] transition duration-300"
              onInput={handleConPwd}
              value={conPwd}
              required
            />
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
            <input type="checkbox" className="mt-1" required />I agree to the
            Terms & Conditions
          </label>

          {/* Button */}
          <button className="w-full py-3 rounded-xl font-semibold text-white bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] transition duration-300 cursor-pointer">
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-[var(--text-muted)] mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--accent-secondary)] hover:text-[var(--accent-primary)] transition"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
