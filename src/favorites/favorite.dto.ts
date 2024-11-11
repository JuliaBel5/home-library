import { Artist, Album, Track } from 'src/types/types';

export class FavoritesResponseDto {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export class CreateFavoriteResponseDto {
  message: string;
}

export class DeleteFavoriteResponseDto {
  message: string;
}
