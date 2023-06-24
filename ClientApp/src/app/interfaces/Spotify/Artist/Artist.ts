import { SpotifyImage } from '../SpotifyImage';

export interface Artist {
  external_urls: Map<string, string>;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  type: string;
  uri: string;
}
