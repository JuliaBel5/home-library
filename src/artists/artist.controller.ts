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
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { isUUID } from 'class-validator';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async getAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artist ID format');
    }

    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found890');
    }

    return artist;
  }

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artist ID format');
    }

    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found789');
    }

    return this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artist ID format');
    }

    const artist = await this.artistService.findOne(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.artistService.delete(id);
  }
}
