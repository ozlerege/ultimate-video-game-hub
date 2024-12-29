"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faFire,
  faCalendar,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Games", href: "/games", icon: faGamepad },
    { name: "Trending", href: "/trending", icon: faFire },
    { name: "Upcoming", href: "/upcoming", icon: faCalendar },
    { name: "News", href: "/news", icon: faNewspaper },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 backdrop-blur-md bg-surface/30 border-r border-white/[0.08] z-50">
      <div className="flex flex-col h-full p-6">
        <div className="mb-10">
          <Link href="/" className="block">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              GameHub
            </h1>
          </Link>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                      ${
                        isActive
                          ? "bg-white/[0.08] text-white"
                          : "hover:bg-white/[0.08] text-white/60 hover:text-white"
                      }`}
                  >
                    <FontAwesomeIcon
                      icon={item.icon}
                      className={`h-5 w-5 transition-colors
                        ${
                          isActive
                            ? "text-primary"
                            : "text-white/60 group-hover:text-primary"
                        }`}
                    />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
