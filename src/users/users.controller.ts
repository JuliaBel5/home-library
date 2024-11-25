/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  HttpCode,
  BadRequestException,
  HttpStatus,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { isUUID } from 'class-validator';
import { User } from 'src/types/types';
import { UpdatePasswordDto } from './update-password.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string): Promise<Partial<User>> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid User ID');
    }

    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Partial<User>> {
    if (!createUserDto.login || !createUserDto.password) {
      throw new BadRequestException('Login and password are required');
    }

    const newUser = await this.usersService.create(createUserDto);

    const { password, ...userWithoutPassword } = newUser;

    return userWithoutPassword;
  }
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<Partial<User>> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid User ID');
    }

    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    const updatedUser = await this.usersService.updatePassword(
      id,
      updatePasswordDto,
    );

    const { password, ...updatedUserWithoutPassword } = updatedUser;
    return updatedUserWithoutPassword;
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid User ID');
    }

    const user = await this.usersService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.usersService.delete(id);
  }
}
