import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { askGemini } from "../../utils/gemini";

export default function Notes() {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState([]);
  const [resReceived, setResReceived] = useState(false);
  const [response, setResponse] = useState("");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const scrollRef = useRef();
  const aiRef = useRef();

  useEffect(() => {
    if (!user) return;

    const notesRef = collection(db, "users", user.uid, "notes");
    const q = query(notesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesData);
    });

    return () => unsubscribe();
  }, [user]);

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in first.");

    try {
      const notesRef = collection(db, "users", user.uid, "notes");
      await addDoc(notesRef, {
        title,
        content,
        shortDes: null,
        btnClicked: false,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setContent("");
    } catch (error) {
      alert("Failed to save note: " + error.message);
    }
  };

  const startEdit = (title, content, id) => {
    setTitle(title);
    setContent(content);
    setId(id);
    setUpdate(true);
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    try {
      const notesRef = doc(db, "users", user.uid, "notes", id);

      await updateDoc(notesRef, {
        title: title,
        content: content,
        createdAt: serverTimestamp(),
      });

      setTitle("");
      setContent("");
      setId("");
      setUpdate(false);
    } catch (error) {
      alert("Failed to save note: " + error.message);
    }
  };

  const handleDelete = (deleteID) => {
    const notesRef = doc(db, "users", user.uid, "notes", deleteID);
    deleteDoc(notesRef);
  };

  const askAI = async (noteContent, noteID) => {
    try {
      console.log("Hi");
      await updateDoc(doc(db, "users", user.uid, "notes", noteID), {
        btnClicked: true,
      });
      const aiRes = await askGemini(
        `Summarize the core takeaways of this note into exactly 1 small paragraph using short phrases. Note text: ${noteContent}`,
      );
      setResponse(aiRes);
      await updateDoc(doc(db, "users", user.uid, "notes", noteID), {
        shortDes: aiRes,
      });
      await updateDoc(doc(db, "users", user.uid, "notes", noteID), {
        btnClicked: false,
      });
      setResReceived(true);
      aiRef.current.style.display = "none";
    } catch (error) {
      alert(
        "model is currently experiencing high demand. Spikes in demand are usually temporary. Please try again later.",
      );
    } finally {
      await updateDoc(doc(db, "users", user.uid, "notes", noteID), {
        btnClicked: false,
      });
    }
  };

  return (
    <div
      style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}
      ref={scrollRef}
    >
      <div className="relative min-h-screen w-full bg-[var(--bg-primary)] px-4 py-12 flex flex-col items-center justify-center overflow-hidden shadow-[0_0_15px_5px_rgba(255,255,255,0.5)] rounded-[25px]">
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-[var(--accent-primary)] opacity-[0.03] blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[var(--accent-secondary)] opacity-[0.02] blur-[120px] pointer-events-none"></div>
        <h2 className="text-3xl font-black tracking-tight text-white text-center mb-8 sm:text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          My Simple Notes
        </h2>

        {/* Creation Form */}
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "30px",
          }}
          className="w-full max-w-lg p-7 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-[0_20px_50px_var(--card-shadow)] ring-1 ring-white/[0.03] backdrop-blur-md space-y-5"
        >
          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ padding: "8px", fontSize: "16px" }}
            className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm font-medium transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)] focus:outline-none focus:bg-[var(--input-bg)] focus:border-[var(--input-focus)] focus:ring-4 focus:ring-[var(--input-focus)]/10"
          />
          <textarea
            placeholder="Write your note content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            style={{ padding: "8px", fontSize: "16px", minHeight: "100px" }}
            className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--input-border)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm font-medium transition-all duration-200 hover:bg-[var(--bg-tertiary)] hover:border-[var(--border-color)] focus:outline-none focus:bg-[var(--input-bg)] focus:border-[var(--input-focus)] focus:ring-4 focus:ring-[var(--input-focus)]/10"
          />
          {!update && (
            <button
              type="submit"
              style={{
                padding: "10px",
                cursor: "pointer",
                background: "#007bff",
                color: "white",
                border: "none",
              }}
              onClick={handleAddNote}
            >
              Save Note
            </button>
          )}
          {update && (
            <button
              type="submit"
              style={{
                padding: "10px",
                cursor: "pointer",
                background: "#007bff",
                color: "white",
                border: "none",
              }}
              onClick={handleUpdateNote}
            >
              Update Note
            </button>
          )}
        </form>

        {/* Rendered Notes List */}
        <div>
          <h3 className="mb-8 text-3xl font-black tracking-tight text-white text-center mb-8 sm:text-4xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
            Your Saved Notes ({notes.length})
          </h3>
          {notes.length === 0 ? (
            <p className="text-white">
              No notes found. Create your first note above!
            </p>
          ) : null}

          {user &&
            notes.map((note) => (
              <div
                key={note.id}
                style={{
                  border: "1px solid #ddd",
                  padding: "15px",
                  borderRadius: "5px",
                  marginBottom: "15px",
                  background: "#f9f9f9",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div>
                  <h2 className="text-xl" style={{ margin: "0 0 10px 0" }}>
                    {note.title}
                  </h2>
                  <p style={{ margin: "0" }}>{note.content}</p>
                </div>
                {resReceived && note.shortDes && (
                  <div class="relative group overflow-hidden rounded-xl p-[2px] shadow-2xl shadow-[var(--card-shadow)] bg-[var(--border-color)]">
                    <div class="absolute inset-[-150%] bg-[conic-gradient(from_0deg,var(--accent-primary),var(--accent-secondary),var(--info),var(--danger),var(--accent-primary))] animate-[spin_3s_linear_infinite] opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div class="relative rounded-[10px] p-5 z-10 backdrop-blur-xl">
                      <div class="space-y-3.5 text-sm text-[var(--text-primary)] font-medium">
                        {note.shortDes}
                      </div>
                    </div>
                  </div>
                )}

                <button
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                  }}
                  onClick={() => askAI(note.content, note.id)}
                  ref={aiRef}
                >
                  {!note.btnClicked ? "Analyse with AI" : "Loading..."}
                </button>
                <div className="grid grid-cols-2 gap-5">
                  <button
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      background: "white",
                      color: "#007bff",
                      border: "1px solid",
                    }}
                    onClick={() => startEdit(note.title, note.content, note.id)}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "10px",
                      cursor: "pointer",
                      background: "red",
                      color: "white",
                      border: "1px solid red",
                    }}
                    onClick={() => handleDelete(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
