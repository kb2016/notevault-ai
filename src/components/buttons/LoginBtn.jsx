import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <Link
      to="/login"
      className="px-5 py-2.5 bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] text-[var(--text-primary)] hover:text-white border border-[var(--border-color)] font-medium text-sm rounded-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] min-w-[15%] text-center text-[20px]"
    >
      Log in
    </Link>
  );
};

export default LoginBtn;
