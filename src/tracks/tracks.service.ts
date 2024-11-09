import { Injectable, NotFoundException } from '@nestjs/common';
import { Track } from '../types/types';
import { CreateTrackDto } from './create-track.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findOneById(id: string): Promise<Track | undefined> {
    return this.tracks.find((track) => track.id === id);
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack: Track = {
      id: uuidv4(),
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  async update(id: string, createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    track.name = createTrackDto.name;
    track.artistId = createTrackDto.artistId;
    track.albumId = createTrackDto.albumId;
    track.duration = createTrackDto.duration;

    return track;
  }
  async updateTracksByArtistId(artistId: string): Promise<void> {
    this.tracks.forEach((track) => {
      if (track.artistId === artistId) {
        track.artistId = null; // Обнуляем artistId
      }
    });
  }

  async delete(id: string): Promise<void> {
    const trackIndex = this.tracks.findIndex((track) => track.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException('Track not found');
    }

    this.tracks.splice(trackIndex, 1);
  }
}
