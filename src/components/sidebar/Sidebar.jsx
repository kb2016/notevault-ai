import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [sideBarState, setSideBarState] = useState(false);
  const [menuOptState, setMenuOptState] = useState(false);

  const handleSideBar = () => {
    console.log(sideBarState);

    if (!sideBarState) {
      setSideBarState((prev) => !prev);
      setTimeout(() => {
        setMenuOptState((prev) => !prev);
      }, 300);
    } else {
      setSideBarState((prev) => !prev);
      setMenuOptState((prev) => !prev);
    }
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen max-lg:h-auto bg-slate-800 text-white p-5
      transition-all duration-300 ease-in-out max-lg:w-[auto] max-lg:p-3 z-[12]
      ${sideBarState ? "w-64" : "w-20"}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-10 max-lg:mb-0 max-lg:w-[30spx]">
        <ion-icon
          name="reorder-four-outline"
          className="text-3xl cursor-pointer"
          onClick={handleSideBar}
        ></ion-icon>

        <h2
          className={`text-2xl font-bold transition-all duration-300
          ${sideBarState ? "opacity-100" : "opacity-0 hidden"}`}
        >
          Menu
        </h2>
      </div>

      {/* Navigation Links */}
      {menuOptState && (
        <ul className="space-y-4 mt-6">
          <li>
            <Link
              to="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700"
            >
              <ion-icon name="home-outline" className="text-2xl"></ion-icon>

              <span>Homepage</span>
            </Link>
          </li>

          <li>
            <Link
              to="/about"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700"
            >
              <ion-icon name="person-outline" className="text-2xl"></ion-icon>

              <span>About</span>
            </Link>
          </li>

          <li>
            <Link
              to="/contact"
              className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-700"
            >
              <ion-icon name="call-outline" className="text-2xl"></ion-icon>

              <span>Contact Me</span>
            </Link>
          </li>
        </ul>
      )}
    </aside>
  );
};

export default Sidebar;
