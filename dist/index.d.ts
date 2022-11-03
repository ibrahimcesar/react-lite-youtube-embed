export declare type imgResolution = "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";
export interface LiteYouTube {
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
}
export default function LiteYouTubeEmbed(props: LiteYouTube): JSX.Element;
