import { SpotifyImage } from '../SpotifyImage';
import { AlbumArtist } from './AlbumArtist';

export interface AlbumResponse {
  album_type: string;
  total_tracks: number;
  external_urls: Map<string, string>;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  release_date: string;
  type: string;
  uri: string;
  artists: Array<AlbumArtist>;
  added_to_collection: boolean;
}
