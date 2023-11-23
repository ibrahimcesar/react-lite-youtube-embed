import * as React from "react";
export type imgResolution = "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";
export interface LiteYouTubeProps {
    announce?: string;
    id: string;
    title: string;
    activatedClass?: string;
    adNetwork?: boolean;
    aspectHeight?: number;
    aspectWidth?: number;
    iframeClass?: string;
    noCookie?: boolean;
    cookie?: boolean;
    params?: string;
    playerClass?: string;
    playlist?: boolean;
    playlistCoverId?: string;
    poster?: imgResolution;
    webp?: boolean;
    wrapperClass?: string;
    onIframeAdded?: () => void;
    muted?: boolean;
    thumbnail?: string;
    rel?: string;
    containerElement?: keyof JSX.IntrinsicElements;
}
declare const _default: React.ForwardRefExoticComponent<LiteYouTubeProps & React.RefAttributes<HTMLIFrameElement>>;
export default _default;
