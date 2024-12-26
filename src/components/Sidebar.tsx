import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faFire,
  faCalendar,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const navItems = [
    { name: "Games", href: "/games", icon: faGamepad },
    { name: "Trending", href: "/trending", icon: faFire },
    { name: "Calendar", href: "/calendar", icon: faCalendar },
    { name: "News", href: "/news", icon: faNewspaper },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 backdrop-blur-md bg-surface/30 p-6 border-r border-white/[0.08]">
      <div className="flex flex-col h-full">
        <div className="mb-10">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            GameHub
          </h1>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/[0.08] group"
                >
                  <FontAwesomeIcon
                    icon={item.icon}
                    className="h-5 w-5 text-white/60 group-hover:text-primary transition-colors"
                  />
                  <span className="font-medium text-white/80 group-hover:text-white transition-colors">
                    {item.name}
                  </span>
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
