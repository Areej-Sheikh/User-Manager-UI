import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    pathname === path
      ? "bg-blue-600 text-white rounded-full px-4 py-2 font-semibold flex items-center gap-2"
      : "text-gray-700 hover:text-blue-500 px-4 py-2 rounded-full flex items-center gap-2";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Admin Sphere</h1>

      <ul className="flex gap-4 text-lg">
        <li>
          <Link to="/" className={linkClass("/")}>
            <i className="ri-user-add-line ri-lg"></i> Register
          </Link>
        </li>
        <li>
          <Link to="/users" className={linkClass("/users")}>
            <i className="ri-user-line ri-lg"></i> Edit User
          </Link>
        </li>
        <li>
          <Link to="/notifications" className={linkClass("/notifications")}>
            <i className="ri-mail-line ri-lg"></i> Notifications
          </Link>
        </li>
        <li>
          <Link to="/analytics" className={linkClass("/analytics")}>
            <i className="ri-bar-chart-line ri-lg"></i> Analytics
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
