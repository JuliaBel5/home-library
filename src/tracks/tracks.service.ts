import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Track } from 'src/types/types';
import { CreateTrackDto } from './create-track.dto';
import { FavoritesService } from 'src/favorites/favorites.service';

@Injectable()
export class TracksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly favoritesService: FavoritesService,
  ) {}

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async findOneById(id: string): Promise<Track | null> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    return track;
  }

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    const newTrack = await this.prisma.track.create({
      data: {
        name: createTrackDto.name,
        artistId: createTrackDto.artistId,
        albumId: createTrackDto.albumId,
        duration: createTrackDto.duration,
      },
    });
    return newTrack;
  }

  async update(id: string, createTrackDto: CreateTrackDto): Promise<Track> {
    const track = await this.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: {
        name: createTrackDto.name,
        artistId: createTrackDto.artistId,
        albumId: createTrackDto.albumId,
        duration: createTrackDto.duration,
      },
    });
    return updatedTrack;
  }

  async updateTracksByArtistId(artistId: string): Promise<void> {
    await this.prisma.track.updateMany({
      where: { artistId },
      data: { artistId: null },
    });
  }

  async updateTracksByAlbumId(albumId: string): Promise<void> {
    await this.prisma.track.updateMany({
      where: { albumId },
      data: { albumId: null },
    });
  }

  async delete(id: string): Promise<void> {
    const track = await this.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    const trackInFavorites = await this.favoritesService.findTrackInFavorites(
      id,
    );
    if (trackInFavorites) {
      await this.favoritesService.deleteTrackFromFavorites(id);
    }

    await this.prisma.track.delete({
      where: { id },
    });
  }
}
