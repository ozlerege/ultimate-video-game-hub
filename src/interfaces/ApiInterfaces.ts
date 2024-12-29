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
  name_original: string;
  description: string;
  description_raw: string;
  metacritic_platforms: Metacritic[];
  genres: Genre[];
  tba: boolean;
  updated: string;
  background_image_additional: string;
  website: string;
  rating: number;
  rating_top: number;
  ratings: object;
  reactions: object;
  added: number;
  added_by_status: object;
  playtime: number;
  screenshots_count: number;
  movies_count: number;
  creators_count: number;
  achievements_count: number;
  parent_achievements_count: number;
  reddit_url: string;
  reddit_name: string;
  reddit_description: string;
  reddit_logo: string;
  reddit_count: number;
  twitch_count: string;
  youtube_count: string;
  reviews_text_count: string;
  ratings_count: number;
  suggestions_count: number;
  alternative_names: string[];
  metacritic_url: string;
  parents_count: number;
  additions_count: number;
  game_series_count: number;
  publishers: Publisher[];
  developers: Developer[];
  esrb_rating: {
    id: number;
    slug: string;
    name: string;
  };
  platforms: [
    {
      platform: {
        id: number;
        name: string;
        slug: string;
      };
      released_at: string;
      requirements: {
        minimum: string;
        recommended: string;
      };
    }
  ];
}

export interface Genre {
  id: number;
  name: string;
  slug: string;
}

export interface Screenshot {
  hidden: boolean;
  image: string;
}

export interface Publisher {
  id: number;
  name: string;
  slug: string;
}
export interface Store {
  id: number;
  game_id: number;
  store_id: number;
  url: string;
}

export interface Developer {
  id: number;
  name: string;
  slug: string;
  games_count: number;
  image_background: string;
}

export interface Achievement {
  id: number;
  name: string;
  description: string;
  image: string;
  percent: string;
}

export interface Metacritic {
  metascore: number;
  url: string;
  platform: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface RedditPost {
  id: number;
  name: string;
  text: string;
  image: string;
  url: string;
  username: string;
  username_url: string;
  created: string;
}
