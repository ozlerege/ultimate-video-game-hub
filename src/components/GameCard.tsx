import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import type { Game, Platform } from "@/interfaces/ApiInterfaces";
import { getLogo } from "./getLogo";

interface GameCardProps {
  gameDetails: Game;
}

const GameCard = ({ gameDetails }: GameCardProps) => {
  return (
    <div className="group relative rounded-xl overflow-hidden backdrop-blur-sm bg-surface/30 hover:bg-surface/50 transition-all duration-300">
      <div className="relative h-48">
        <Image
          src={gameDetails.background_image}
          alt={gameDetails.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        {gameDetails.metacritic && (
          <div
            className={`absolute top-3 right-3 px-2 py-1 rounded backdrop-blur-md ${
              gameDetails.metacritic >= 75
                ? "bg-primary/20 text-primary"
                : gameDetails.metacritic >= 50
                ? "bg-secondary/20 text-secondary"
                : "bg-accent/20 text-accent"
            } font-medium flex items-center gap-1`}
          >
            <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
            {gameDetails.metacritic}
          </div>
        )}
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold text-text mb-3 line-clamp-1">
          {gameDetails.name}
        </h2>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-white/60">
            <FontAwesomeIcon icon={faCalendarDay} className="h-4 w-4" />
            <span>{new Date(gameDetails.released).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            {gameDetails.parent_platforms?.map((platform: Platform) => (
              <span
                key={platform.platform.id}
                className="text-white/60 hover:text-white transition-colors"
              >
                {getLogo({
                  platform: platform.platform.slug,
                  className: "h-4 w-4",
                })}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
