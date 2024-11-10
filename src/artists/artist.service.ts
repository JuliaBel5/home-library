import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumService } from 'src/album/album.service';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {}
  private artists = [];

  findAll() {
    return this.artists;
  }

  findOne(id: string) {
    return this.artists.find((artist) => artist.id === id);
  }

  create(createArtistDto: CreateArtistDto) {
    const newArtist = { id: uuidv4(), ...createArtistDto };
    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex !== -1) {
      this.artists[artistIndex] = {
        ...this.artists[artistIndex],
        ...updateArtistDto,
      };
      return this.artists[artistIndex];
    }
  }
  async updateArtistByAlbumId(artistId: string): Promise<void> {
    this.artists.forEach((artist) => {
      if (artist.id === artistId) {
        artist.id = null;
      }
    });
  }
  async delete(id: string): Promise<void> {
    await this.tracksService.updateTracksByArtistId(id);
    await this.albumService.updateArtistByAlbumId(id);
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) throw new NotFoundException('Artist not found');

    this.artists.splice(artistIndex, 1);
    const artistInFavorites = this.favoritesService.findArtistInFavorites(id);
    if (artistInFavorites) {
      // Если артист есть в избранном, удаляем его
      this.favoritesService.deleteArtistFromFavorites(id);
    } else {
      // Если артиста нет в избранном, возвращаем 204
      return; // Простой возврат без контента
    }
  }
}
