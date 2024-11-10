import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  HttpCode,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { isUUID } from 'class-validator';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artists/artist.service';
import { TracksService } from 'src/tracks/tracks.service';
import { Track, Album, Artist } from 'src/types/types';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  @Get()
  async getAllFavorites() {
    const favorites = this.favoritesService.getAllFavorites();

    return favorites;
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Track ID');
    }

    const track: Track | null = await this.tracksService.findOneById(id);

    if (!track) {
      throw new UnprocessableEntityException('Track does not exist');
    }

    return this.favoritesService.addTrackToFavorites(track);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    this.favoritesService.deleteTrackFromFavorites(id);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album Id');
    }

    const album: Album | null = await this.albumService.findOne(id);

    if (!album) {
      throw new UnprocessableEntityException('Album does not exist');
    }

    return this.favoritesService.addAlbumToFavorites(album);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    this.favoritesService.deleteAlbumFromFavorites(id);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album Id');
    }

    const artist: Artist | null = await this.artistService.findOne(id);

    if (!artist) {
      throw new UnprocessableEntityException('Artist does not exist');
    }

    return this.favoritesService.addArtistToFavorites(artist);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    this.favoritesService.deleteArtistFromFavorites(id);
  }
}
