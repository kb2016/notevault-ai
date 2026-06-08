import React, { useRef } from "react";
import Sidebar from "../components/sidebar/Sidebar";

const features = [
  {
    title: "Smart AI Summaries",
    description: "Generate concise summaries from long-form notes instantly.",
    icon: "🧠",
  },
  {
    title: "Knowledge Workspace",
    description:
      "Store and manage ideas in a beautiful productivity dashboard.",
    icon: "📚",
  },
];

const techStack = [
  "React",
  "JavaScript",
  "Tailwind CSS",
  "Firebase",
  "Gemini API",
];

export default function About() {
  const featuresRef = useRef();

  const slideToFeature = () => {
    console.log(featuresRef.current);

    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Sidebar />
      <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] px-6 py-12">
        <div className="max-w-6xl mx-auto">
          {/* HERO */}
          <section className="text-center mb-20">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Build Your Personal <br />
              AI-Powered Knowledge Space
            </h1>

            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-8">
              NoteVault helps you capture ideas, organize thoughts, and generate
              intelligent insights from your notes.
            </p>

            <div className="flex justify-center gap-4 mt-8 flex-wrap">
              <button
                className="bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] transition px-6 py-3 rounded-xl font-medium cursor-pointer"
                onClick={slideToFeature}
              >
                Explore Features
              </button>

              <a
                className="border border-[var(--border-color)] hover:bg-[var(--bg-hover)] transition px-6 py-3 rounded-xl font-medium cursor-pointer"
                href="https://github.com/kb2016/notevault-ai"
                target="_blank"
              >
                GitHub Repo
              </a>
            </div>
          </section>

          {/* MISSION */}
          <section className="mb-20">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-10">
              <h2 className="text-3xl font-semibold mb-6">Our Mission</h2>

              <p className="text-[var(--text-secondary)] leading-8 text-lg">
                This project was created to explore modern frontend development
                and AI integration using React, Firebase, Tailwind CSS, and
                Gemini API. The goal is to build a clean and interactive
                knowledge management experience while showcasing responsive UI
                design, AI-powered features, and modern web application
                architecture.
              </p>
            </div>
          </section>

          {/* FEATURES */}
          <section className="mb-20" ref={featuresRef}>
            <h2 className="text-3xl font-semibold mb-10 text-center">
              Features
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 hover:translate-y-[-4px] transition duration-300"
                >
                  <div className="text-4xl mb-4">{feature.icon}</div>

                  <h3 className="text-2xl font-semibold mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-[var(--text-secondary)] leading-7">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* WHY AI */}
          <section className="mb-20">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-10">
              <h2 className="text-3xl font-semibold mb-6">Why AI?</h2>

              <p className="text-[var(--text-secondary)] leading-8 text-lg">
                Modern productivity tools should do more than store information.
                <br />
                <br />
                By integrating AI, the app helps users:
              </p>

              <ul className="mt-6 space-y-4 text-[var(--text-secondary)]">
                <li>• Understand ideas faster</li>
                <li>• Organize thoughts intelligently</li>
                <li>• Improve productivity</li>
                <li>• Focus on meaningful work</li>
              </ul>
            </div>
          </section>

          {/* TECH STACK */}
          <section className="mb-20">
            <h2 className="text-3xl font-semibold mb-10 text-center">
              Tech Stack
            </h2>

            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="px-5 py-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)]"
                >
                  {tech}
                </div>
              ))}
            </div>
          </section>

          {/* FUTURE */}
          <section>
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-10">
              <h2 className="text-3xl font-semibold mb-6">Future Vision</h2>

              <ul className="space-y-4 text-[var(--text-secondary)] text-lg">
                <li>• Voice notes</li>
                <li>• Knowledge graph visualization</li>
                <li>• AI chat assistant</li>
                <li>• Collaborative workspaces</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
