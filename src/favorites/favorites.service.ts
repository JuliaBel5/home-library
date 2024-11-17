import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { Artist, Album, Track, FavoritesResponse } from 'src/types/types';
import { isUUID } from 'class-validator';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artists/artist.service';
import { TracksService } from 'src/tracks/tracks.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => TracksService))
    private readonly tracksService: TracksService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    private readonly prismaService: PrismaService,
  ) {}

  private favorites = {
    artists: [] as string[],
    albums: [] as string[],
    tracks: [] as string[],
  };

  async getAllFavorites(): Promise<FavoritesResponse> {
    const { artists, albums, tracks } = this.favorites;

    const favoritesData = await Promise.all([
      Promise.all(artists.map((id) => this.artistService.findOne(id))),
      Promise.all(albums.map((id) => this.albumService.findOne(id))),
      Promise.all(tracks.map((id) => this.tracksService.findOneById(id))),
    ]);

    const [artistData, albumData, trackData] = favoritesData;

    return {
      artists: artistData.filter((artist) => artist !== null),
      albums: albumData.filter((album) => album !== null),
      tracks: trackData.filter((track) => track !== null),
    };
  }

  async addTrackToFavorites(track: Track) {
    if (!isUUID(track.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    if (this.favorites.tracks.includes(track.id)) {
      throw new UnprocessableEntityException(
        'Track already exists in favorites',
      );
    }

    this.favorites.tracks.push(track.id);
    return { message: 'Track added to favorites' };
  }

  async findTrackInFavorites(trackId: string): Promise<boolean> {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid UUID');
    }

    const trackExists = await this.prismaService.track.findUnique({
      where: { id: trackId },
    });
    return !!trackExists;
  }

  async findAlbumInFavorites(albumId: string): Promise<boolean> {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid UUID');
    }

    const albumExists = await this.prismaService.album.findUnique({
      where: { id: albumId },
    });
    return !!albumExists;
  }

  async findArtistInFavorites(artistId: string): Promise<boolean> {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid UUID');
    }

    const artistExists = await this.prismaService.artist.findUnique({
      where: { id: artistId },
    });
    return !!artistExists;
  }

  async deleteTrackFromFavorites(trackId: string) {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid UUID');
    }
    const trackExists = await this.tracksService.findOneById(trackId);
    if (!trackExists) {
      throw new NotFoundException('Track not found in favorites');
    }

    this.favorites.tracks = this.favorites.tracks.filter(
      (id) => id !== trackId,
    );
    return { message: 'Track removed from favorites' };
  }

  async addAlbumToFavorites(album: Album) {
    if (!isUUID(album.id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const existingAlbum = await this.albumService.findOne(album.id);
    if (!existingAlbum) {
      throw new NotFoundException('Album not found');
    }

    if (this.favorites.albums.find((a) => a === album.id)) {
      throw new UnprocessableEntityException(
        'Album already exists in favorites',
      );
    }

    this.favorites.albums.push(existingAlbum.id);
    return { message: 'Album added to favorites' };
  }

  async deleteAlbumFromFavorites(albumId: string) {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid UUID');
    }

    const albumExists = await this.albumService.findOne(albumId);
    if (!albumExists) {
      throw new NotFoundException('Album not found in favorites');
    }

    this.favorites.albums = this.favorites.albums.filter(
      (id) => id !== albumId,
    );
    return { message: 'Album removed from favorites' };
  }

  async addArtistToFavorites(artist: Artist) {
    if (!isUUID(artist.id)) {
      throw new BadRequestException('Invalid UUID');
    }

    const existingArtist = await this.artistService.findOne(artist.id);
    if (!existingArtist) {
      throw new NotFoundException('Artist not found');
    }

    if (this.favorites.artists.find((a) => a === artist.id)) {
      throw new UnprocessableEntityException(
        'Artist already exists in favorites',
      );
    }

    this.favorites.artists.push(existingArtist.id);
    return { message: 'Artist added to favorites' };
  }

  async deleteArtistFromFavorites(artistId: string) {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid UUID');
    }

    const artistExists = await this.artistService.findOne(artistId);
    if (!artistExists) {
      throw new NotFoundException('Artist not found in favorites');
    }

    this.favorites.artists = this.favorites.artists.filter(
      (id) => id !== artistId,
    );
    return { message: 'Artist removed from favorites' };
  }
}
