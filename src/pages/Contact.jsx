import React, { useState, useEffect } from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMsg = (e) => {
    setMsg(e.target.value);
  };

  const saveMessage = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "messages"), {
        name: name,
        email: email,
        message: msg,
        createdAt: serverTimestamp(),
      });
      alert("Thank you for contacting us!");
      setName("");
      setEmail("");
      setMsg("");
      return true;
    } catch (error) {
      alert("Error adding message: ", error);
      return false;
    }
  };

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl">
          {/* HERO */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Let’s Connect</h1>

            <p className="text-[var(--text-secondary)] text-lg">
              Have feedback, ideas, or suggestions for the project? Feel free to
              reach out.
            </p>
          </div>

          {/* CONTACT CARD */}
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 shadow-lg">
            <form className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block mb-2 text-sm text-[var(--text-secondary)]">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--input-focus)]"
                  value={name}
                  onInput={handleName}
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-2 text-sm text-[var(--text-secondary)]">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--input-focus)]"
                  onInput={handleEmail}
                  value={email}
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block mb-2 text-sm text-[var(--text-secondary)]">
                  Message
                </label>

                <textarea
                  rows="6"
                  placeholder="Write your message..."
                  className="w-full bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl px-4 py-3 outline-none focus:border-[var(--input-focus)] resize-none"
                  onInput={handleMsg}
                  value={msg}
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] transition rounded-xl py-3 font-semibold cursor-pointer"
                onClick={saveMessage}
              >
                Send Message
              </button>
            </form>

            {/* SOCIAL LINKS */}
            <div className="mt-10 pt-6 border-t border-[var(--border-color)] flex justify-center gap-6 flex-wrap">
              <a
                href="#"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
              >
                GitHub
              </a>

              <a
                href="#"
                className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition"
              >
                LinkedIn
              </a>
            </div>

            {/* FOOTER */}
            <div className="text-center mt-8 text-sm text-[var(--text-muted)]">
              Built with React, Firebase, and Gemini AI.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
