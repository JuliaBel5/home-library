import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './create-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { TracksService } from 'src/tracks/tracks.service';

@Injectable()
export class ArtistService {
  constructor(private readonly tracksService: TracksService) {}
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

  async delete(id: string): Promise<boolean> {
    // Логика удаления артиста

    // Обновление всех треков, где artistId = id
    const updatedTracks = await this.tracksService.updateTracksByArtistId(id);

    // Логика удаления артиста из базы данных
    const artistIndex = this.artists.findIndex((artist) => artist.id === id);
    if (artistIndex === -1) return false;

    // Удаляем артиста
    this.artists.splice(artistIndex, 1);
    return true;
  }
}
