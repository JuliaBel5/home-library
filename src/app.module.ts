import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';
import { AlbumService } from './album/album.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artists/artist.controller';
import { ArtistModule } from './artists/artist.module';
import { ArtistService } from './artists/artist.service';
import { FavoritesController } from './favorites/favorites.controller';
import { FavoritesService } from './favorites/favorites.service';
import { TracksController } from './tracks/tracks.controller';
import { TracksModule } from './tracks/tracks.module';
import { TracksService } from './tracks/tracks.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LoggingModule } from './logging/logging.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    UsersModule,
    TracksModule,
    ArtistModule,
    AlbumModule,
    PrismaModule,
    AuthModule,
    LoggingModule,
    JwtModule,
  ],
  controllers: [
    AppController,
    UsersController,
    TracksController,
    ArtistController,
    AlbumController,
    FavoritesController,
  ],
  providers: [
    AppService,
    UsersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },

    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    TracksService,
    ArtistService,
    AlbumService,
    FavoritesService,
  ],
})
export class AppModule {}
