"use client";
import GameCard from "@/components/GameCard";
import { Game } from "@/interfaces/ApiInterfaces";
import { getGames } from "@/services/rawg-api";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";
export default function GamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const games = await getGames({
        page: 1,
        page_size: 20,
      });
      setGames(games.results);
      setIsLoading(false);
    };
    fetchGames();
  }, []);

  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Games
      </h1>
      <span className="text-sm text-text font-medium">
        Discover the best games on the platform
      </span>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          games.map((game) => <GameCard key={game.id} gameDetails={game} />)
        )}
      </div>
    </div>
  );
}
