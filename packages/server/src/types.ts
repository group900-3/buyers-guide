export interface Category {
  name: string;
  contentClass: string;
  products: Product[];
}

export interface Product {
  name: string;
  advice: {
    conclusion: string;
    note: string;
  };
  average: string;
  lastRelease: string;
  daysSinceLastRelease: string;
  recentReleases: {
    date: string;
    daysSince: string;
  }[];
}

export type Env = {
  DB: D1Database;
};
