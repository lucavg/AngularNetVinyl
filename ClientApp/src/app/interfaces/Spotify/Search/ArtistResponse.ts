import { SpotifyImage } from '../SpotifyImage';

export interface ArtistResponse {
  external_urls: Map<string, string>;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  type: string;
  uri: string;
}
