import LoginBtn from "../components/buttons/LoginBtn";
import LogoutBtn from "../components/buttons/LogoutBtn";
import SignupBtn from "../components/buttons/SignupBtn";
import Notes from "../components/notes/Notes";
import Sidebar from "../components/sidebar/Sidebar";
import { useAuth } from "../context/AuthContext";

const Homepage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="bg-[var(--bg-primary)] h-screen">
      <Sidebar />
      <div>
        <div className=" p-10 rounded-xl bg-[var(--bg-primary)]">
          <div className="max-w-[600px] mx-auto p-[20px]">
            {user && (
              <h1 className="text-[32px] font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--info)] bg-clip-text text-transparent mb-1 text-center animate-fade-in">
                Hello {user ? user?.displayName : "User"}
              </h1>
            )}
            {!user && (
              <div class="relative overflow-hidden bg-[var(--bg-primary)] px-6 py-16 text-center sm:py-24">
                <div class="absolute inset-0 bg-[linear-gradient(to_right,var(--border-color)_1px,transparent_1px),linear-gradient(to_bottom,var(--border-color)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

                <div class="relative z-10 max-w-3xl mx-auto space-y-5">
                  <h1 class="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl text-white">
                    Note
                    <span class="bg-gradient-to-r from-[var(--accent-primary)] via-[var(--accent-secondary)] to-[var(--info)] bg-clip-text text-transparent drop-shadow-[0_2px_15px_rgba(94,234,212,0.2)]">
                      Vault
                    </span>
                  </h1>

                  <p class="mx-auto max-w-2xl text-base sm:text-lg leading-relaxed text-[var(--text-secondary)] font-medium">
                    Organize your personal notes securely with isolated user
                    subcollections and automated AI text processing.
                  </p>
                </div>

                <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[var(--accent-secondary)] opacity-5 blur-[120px] pointer-events-none"></div>
              </div>
            )}

            {user && <LogoutBtn logout={logout} />}
          </div>

          {user && (
            <main style={{ marginTop: "20px" }}>
              <Notes />
            </main>
          )}
          {!user && (
            <div className="flex gap-12 items-center justify-center">
              <LoginBtn />
              <SignupBtn />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
