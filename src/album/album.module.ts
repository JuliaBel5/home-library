import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaModule } from 'prisma/prisma.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [TracksModule, forwardRef(() => FavoritesModule), PrismaModule],
  controllers: [AlbumController],
  providers: [AlbumService, JwtService],
  exports: [AlbumService],
})
export class AlbumModule {}
