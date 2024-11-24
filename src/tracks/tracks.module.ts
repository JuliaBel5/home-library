import { Module, forwardRef } from '@nestjs/common';
import { FavoritesModule } from 'src/favorites/favorites.module';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [forwardRef(() => FavoritesModule), PrismaModule],
  providers: [TracksService, JwtService],
  controllers: [TracksController],
  exports: [TracksService],
})
export class TracksModule {}
