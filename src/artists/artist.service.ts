import { Injectable } from '@nestjs/common';
import { CreateArtistDto, UpdateArtistDto } from './create-artist.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ArtistService {
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

  delete(id: string) {
    this.artists = this.artists.filter((artist) => artist.id !== id);
  }
}
