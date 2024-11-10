import { Module, forwardRef } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistController } from './Artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [TracksModule, AlbumModule, forwardRef(() => FavoritesModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
