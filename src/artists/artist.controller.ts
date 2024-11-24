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
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto, UpdateArtistDto } from './artist.dto';
import { isUUID } from 'class-validator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.artistService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  async create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistService.create(createArtistDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
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
