import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signup(login: string, password: string) {
    const existingUser = await this.usersService.findByLogin(login);

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const salt = Number(process.env.CRYPT_SALT) || 10;
    const passwordHash = await bcrypt.hash(password, salt);
    const newUser = await this.usersService.create({
      login,
      password: passwordHash,
    });

    return {
      message: 'User successfully registered',
      userId: newUser.id,
      id: newUser.id,
    };
  }

  async login(login: string, password: string) {
    const user = await this.usersService.findByLogin(login);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid login or password');
    }

    const accessToken = this.generateAccessToken(user.id, user.login);
    const refreshToken = this.generateRefreshToken(user.id);
    return { accessToken, refreshToken, userId: user.id };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
      });

      const user = await this.usersService.findOneById(payload.userId);

      if (!user) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      const newAccessToken = this.generateAccessToken(user.id, user.login);
      const newRefreshToken = this.generateRefreshToken(user.id);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error('Error during token refresh:', error.message);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  private generateAccessToken(userId: string, login: string): string {
    return this.jwtService.sign(
      { userId, login },
      {
        secret: process.env.JWT_SECRET_KEY,
        expiresIn: process.env.TOKEN_EXPIRE_TIME,
      },
    );
  }

  private generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { userId },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
      },
    );
  }
}
