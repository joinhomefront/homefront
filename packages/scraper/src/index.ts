import metascraper from "metascraper";
import metascraperAmazon from "metascraper-amazon";
import metascraperAuthor from "metascraper-author";
import metascraperDate from "metascraper-date";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperLogo from "metascraper-logo";
import metascraperPublisher from "metascraper-publisher";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";

const scraper = metascraper([
  metascraperAmazon(),
  metascraperAuthor(),
  metascraperDate(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
  metascraperPublisher(),
  metascraperTitle(),
  metascraperUrl(),
]);

export const getMetadata = async (url: string) => {
  try {
    const response = await fetch(url);
    const html = await response.text();

    const metadata = await scraper({
      html,
      url,
    });

    return metadata;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return { error: "Failed to fetch metadata" };
  }
};

export type Metadata = metascraper.Metadata;
