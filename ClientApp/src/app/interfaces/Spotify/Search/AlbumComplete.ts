import { SpotifyImage } from '../SpotifyImage';
import { AlbumArtist } from './AlbumArtist';
import { ExternalUrls } from './ExternalUrls';
import { Track } from './Track';

export interface AlbumComplete {
  album_type: string;
  total_tracks: number;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Array<SpotifyImage>;
  name: string;
  release_date: string;
  type: string;
  uri: string;
  artists: Array<AlbumArtist>;
  tracks: Array<Track>;
  added_to_collection: boolean;
}
