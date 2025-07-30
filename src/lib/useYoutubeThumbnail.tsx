import { useState, useEffect } from "react";

export const useYoutubeThumbnail = (
  videoId: string,
  vi: string,
  format: string
) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const testUrl = `https://img.youtube.com/${vi}/${videoId}/maxresdefault.${format}`;
    const fallbackUrl = `https://img.youtube.com/${vi}/${videoId}/hqdefault.${format}`;

    const img = new Image();
    img.onload = () => {
      setUrl(img.width > 120 ? testUrl : fallbackUrl);
    };
    img.onerror = () => setUrl(fallbackUrl);
    img.src = testUrl;
  }, [videoId]);

  return url;
};

export default useYoutubeThumbnail;
