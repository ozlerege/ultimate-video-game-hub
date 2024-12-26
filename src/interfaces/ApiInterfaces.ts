export interface GameList {
  count: 0;
  next: string;
  previous: string;
  results: Game[];
  rating_top: number;
  ratings: object;
  ratings_count: number;
  reviews_text_count: string;
  added: number;
  added_by_status: object;
  metacritic: number;
  playtime: number;
  suggestions_count: number;
  updated: string;
  esrb_rating: {
    id: number;
    slug: string;
    name: string;
  };
  platforms: [
    {
      platform: {
        id: number;
        slug: string;
        name: string;
      };
      released_at: string;
      requirements: {
        minimum: string;
        recommended: string;
      };
    }
  ];
}

export interface Platform {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface Game {
  id: number;
  slug: string;
  name: string;
  released: string;
  background_image: string;
  metacritic: number;
  parent_platforms: Platform[];
}
