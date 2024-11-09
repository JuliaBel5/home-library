import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../types/types';
import { CreateUserDto } from './create-user.dto';
import { UpdatePasswordDto } from './update-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];

  //constructor() {} // private readonly userRepository: UserRepository

  async findAll(): Promise<User[]> {
    // return await this.userRepository.find();
    return this.users;
  }

  async findOneById(id: string): Promise<User | undefined> {
    // return await this.userRepository.findOne(id);
    return this.users.find((user) => user.id === id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    // await this.userRepository.save(newUser);

    this.users.push(newUser);
    return newUser;
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

    user.password = updatePasswordDto.newPassword;
    user.version++;
    user.updatedAt = Date.now();

    // await this.userRepository.save(user);

    return user;
  }

  async delete(id: string): Promise<void> {
    const userIndex = await this.findOneById(id);
    if (!userIndex) {
      throw new NotFoundException('User not found');
    }

    // await this.userRepository.delete(id);
    this.users = this.users.filter((user) => user.id !== id);
  }
}
