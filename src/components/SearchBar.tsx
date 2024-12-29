"use client";
import { Game } from "@/interfaces/ApiInterfaces";
import { getGames } from "@/services/rawg-api";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (query.length > 2) {
      const fetchGames = async () => {
        const games = await getGames({
          search: query,
        });
        setGames(games.results);
        setIsOpen(true);
      };
      fetchGames();
    } else {
      setIsOpen(false);
    }
  }, [query]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      console.log(event.target);
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div className="relative w-full mx-auto" ref={searchRef}>
      <input
        type="text"
        placeholder="Search a game..."
        className="w-full p-3 rounded-lg bg-white/[0.08] text-white"
        onChange={handleSearch}
        onFocus={() => games.length > 0 && setIsOpen(true)}
      />

      {games.length > 0 && isOpen && (
        <div className="absolute z-50 left-4 right-4 mt-2 max-h-[30vh] overflow-y-auto rounded-lg bg-white/[0.150] backdrop-blur-xl shadow-lg">
          {games?.map((game) => (
            <Link
              href={`/detail/${game.slug}`}
              key={game.id}
              onClick={() => setIsOpen(false)}
            >
              <div
                key={game.id}
                className="p-3 hover:bg-white/[0.12] transition-colors cursor-pointer border-b border-white/[0.05] last:border-none"
              >
                <div className="flex items-center gap-4">
                  {game.background_image && (
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <h3 className="text-black font-bold truncate">
                      {game.name}
                    </h3>
                    <p className="text-black text-sm">
                      {game.released?.split("-")[0]}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
