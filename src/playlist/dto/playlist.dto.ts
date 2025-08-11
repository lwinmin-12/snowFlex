export class playListDto {
  id: string;
  titleMm: string;
  titleEn: string;
  status: boolean;
  sequence: number;
  type : "Movie" | "Series";
}