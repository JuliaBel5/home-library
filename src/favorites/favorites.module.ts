import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artists/artist.service';
import { AlbumModule } from 'src/album/album.module';
import { ArtistModule } from 'src/artists/artist.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { PrismaModule } from 'prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    forwardRef(() => TracksModule),
    forwardRef(() => AlbumModule),
    forwardRef(() => ArtistModule),
    PrismaModule,
  ],
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    TracksService,
    AlbumService,
    ArtistService,
    JwtService,
  ],
  exports: [FavoritesService],
})
export class FavoritesModule {}
