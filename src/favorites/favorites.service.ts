import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Artist, Album, Track } from 'src/types/types';
import { isUUID } from 'class-validator';

@Injectable()
export class FavoritesService {
  private favorites = {
    artists: [] as Artist[],
    albums: [] as Album[],
    tracks: [] as Track[],
  };

  getAllFavorites() {
    return this.favorites;
  }

  addTrackToFavorites(track: Track) {
    if (!isUUID(track.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    if (this.favorites.tracks.find((t) => t.id === track.id)) {
      throw new UnprocessableEntityException(
        'Track already exists in favorites',
      );
    }

    this.favorites.tracks.push(track);
    return { message: 'Track added to favorites' };
  }

  findTrackInFavorites(trackId: string): boolean {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid UUID');
    }
    const index = this.favorites.tracks.findIndex(
      (track) => track.id === trackId,
    );
    return index !== -1;
  }

  findAlbumInFavorites(albumId: string): boolean {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid UUID');
    }
    const albumExists = this.favorites.albums.some(
      (album) => album.id === albumId,
    );
    return albumExists;
  }

  findArtistInFavorites(artistId: string): boolean {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid UUID');
    }
    const artistExists = this.favorites.artists.some(
      (artist) => artist.id === artistId,
    );
    return artistExists;
  }

  deleteTrackFromFavorites(trackId: string) {
    if (!isUUID(trackId)) {
      throw new BadRequestException('Invalid UUID');
    }
    const index = this.favorites.tracks.findIndex(
      (track) => track.id === trackId,
    );
    if (index === -1) {
      throw new NotFoundException('Track not found in favorites');
    }

    this.favorites.tracks.splice(index, 1);
    return { message: 'Track removed from favorites' };
  }

  addAlbumToFavorites(album: Album) {
    if (!isUUID(album.id)) {
      throw new BadRequestException('Invalid UUID');
    }
    if (this.favorites.albums.find((a) => a.id === album.id)) {
      throw new UnprocessableEntityException(
        'Album already exists in favorites',
      );
    }

    this.favorites.albums.push(album);
    return { message: 'Album added to favorites' };
  }

  deleteAlbumFromFavorites(albumId: string) {
    if (!isUUID(albumId)) {
      throw new BadRequestException('Invalid UUID');
    }

    const index = this.favorites.albums.findIndex(
      (album) => album.id === albumId,
    );
    if (index === -1) {
      throw new NotFoundException('Album not found in favorites');
    }

    this.favorites.albums.splice(index, 1);
    return { message: 'Album removed from favorites' };
  }

  addArtistToFavorites(artist: Artist) {
    if (!isUUID(artist.id)) {
      throw new BadRequestException('Invalid UUID');
    }

    if (this.favorites.artists.find((a) => a.id === artist.id)) {
      throw new UnprocessableEntityException(
        'Artist already exists in favorites',
      );
    }

    this.favorites.artists.push(artist);
    return { message: 'Artist added to favorites' };
  }

  deleteArtistFromFavorites(artistId: string) {
    if (!isUUID(artistId)) {
      throw new BadRequestException('Invalid UUID');
    }

    const index = this.favorites.artists.findIndex(
      (artist) => artist.id === artistId,
    );
    if (index === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }

    this.favorites.artists.splice(index, 1);
    return { message: 'Artist removed from favorites' };
  }
}
