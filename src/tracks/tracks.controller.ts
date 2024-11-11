import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './create-track.dto';
import { Track } from 'src/types/types';
import { isUUID } from 'class-validator';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  getAllTracks() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async getTrackById(@Param('id') id: string): Promise<Track> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Track ID');
    }

    const track = await this.tracksService.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() createTrackDto: CreateTrackDto): Promise<Track> {
    if (!createTrackDto.name || createTrackDto.duration === undefined) {
      throw new BadRequestException(
        'Name, artistId, and duration are required',
      );
    }

    const newTrack = await this.tracksService.create(createTrackDto);
    return newTrack;
  }

  @Put(':id')
  async updateTrack(
    @Param('id') id: string,
    @Body() createTrackDto: CreateTrackDto,
  ): Promise<Track> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Track ID');
    }

    const { name, duration, artistId, albumId } = createTrackDto;

    if (typeof name !== 'string' || typeof duration !== 'number') {
      throw new BadRequestException('Invalid data types');
    }

    if (artistId && typeof artistId !== 'string') {
      throw new BadRequestException('artistId must be a string or null');
    }

    if (albumId && typeof albumId !== 'string') {
      throw new BadRequestException('albumId must be a string or null');
    }
    const track = await this.tracksService.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }
    const updatedTrack = await this.tracksService.update(id, createTrackDto);
    return updatedTrack;
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid Track ID');
    }

    const track = await this.tracksService.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    await this.tracksService.delete(id);
  }
}
