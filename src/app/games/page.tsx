"use client";
import GameCard from "@/components/GameCard";
import { Game } from "@/interfaces/ApiInterfaces";
import { getGames } from "@/services/rawg-api";
import { useState, useEffect } from "react";
export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const games = await getGames({
        page: 1,
        page_size: 20,
      });
      setGames(games.results);
    };
    fetchGames();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-8">
        Games
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <GameCard key={game.id} gameDetails={game} />
        ))}
      </div>
    </div>
  );
}
