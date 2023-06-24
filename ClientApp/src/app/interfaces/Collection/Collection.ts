import { AlbumResponse } from "../Spotify/Search/AlbumResponse";

export interface Collection {
  id: string;
  name: string;
  albums: AlbumResponse[];
}
