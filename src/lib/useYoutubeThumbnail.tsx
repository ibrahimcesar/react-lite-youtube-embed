import { useState, useEffect } from "react";

export type imgResolution =
  | "default"
  | "mqdefault"
  | "hqdefault"
  | "sddefault"
  | "maxresdefault";

const expectedWidths: Record<imgResolution, number> = {
  default: 120,
  mqdefault: 320,
  hqdefault: 480,
  sddefault: 640,
  maxresdefault: 1280,
};

export const useYoutubeThumbnail = (
  videoId: string,
  vi: string,
  format: string,
  imageRes: imgResolution = "maxresdefault"
) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const testUrl = `https://img.youtube.com/${vi}/${videoId}/${imageRes}.${format}`;
    const fallbackUrl = `https://img.youtube.com/${vi}/${videoId}/hqdefault.${format}`;

    const expectedWidth = expectedWidths[imageRes];

    const img = new Image();
    img.onload = () => {
      if (img.width < expectedWidth) {
        setUrl(fallbackUrl);
      } else {
        setUrl(testUrl);
      }
    };
    img.onerror = () => setUrl(fallbackUrl);
    img.src = testUrl;
  }, [videoId]);

  return url;
};

export default useYoutubeThumbnail;
