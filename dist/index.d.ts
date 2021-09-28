/// <reference types="react" />
declare type imgResolution = "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";
interface LiteYouTube {
    announce: string;
    id: string;
    title: string;
    activatedClass?: string;
    adNetwork?: boolean;
    aspectHeight?: number;
    aspectWidth?: number;
    autoplay?: boolean;
    cookie?: boolean;
    iframeClass?: string;
    muted?: boolean;
    noCookie?: boolean;
    onIframeAdded?: () => void;
    params?: string;
    playerClass?: string;
    playlist?: boolean;
    playlistCoverId?: string;
    poster?: imgResolution;
    webp?: boolean;
    wrapperClass?: string;
}
export default function LiteYouTubeEmbed(props: LiteYouTube): JSX.Element;
export {};
