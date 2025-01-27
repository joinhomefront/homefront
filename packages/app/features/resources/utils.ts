import normalizeUrl from "normalize-url";

export function getBaseDomain(url: string): string | undefined {
  const normalizedUrl = normalizeUrl(url, {
    stripProtocol: true,
    stripWWW: false,
    stripHash: true,
    stripAuthentication: true,
    removeQueryParameters: true,
    removeDirectoryIndex: true,
    removeExplicitPort: true,
    removeSingleSlash: true,
    removeTrailingSlash: true,
  });

  const parts = normalizedUrl.split(".");
  if (parts.length >= 2) {
    return parts[parts.length - 2];
  }
  return normalizedUrl;
}
