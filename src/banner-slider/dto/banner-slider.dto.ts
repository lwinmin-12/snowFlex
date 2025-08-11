export class BannerSliderDto {
    id: string;
    name: string;
    imageUrl: string;
    contentId: string | null;
    webUrl: string | null;
    status: boolean;
    adType: "Content" | "Web";
    sequence: number;
}
