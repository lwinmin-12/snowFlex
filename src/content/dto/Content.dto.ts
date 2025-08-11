

export class ContentDto {
  id: string;   
  titleMm: string;
  titleEn: string;
  descriptionMm: string;
  descriptionEn: string;
  duration: number;
  videoUrl: string;
  trailerUrl: string;
  portraitUrl: string;
  landscapeUrl: string;
  releaseDate: Date;
  type: 'Movie' | 'Series';
  status: 'ACTIVE' | 'INACTIVE';
  isPremium: boolean;
}
