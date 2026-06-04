import { Link } from "react-router-dom";

const SignupBtn = () => {
  return (
    <Link
      to="/signup"
      className="px-5 py-2.5 bg-[image:var(--gradient-primary)] hover:opacity-90 text-[var(--bg-primary)] font-semibold text-sm rounded-lg shadow-lg shadow-[var(--card-shadow)] transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-primary)] min-w-[15%] text-center text-[20px]"
    >
      Sign up
    </Link>
  );
};

export default SignupBtn;
