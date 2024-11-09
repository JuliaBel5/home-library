import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistController } from './artists/Artist.controller';
import { ArtistModule } from './artists/artist.module';
import { ArtistService } from './artists/artist.service';
import { TracksController } from './tracks/tracks.controller';
import { TracksModule } from './tracks/tracks.module';
import { TracksService } from './tracks/tracks.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, TracksModule, ArtistModule],
  controllers: [
    AppController,
    UsersController,
    TracksController,
    ArtistController,
  ],
  providers: [
    AppService,
    UsersService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    TracksService,
    ArtistService,
  ],
})
export class AppModule {}
