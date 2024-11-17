import { Module, forwardRef } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [TracksModule, forwardRef(() => FavoritesModule), PrismaModule],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
