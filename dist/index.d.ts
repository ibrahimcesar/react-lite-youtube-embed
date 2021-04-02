/// <reference types="react" />
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
    poster?: string;
    wrapperClass?: string;
}
export default function LiteYouTubeEmbed(props: LiteYouTube): JSX.Element;
export {};
