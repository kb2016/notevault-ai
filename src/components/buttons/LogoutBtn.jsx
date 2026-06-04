import { useAuth } from "../../context/AuthContext";

const LogoutBtn = ({ logout }) => {
  const { user } = useAuth();
  return (
    <button
      className={`px-5 py-2.5 bg-transparent  text-[var(--text-secondary)] border border-[var(--border-color)] font-medium text-sm rounded-lg transition-all duration-200 absolute top-[25px] right-[50px] ${user ? "hover:bg-[var(--danger)] hover:border-[var(--danger)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--danger)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] hover:text-white cursor-pointer" : ""}`}
      onClick={logout}
      disabled={user ? false : true}
    >
      Log out
    </button>
  );
};

export default LogoutBtn;
