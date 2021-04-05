/// <reference types="react" />
declare type imgResolution = "default" | "mqdefault" | "hqdefault" | "sddefault" | "maxresdefault";
interface LiteYouTube {
    id: string;
    title: string;
    activatedClass?: string;
    adNetwork?: boolean;
    iframeClass?: string;
    noCookie?: boolean;
    params?: string;
    playerClass?: string;
    playlist?: boolean;
    poster?: imgResolution;
    wrapperClass?: string;
}
export default function LiteYouTubeEmbed(props: LiteYouTube): JSX.Element;
export {};
