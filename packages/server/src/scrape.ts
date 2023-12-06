import * as cheerio from "cheerio";
import { Category, Product } from "./types";

const loadContents = (uri = "") =>
  fetch(`https://buyersguide.macrumors.com/${uri}`).then((r) => r.text());

const getProduct = ($: cheerio.CheerioAPI, anchor: string) => {
  const el = $(`a[name='${anchor}'] + div`);
  const name = $(el).find("h2 > a").text();
  const rows = $(el).find("div[class^=releasesRows]").children();
  const advice = {
    conclusion: $(el).find("*[class^=productBuyStatus]").text(),
    note: $(el).find("*[class^=statusCell]").text(),
  };
  const [lastReleaseRow, averageRow, recentRows] = rows;
  const lastRelease = $(lastReleaseRow).find("div[class^=date] > a").text();
  const daysSinceLastRelease = $(lastReleaseRow).find("*[class^=days]").text();
  const average = $(averageRow).find("*[class^=days]").text();
  const recentReleases: Product["recentReleases"] = [];
  $(recentRows)
    .find("div[class^=right]")
    .children()
    .each((_i, el) => {
      const date = $(el).find("div[class^=date] > a").text();
      const daysSince = $(el).find("*[class^=days]").text();
      recentReleases.push({ date, daysSince });
    });

  return {
    name,
    lastRelease,
    daysSinceLastRelease,
    average,
    advice,
    recentReleases,
  };
};

const getCategory = async (name: string, contentClass: string) => {
  const contents = await loadContents(`#${contentClass}`);
  const $ = cheerio.load(contents);
  const products: Product[] = [];
  $(`#pane-${contentClass}`)
    .find("ul[class^='chooser']")
    .children("li")
    .each((_i, el) => {
      products.push(getProduct($, $(el).children("a").attr("href")!));
    });

  return { name, contentClass, products };
};

export const scrape = () => {
  const presetCategories = [
    {
      name: "iPhone/iPad",
      contentClass: "ios",
    },
    {
      name: "Macs",
      contentClass: "mac",
    },
    {
      name: "Music",
      contentClass: "music",
    },
    {
      name: "Other",
      contentClass: "other",
    },
  ];

  const promises: Promise<Category>[] = [];
  presetCategories.forEach(({ name, contentClass }) =>
    promises.push(getCategory(name, contentClass))
  );
  return Promise.all(promises);
};
