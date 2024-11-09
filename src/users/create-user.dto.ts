import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20, { message: 'Password must be between 4 and 20 characters' })
  password: string;
}
