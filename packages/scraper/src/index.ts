import metascraper from "metascraper";
import metascraperAmazon from "metascraper-amazon";
import metascraperAuthor from "metascraper-author";
import metascraperDate from "metascraper-date";
import metascraperDescription from "metascraper-description";
import metascraperImage from "metascraper-image";
import metascraperLogo from "metascraper-logo";
import metascraperLogoFavicon from "metascraper-logo-favicon";
import metascraperPublisher from "metascraper-publisher";
import metascraperTitle from "metascraper-title";
import metascraperUrl from "metascraper-url";
import metascraperYoutube from "metascraper-youtube";

const scraper = metascraper([
  metascraperAmazon(),
  metascraperAuthor(),
  metascraperDate(),
  metascraperDescription(),
  metascraperImage(),
  metascraperLogo(),
  metascraperLogoFavicon(),
  metascraperPublisher(),
  metascraperTitle(),
  metascraperUrl(),
  metascraperYoutube(),
]);

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36";

export const getMetadata = async (url: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": USER_AGENT,
      },
    });
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
