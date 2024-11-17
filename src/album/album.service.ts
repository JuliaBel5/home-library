import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { TracksService } from 'src/tracks/tracks.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    return album;
  }

  async create(createAlbumDto: CreateAlbumDto) {
    return this.prisma.album.create({
      data: createAlbumDto,
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async updateArtistByAlbumId(artistId: string): Promise<void> {
    await this.prisma.album.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }

  async delete(id: string) {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    await this.tracksService.updateTracksByAlbumId(id);

    const albumInFavorites = await this.favoritesService.findAlbumInFavorites(
      id,
    );
    if (albumInFavorites) {
      await this.favoritesService.deleteAlbumFromFavorites(id);
    }

    await this.prisma.album.delete({
      where: { id },
    });
  }
}
