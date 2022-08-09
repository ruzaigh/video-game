
export interface Game {
  id: number;
  background_image: string;
  image: string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publishers>;
  ratings: Array<Rating>;
  screenshoots: Array<Screenshoot>;
  trailers: Array<Trailer>;
  slug: string;
  name: string;
}
export interface APIResponse<T> {
  results: Array<T>;
}
interface Genre {
  name: string;
}
interface ParentPlatform {
  platform: {
    name: string;
    slug: string;
  };
}
interface Publishers {
  name: string;
}
interface Rating {
  id: number;
  count: number;
  title: string;
}
interface Screenshoot {
  image: string;
}
interface Trailer {
  data: {
    max: string;
  };
}
