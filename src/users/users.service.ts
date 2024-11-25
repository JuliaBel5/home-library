import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { User } from 'src/types/types';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './create-user.dto';
import { UpdatePasswordDto } from './update-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOneById(id: string): Promise<User | undefined> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findByLogin(login: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { login },
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const dateInSeconds = Math.floor(Date.now() / 1000);
    return await this.prisma.user.create({
      data: {
        login: createUserDto.login,
        password: createUserDto.password,
        version: 1,
        createdAt: dateInSeconds,
        updatedAt: dateInSeconds,
      },
    });
  }
  async updatePassword(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }

    return await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
        updatedAt: Math.floor(Date.now() / 1001),
      },
    });
  }

  async delete(id: string): Promise<void> {
    const user = await this.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.prisma.user.delete({
      where: { id },
    });
  }
}
