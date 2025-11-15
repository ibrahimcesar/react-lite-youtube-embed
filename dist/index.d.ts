import * as React_2 from 'react';

declare const _default: React_2.ForwardRefExoticComponent<LiteYouTubeProps & React_2.RefAttributes<HTMLIFrameElement>>;
export default _default;

export declare type imgResolution = "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";

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
     * Enable lazy loading for thumbnail image.
     * Uses native browser lazy loading to defer offscreen images.
     * Improves Lighthouse scores and reduces bandwidth for below-fold videos.
     * @default false
     */
    lazyLoad?: boolean;
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
    /**
     * Fires when the player is ready and API is available.
     * This is the first event to fire and indicates it's safe to call player methods.
     * @param event - Contains video ID and title
     * @example
     * onReady={(event) => console.log('Player ready for:', event.videoId)}
     */
    onReady?: (event: PlayerReadyEvent) => void;
    /**
     * Fires when the player's state changes.
     * Use this for comprehensive state tracking (play, pause, end, buffering, etc.)
     * @param event - Contains state, current time, and duration
     * @example
     * onStateChange={(event) => {
     *   if (event.state === PlayerState.PLAYING) {
     *     analytics.track('video_play');
     *   }
     * }}
     */
    onStateChange?: (event: PlayerStateChangeEvent) => void;
    /**
     * Fires when the player encounters an error.
     * Use this for graceful error handling and user feedback.
     * @param errorCode - YouTube error code (see PlayerError enum)
     * @example
     * onError={(code) => {
     *   if (code === PlayerError.VIDEO_NOT_FOUND) {
     *     showErrorMessage('Video not available');
     *   }
     * }}
     */
    onError?: (errorCode: PlayerError) => void;
    /**
     * Fires when the video starts playing.
     * Convenience wrapper for onStateChange with PlayerState.PLAYING.
     * @example
     * onPlay={() => analytics.track('video_play')}
     */
    onPlay?: () => void;
    /**
     * Fires when the video is paused.
     * Convenience wrapper for onStateChange with PlayerState.PAUSED.
     * @example
     * onPause={() => analytics.track('video_pause')}
     */
    onPause?: () => void;
    /**
     * Fires when the video ends.
     * Convenience wrapper for onStateChange with PlayerState.ENDED.
     * Useful for loading next video in a playlist.
     * @example
     * onEnd={() => loadNextVideo()}
     */
    onEnd?: () => void;
    /**
     * Fires when the video is buffering.
     * Convenience wrapper for onStateChange with PlayerState.BUFFERING.
     * @example
     * onBuffering={() => showLoadingSpinner()}
     */
    onBuffering?: () => void;
    /**
     * Fires when the playback rate (speed) changes.
     * Common values: 0.25, 0.5, 1, 1.5, 2
     * @param playbackRate - The new playback rate
     * @example
     * onPlaybackRateChange={(rate) => console.log('Speed:', rate + 'x')}
     */
    onPlaybackRateChange?: (playbackRate: number) => void;
    /**
     * Fires when the video quality changes.
     * Common values: "small" (240p), "medium" (360p), "large" (480p), "hd720", "hd1080"
     * @param quality - The new quality level
     * @example
     * onPlaybackQualityChange={(quality) => {
     *   analytics.track('quality_change', { quality });
     * }}
     */
    onPlaybackQualityChange?: (quality: string) => void;
}

/**
 * YouTube Player Error codes
 * @see https://developers.google.com/youtube/iframe_api_reference#onError
 */
export declare enum PlayerError {
    INVALID_PARAM = 2,
    HTML5_ERROR = 5,
    VIDEO_NOT_FOUND = 100,
    NOT_EMBEDDABLE = 101,
    NOT_EMBEDDABLE_DISGUISED = 150
}

/**
 * Event handler for when player is ready
 */
export declare interface PlayerReadyEvent {
    videoId: string;
    title: string;
}

/**
 * YouTube Player State constants
 * @see https://developers.google.com/youtube/iframe_api_reference#onStateChange
 */
export declare enum PlayerState {
    UNSTARTED = -1,
    ENDED = 0,
    PLAYING = 1,
    PAUSED = 2,
    BUFFERING = 3,
    CUED = 5
}

/**
 * Event handler for player state changes
 */
export declare interface PlayerStateChangeEvent {
    state: PlayerState;
    currentTime?: number;
    duration?: number;
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

/**
 * YouTube Player Event data structure
 * Represents the data received from YouTube's postMessage API
 */
export declare interface YouTubeEvent {
    info?: {
        playerState?: PlayerState;
        currentTime?: number;
        duration?: number;
        videoData?: {
            video_id: string;
            title: string;
        };
        playbackRate?: number;
        playbackQuality?: string;
    };
}

export { }
