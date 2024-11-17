import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumService } from 'src/album/album.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly prisma: PrismaService,
  ) {}

  async findAll() {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });

    return artist;
  }

  async create(createArtistDto: CreateArtistDto) {
    return this.prisma.artist.create({
      data: createArtistDto,
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
    if (!artist) {
      throw new NotFoundException('Artist not found123');
    }
    return artist;
  }

  async updateArtistByAlbumId(artistId: string): Promise<void> {
    await this.prisma.album.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }

  async delete(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    const artistInFavorites = await this.favoritesService.findArtistInFavorites(
      id,
    );
    if (artistInFavorites) {
      await this.favoritesService.deleteArtistFromFavorites(id);
    }
    await this.tracksService.updateTracksByArtistId(id);
    await this.albumService.updateArtistByAlbumId(id);

    await this.prisma.artist.delete({
      where: { id },
    });
  }
}
