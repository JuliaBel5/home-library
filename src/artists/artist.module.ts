import { Module } from '@nestjs/common';
import { AlbumModule } from 'src/album/album.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistController } from './Artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [TracksModule, AlbumModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
