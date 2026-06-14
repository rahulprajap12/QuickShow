import { CalendarDays, LayoutDashboard, List, PlusSquare } from "lucide-react";
import { NavLink } from "react-router-dom";
import { assets } from "../../assets/assets";

const AdminSidebar = () => {
  const user = {
    firstName: "Admin",
    lastName: "User",
    imageUrl: assets.profile,
  };

  const adminNavItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Add Show", path: "/admin/add-show", icon: PlusSquare },
    { name: "List Shows", path: "/admin/list-shows", icon: List },
    { name: "List Bookings", path: "/admin/list-bookings", icon: CalendarDays },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 h-[calc(100vh-64px)] bg-gray-900 text-white px-4 py-6">
      <div className="flex items-center gap-3 border-b border-gray-700 pb-4">
        <img
          src={user.imageUrl}
          alt="Admin"
          className="h-12 w-12 rounded-full object-cover"
        />

        <div>
          <p className="text-sm text-gray-400">Welcome</p>
          <h2 className="font-semibold text-lg">
            {user.firstName} {user.lastName}
          </h2>
        </div>
      </div>

      <nav className="flex flex-col gap-2 mt-6">
        {adminNavItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            <Icon size={20} />
            <span>{name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;