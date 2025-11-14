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
}

export { }
