import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AlbumModule } from 'src/album/album.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => FavoritesModule),
    PrismaModule,
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
