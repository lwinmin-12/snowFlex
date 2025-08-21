import { BannerSliderDto } from "./banner-slider.dto";

export type ResBannerSliderDto = {
  page: number;
  pageSize: number;
  total: number;
  data: BannerSliderDto[];
};