import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artists/artist.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, TracksService, AlbumService, ArtistService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
