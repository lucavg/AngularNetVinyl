import { CollectionAlbum } from './CollectionAlbum';

export interface CollectionResponse {
  id: string;
  name: string;
  albums: CollectionAlbum[];
}
