import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import type { Game, Platform } from "@/interfaces/ApiInterfaces";
import { getLogo } from "./getLogo";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Link from "next/link";
interface GameCardProps {
  gameDetails: Game;
}

const GameCard = ({ gameDetails }: GameCardProps) => {
  return (
    <Link
      href={`/detail/${gameDetails.slug}`}
      className="block hover:scale-105 transition-all duration-300"
    >
      <div className="cursor-pointer group relative rounded-xl overflow-hidden backdrop-blur-md bg-surface hover:bg-surface/190 transition-all duration-300 shadow-lg h-[360px]">
        <div className="relative h-[200px]">
          <div className="image-container h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={gameDetails.background_image || "/placeholder-game.jpg"}
              alt={gameDetails.name}
              className="object-cover  w-full h-full absolute top-0 left-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            ></img>
            {/* <Image
              src={"/placeholder-game.jpg"}
              alt={gameDetails.name}
              fill
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            ></Image> */}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          {gameDetails?.metacritic && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip id="metacritic">Metacritic Score</Tooltip>}
            >
              <div
                className={`text-white absolute top-3 right-3 px-2 py-1 rounded backdrop-blur-xl ${
                  gameDetails.metacritic >= 75
                    ? "bg-primary/20  border border-primary/20"
                    : gameDetails.metacritic >= 50
                    ? "bg-secondary/20  border border-secondary/20"
                    : "bg-accent/20  border border-accent/20"
                } font-medium flex items-center gap-1`}
              >
                <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
                {gameDetails.metacritic}
              </div>
            </OverlayTrigger>
          )}
        </div>
        <div className="p-4 flex flex-col justify-between h-[168px]">
          <h2 className="text-lg font-semibold text-text line-clamp-2">
            {gameDetails.name}
          </h2>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-text/60">
              <FontAwesomeIcon icon={faCalendarDay} className="h-4 w-4" />
              <span>{new Date(gameDetails.released).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              {gameDetails.parent_platforms?.map((platform: Platform) => (
                <OverlayTrigger
                  key={platform.platform.id}
                  placement="top"
                  overlay={
                    <Tooltip id={`tooltip-${platform.platform.id}`}>
                      {platform.platform.name}
                    </Tooltip>
                  }
                >
                  <span className="text-text/60 hover:text-text transition-colors cursor-pointer">
                    {getLogo({
                      platform: platform.platform.slug,
                      className: "h-4 w-4",
                    })}
                  </span>
                </OverlayTrigger>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
