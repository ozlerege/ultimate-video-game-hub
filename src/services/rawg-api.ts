import { Game, GameList } from "@/interfaces/ApiInterfaces";

const RAWG_API_URL = "https://api.rawg.io/api";

export interface GamesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

export interface GetGamesParams {
  page?: number;
  page_size?: number;
  search?: string;
  search_precise?: boolean;
  search_exact?: boolean;
  parent_platforms?: string;
}

// API Key handling
const getApiKey = () => {
  const apiKey = process.env.NEXT_PUBLIC_RAWG_API_KEY;
  if (!apiKey) {
    throw new Error("RAWG API key is not defined in environment variables");
  }
  return apiKey;
};

export const getGames = async (
  params: GetGamesParams = {}
): Promise<GamesResponse> => {
  const apiKey = getApiKey();
  const queryParams = new URLSearchParams({
    key: apiKey,
    ...Object.fromEntries(
      Object.entries(params).filter(([, value]) => value !== undefined)
    ),
  });

  try {
    const response = await fetch(`${RAWG_API_URL}/games?${queryParams}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
};

export const getGameDetails = async (gameId: number): Promise<GameList> => {
  const apiKey = getApiKey();
  const queryParams = new URLSearchParams({ key: apiKey });

  try {
    const response = await fetch(
      `${RAWG_API_URL}/games/${gameId}?${queryParams}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching game details:", error);
    throw error;
  }
};
