import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateArtistDto {
  @IsOptional()
  @IsString()
  name?: string;
}
