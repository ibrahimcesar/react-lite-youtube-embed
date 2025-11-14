import * as React_2 from 'react';

declare const _default: React_2.ForwardRefExoticComponent<LiteYouTubeProps & React_2.RefAttributes<HTMLIFrameElement>>;
export default _default;

declare type imgResolution = "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";

export declare interface LiteYouTubeProps {
    announce?: string;
    id: string;
    title: string;
    activatedClass?: string;
    adNetwork?: boolean;
    aspectHeight?: number;
    aspectWidth?: number;
    iframeClass?: string;
    /** @deprecated Use cookie prop instead */
    noCookie?: boolean;
    cookie?: boolean;
    enableJsApi?: boolean;
    alwaysLoadIframe?: boolean;
    params?: string;
    playerClass?: string;
    playlist?: boolean;
    playlistCoverId?: string;
    poster?: imgResolution;
    webp?: boolean;
    wrapperClass?: string;
    onIframeAdded?: () => void;
    muted?: boolean;
    autoplay?: boolean;
    thumbnail?: string;
    rel?: string;
    containerElement?: keyof React_2.JSX.IntrinsicElements;
    style?: React_2.CSSProperties;
    focusOnLoad?: boolean;
    referrerPolicy?: React_2.HTMLAttributeReferrerPolicy;
    /**
     * SEO metadata for search engines. Enables rich results and better discoverability.
     * Provides structured data following schema.org VideoObject specification.
     * @see https://developers.google.com/search/docs/appearance/structured-data/video
     */
    seo?: VideoSEO;
    /**
     * Include noscript fallback link for accessibility and search crawlers.
     * When true, adds a direct YouTube link inside <noscript> tags.
     * @default true
     */
    noscriptFallback?: boolean;
}

/**
 * SEO metadata for YouTube video following schema.org VideoObject structure.
 * See: https://developers.google.com/search/docs/appearance/structured-data/video
 *
 * All fields are optional but providing them improves search engine discoverability
 * and enables rich results (video carousels, thumbnails in search results).
 *
 * Use the provided `scripts/fetch-youtube-metadata.sh` helper to easily retrieve
 * this data from YouTube's API.
 */
export declare interface VideoSEO {
    /**
     * The title of the video. If not provided, falls back to the component's `title` prop.
     * @example "What's new in Material Design for the web"
     */
    name?: string;
    /**
     * A description of the video content.
     * Recommended: 50-160 characters for optimal search result display.
     * @example "Learn about the latest Material Design updates presented at Chrome Dev Summit 2019"
     */
    description?: string;
    /**
     * ISO 8601 date when the video was uploaded to YouTube.
     * @example "2019-11-11T08:00:00Z" or "2019-11-11"
     */
    uploadDate?: string;
    /**
     * ISO 8601 duration format. Required for video rich results.
     * Format: PT#H#M#S where # is the number of hours, minutes, seconds
     * @example "PT1M33S" (1 minute 33 seconds)
     * @example "PT15M" (15 minutes)
     * @example "PT1H30M" (1 hour 30 minutes)
     */
    duration?: string;
    /**
     * Custom thumbnail URL. If not provided, auto-generated from video ID.
     * Recommended: At least 1200px wide for best quality in search results.
     * @example "https://i.ytimg.com/vi/VIDEO_ID/maxresdefault.jpg"
     */
    thumbnailUrl?: string;
    /**
     * Direct URL to watch the video. Auto-generated if not provided.
     * @example "https://www.youtube.com/watch?v=L2vS_050c-M"
     */
    contentUrl?: string;
    /**
     * The embed URL. Auto-generated from video ID if not provided.
     * @example "https://www.youtube.com/embed/L2vS_050c-M"
     */
    embedUrl?: string;
}

export { }
