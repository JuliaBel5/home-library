import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Album } from 'src/types/types';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { v4 as uuidv4 } from 'uuid';
import { isUUID } from 'class-validator';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class AlbumService {
  constructor(private readonly tracksService: TracksService) {}

  private albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = this.albums.find((album) => album.id === id);

    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }

    const updatedAlbum = { ...this.albums[albumIndex], ...updateAlbumDto };
    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }
  async updateArtistByAlbumId(artistId: string): Promise<void> {
    this.albums.forEach((album) => {
      if (album.artistId === artistId) {
        album.artistId = null;
      }
    });
  }
  async delete(id: string): Promise<void> {
    await this.tracksService.updateTracksByAlbumId(id);
    const albumIndex = this.albums.findIndex((album) => album.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException('Album not found');
    }

    this.albums.splice(albumIndex, 1);
  }
}
