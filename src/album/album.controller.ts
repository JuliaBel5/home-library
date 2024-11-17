import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  BadRequestException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto, UpdateAlbumDto } from './album.dto';
import { isUUID } from 'class-validator';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album id');
    }
    const album = await this.albumService.findOne(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }
    return album;
  }

  @Post()
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album ID format');
    }
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album ID format');
    }

    await this.albumService.delete(id);
  }
}
