import { NextResponse } from "next/server";

const API_KEY = process.env.RAWG_API_KEY;
const BASE_URL = "https://api.rawg.io/api";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    // Fetch game details
    const gameResponse = await fetch(
      `${BASE_URL}/games/${params.slug}?key=${API_KEY}`
    );
    const gameData = await gameResponse.json();

    // Fetch screenshots
    const screenshotsResponse = await fetch(
      `${BASE_URL}/games/${params.slug}/screenshots?key=${API_KEY}`
    );
    const screenshotsData = await screenshotsResponse.json();

    return NextResponse.json({
      ...gameData,
      screenshots: screenshotsData.results,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch game data" },
      { status: 500 }
    );
  }
}
