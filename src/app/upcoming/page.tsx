"use client";
import GameCard from "@/components/GameCard";
import { Game } from "@/interfaces/ApiInterfaces";
import { getGames } from "@/services/rawg-api";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/esm/Spinner";

const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

const addOneYear = (date: Date): Date => {
  return new Date(date.setFullYear(date.getFullYear() + 1));
};

export default function UpcomingGamesPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      const games = await getGames({
        page: 1,
        page_size: 20,
        dates: `${formatDate(new Date())},${formatDate(
          addOneYear(new Date())
        )}`,
      });
      const sortedGames = games.results.sort((a, b) => {
        return new Date(a.released).getTime() - new Date(b.released).getTime();
      });
      setGames(sortedGames);
      setIsLoading(false);
    };
    fetchGames();
  }, []);
  return (
    <div className="mt-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
        Upcoming Games
      </h1>
      <span className="text-sm text-gray-500">
        Upcoming games are games that are scheduled to be released in the next
        year.
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
