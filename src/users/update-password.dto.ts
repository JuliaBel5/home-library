import { IsString, IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @Length(4, 20, {
    message: 'New password must be between 4 and 20 characters',
  })
  newPassword: string;
}
