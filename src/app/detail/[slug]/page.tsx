"use client";
import {
  Game,
  Metacritic,
  RedditPost,
  Screenshot,
  ScreenshotAndTrailer,
  Store,
  Trailer,
} from "@/interfaces/ApiInterfaces";
import {
  getGame,
  getGameDLC,
  getGameScreenshots,
  getGameSeries,
  getGameStores,
  getGameTrailers,
  getRedditPosts,
} from "@/services/rawg-api";
import { faCartShopping, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import GameCard from "@/components/GameCard";
import { getStore } from "@/components/getStore";
import { getStoreLogo } from "@/components/getStoreLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import "react-medium-image-zoom/dist/styles.css";
import ScreenshotAndTrailerModal from "@/components/ScreenshotAndTrailerModal";
type Params = {
  slug: string;
};
export default function DetailPage() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const { slug } = useParams<Params>();
  const [game, setGame] = useState<Game | null>(null);
  const [screenshots, setScreenshots] = useState<Screenshot[] | null>(null);
  const [dlc, setDLC] = useState<Game[] | null>(null);
  const [series, setSeries] = useState<Game[] | null>(null);
  const [stores, setStores] = useState<Store[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameId, setGameId] = useState<number | null>(null);
  const [redditPosts, setRedditPosts] = useState<RedditPost[] | null>(null);
  const [trailers, setTrailers] = useState<Trailer[] | null>(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [type, setType] = useState<string | null>(null);
  useEffect(() => {
    if (!slug) return;

    const fetchInitialGame = async () => {
      try {
        const game = await getGame(slug);
        setGame(game);
        setGameId(game.id);
      } catch (error) {
        console.error("Error fetching game:", error);
      }
    };

    fetchInitialGame();
  }, [slug]);
  useEffect(() => {
    if (!gameId) return;

    const fetchAdditionalData = async () => {
      setIsLoading(true);
      try {
        const [screenshots, dlc, series, stores, redditPosts, trailers] =
          await Promise.all([
            getGameScreenshots(gameId),
            getGameDLC(gameId),
            getGameSeries(gameId),
            getGameStores(gameId),
            getRedditPosts(gameId),
            getGameTrailers(gameId),
          ]);

        setScreenshots(screenshots);
        setDLC(dlc);
        setSeries(series);
        setStores(stores);
        setRedditPosts(redditPosts);
        setTrailers(trailers);
      } catch (error) {
        console.error("Error fetching additional data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdditionalData();
  }, [gameId]);

  const screenshots_and_trailers: ScreenshotAndTrailer[] =
    trailers?.concat(screenshots);

  return (
    <div className="mt-8">
      <ScreenshotAndTrailerModal
        type={type ?? ""}
        isOpen={imageModalOpen}
        onClose={() => setImageModalOpen(false)}
        image={image ?? ""}
      />
      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-10 w-2/3 bg-surface rounded-lg"></div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="aspect-video w-full bg-surface rounded-lg"></div>
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-video bg-surface rounded-lg"
                  ></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-surface rounded-lg"></div>
              <div className="h-40 bg-surface rounded-lg"></div>
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-6 bg-surface rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-8">
            {game?.name}
          </h1>
          <div className="rounded-xl overflow-hidden backdrop-blur-md bg-surface  transition-all duration-300 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 p-5">
              <div>
                <div className="relative aspect-video w-full ">
                  <img
                    src={game?.background_image ?? "/placeholder-game.jpg"}
                    alt={game?.name ?? ""}
                    className="object-cover rounded-lg"
                  />
                  {/* <Image
                    src={
                      game?.background_image ?? "/images/placeholder-game.jpg"
                    }
                    alt={game?.name ?? ""}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover rounded-lg"
                    priority
                  /> */}
                </div>
                <div className="mt-4">
                  {screenshots && (
                    <div className="rounded-xl overflow-hidden bg-surface transition-all duration-300 shadow-lg">
                      <div className="p-5">
                        <div className="flex overflow-x-auto gap-4 pb-4 custom-scrollbar-visible">
                          {screenshots_and_trailers?.map(
                            (item: ScreenshotAndTrailer, index) => {
                              return (
                                <div
                                  key={index}
                                  className="cursor-pointer flex-none relative w-[280px] aspect-video rounded-lg overflow-hidden group"
                                  onClick={() => {
                                    setImageModalOpen(true);
                                    if (item?.video) {
                                      setType("trailer");
                                      setImage(item.video);
                                    } else {
                                      setType("screenshot");
                                      setImage(item.image);
                                    }
                                  }}
                                >
                                  <img
                                    src={item.image ?? "/placeholder-game.jpg"}
                                    alt={`${game?.name} screenshot ${
                                      index + 1
                                    }`}
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                  {item.video && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center backdrop-blur-sm border border-white/20 group-hover:bg-primary/80 transition-colors">
                                        <svg
                                          className="w-6 h-6 text-white"
                                          fill="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path d="M8 5v14l11-7z" />
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {game?.metacritic && (
                    <span className="px-3 py-1 rounded-full bg-primary/20 border border-primary/20 text-white">
                      Metacritic: {game.metacritic}
                    </span>
                  )}
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white">
                    Released:{" "}
                    {new Date(game?.released ?? "").toLocaleDateString()}
                  </span>

                  {game?.website && (
                    <a
                      href={game.website}
                      target="_blank"
                      className="px-3 py-1 rounded-full bg-primary border border-white/20 text-black flex items-center gap-2"
                    >
                      <FontAwesomeIcon icon={faGlobe} className="h-3 w-3" />
                      Website
                    </a>
                  )}
                </div>

                <p className="text-gray-200">
                  {game?.description_raw.split("Español")[0]}
                </p>

                <div className="space-y-3">
                  <div className="flex flex-row gap-10">
                    {game?.genres && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-1">
                          Genres
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {game.genres.map((genre) => (
                            <span
                              key={genre.id}
                              className="px-2 py-1 text-sm rounded-full bg-white/10"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {game?.playtime != 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-400 mb-1">
                          Playtime
                        </h3>
                        <p className="px-2 py-1 text-sm rounded-full bg-white/10">
                          {game?.playtime} hours
                        </p>
                      </div>
                    )}
                  </div>
                  {game?.publishers && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 mb-1">
                        Publishers
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {game.publishers.map((publisher) => (
                          <span
                            key={publisher.id}
                            className="px-2 py-1 text-sm rounded-full bg-white/10"
                          >
                            {publisher.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {game?.developers && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 mb-1">
                        Developers
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {game.developers.map((developer) => (
                          <span
                            key={developer.id}
                            className="px-2 py-1 text-sm rounded-full bg-white/10"
                          >
                            {developer.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {game?.platforms && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-400 mb-1">
                        Platforms
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {game.platforms.map(({ platform }) => (
                          <span
                            key={platform.id}
                            className="px-2 py-1 text-sm rounded-full bg-white/10"
                          >
                            {platform.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="mt-10">
        <div className="rounded-xl overflow-x-auto backdrop-blur-md bg-surface  transition-all duration-300 shadow-lg">
          <div className="p-5">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">
              DLC & Other Editions
            </h2>
            {dlc && (
              <div className="flex overflow-x-auto gap-6 pb-4 custom-scrollbar-visible">
                {dlc.map((d) => (
                  <div key={d.id} className="flex-none w-[300px]">
                    <GameCard key={d.id} gameDetails={d} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10">
        <div className="rounded-xl overflow-x-auto backdrop-blur-md bg-surface  transition-all duration-300 shadow-lg">
          <div className="p-5">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">
              Part of Same Series
            </h2>
            {series && (
              <div className="flex overflow-x-auto gap-6 pb-4 custom-scrollbar-visible">
                {series.map((s) => (
                  <div key={s.id} className="flex-none w-[300px]">
                    <GameCard key={s.id} gameDetails={s} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-xl overflow-hidden backdrop-blur-md bg-surface  transition-all duration-300 shadow-lg">
            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-400 mb-4">
                Purchase
              </h2>
              {stores && (
                <div className="flex flex-col gap-4">
                  {stores.map((s) => (
                    <div
                      key={s.store_id}
                      className="flex justify-between gap-20"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            getStoreLogo(getStore(s.store_id)) ??
                            "/placeholder-game.jpg"
                          }
                          alt={getStore(s.store_id)}
                          className="w-8 h-8"
                        />
                        <p>{getStore(s.store_id)}</p>
                      </div>
                      <div>
                        <button
                          className="bg-primary text-black px-4 py-2 rounded-full flex items-center gap-2"
                          onClick={() => {
                            window.open(s.url, "_blank");
                          }}
                        >
                          Buy
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            className="h-3 w-3"
                          />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="rounded-xl overflow-hidden backdrop-blur-md bg-surface  transition-all duration-300 shadow-lg">
            <div className="p-5">
              <h2 className="text-2xl font-bold text-gray-400 mb-4">
                Metacritic Scores
              </h2>

              <div className="flex flex-col gap-2 w-full max-w-md">
                {game?.metacritic_platforms.map(
                  (platform: Metacritic, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-1 px-3 rounded-lg hover:bg-white/5"
                    >
                      <p className="text-gray-  300">
                        {platform.platform.name}
                      </p>
                      <div className="flex-1 border-b border-dotted border-gray-700 mx-4" />
                      <p className="font-semibold text-primary">
                        {platform.metascore}
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="rounded-xl overflow-x-auto backdrop-blur-md bg-surface  transition-all duration-300 shadow-lg">
          <div className="p-5">
            <h2 className="text-2xl font-bold text-gray-400 mb-4">
              Most Recent Reddit Posts
            </h2>
            {redditPosts && (
              <div className="flex flex-wrap gap-4 ">
                {redditPosts.map((post) => (
                  <Link href={post.url} target="_blank" key={post.id}>
                    <div className="border border-gray-700 rounded-lg p-4 w-[300px] h-[200px] overflow-hidden hover:border-primary/50 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={"/reddit-logo.svg"}
                          alt={post.name}
                          className="w-6 h-6"
                        />
                        <div className="text-lg font-bold line-clamp-1">
                          {post.name}
                        </div>
                      </div>
                      {post.image && (
                        <img
                          src={post.image}
                          alt={post.name}
                          className="w-full h-32 object-cover rounded-lg mb-3"
                        />
                      )}
                      <div
                        className="text-gray-400 text-sm line-clamp-4 overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: post.text }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
