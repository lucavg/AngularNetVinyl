import { AlbumArtist } from "./AlbumArtist";

export interface Track {
  artists: Array<AlbumArtist>;
  disc_number: number;
  external_urls: Map<string, string>;
  href: string;
  id: string;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}
