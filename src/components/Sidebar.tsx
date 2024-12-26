import Link from "next/link";
import {
  PuzzlePieceIcon,
  FireIcon,
  CalendarIcon,
  NewspaperIcon,
} from "@heroicons/react/24/outline";

const Sidebar = () => {
  const navItems = [
    { name: "Games", href: "/games", icon: PuzzlePieceIcon },
    { name: "Trending", href: "/trending", icon: FireIcon },
    { name: "Calendar", href: "/calendar", icon: CalendarIcon },
    { name: "News", href: "/news", icon: NewspaperIcon },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 text-white p-4">
      <div className="flex flex-col h-full">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">GameHub</h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="h-6 w-6" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
