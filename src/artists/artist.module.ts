import { Module } from '@nestjs/common';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistController } from './Artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [TracksModule],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
