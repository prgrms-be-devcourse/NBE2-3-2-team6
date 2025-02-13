import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ category, param }) => {
  const location = useLocation();

  const isActiveUrl = (url) => {
    return location.pathname.startsWith(url);
  };

  return (
    <div className="w-64 bg-white shadow-md min-h-screen p-4">
      <h2 className="text-lg font-bold mb-4">{category}</h2>
      <ul className="space-y-2">
        {param.map(({ key, name, url }) => (
          <li
            key={`SIDEBAR_KEY_${key}`}
            className={`rounded ${
              isActiveUrl(url)
                ? "bg-red-50 text-red-600"
                : "hover:bg-gray-50"
            }`}
          >
            <Link to={url} className="block px-4 py-2">
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;