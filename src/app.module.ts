import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { TransitionController } from './transition/transition.controller';
import { TransitionModule } from './transition/transition.module';
import { ContentModule } from './content/content.module';
import { GenresModule } from './genres/genres.module';
import { ContentGenreModule } from './content-genre/content-genre.module';
import { WatchHistoryService } from './watch-history/watch-history.service';
import { WatchHistoryModule } from './watch-history/watch-history.module';
import { BannerSliderModule } from './banner-slider/banner-slider.module';
import { MinioService } from './minio/minio.service';
import { PlaylistModule } from './playlist/playlist.module';
import { ContentPlaylistModule } from './content-playlist/content-playlist.module';
import { MinioModule } from './minio/minio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    UserModule,
    AuthModule,
    TransitionModule,
    ContentModule,
    GenresModule,
    ContentGenreModule,
    WatchHistoryModule,
    BannerSliderModule,
    PlaylistModule,
    ContentPlaylistModule,
    MinioModule,
  ],
  controllers: [AppController],
  providers: [AppService, WatchHistoryService, MinioService],
})
export class AppModule {}
