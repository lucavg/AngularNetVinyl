import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { Collection } from '../interfaces/Collection/Collection';
import { AlbumResponse } from '../interfaces/Spotify/Search/AlbumResponse';

@Injectable({
  providedIn: 'root',
})
export class CollectionService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  private apiUrl = 'api/v1/collections';

  getAllCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.apiUrl}/all`);
  }

  getCollection(id: string): Observable<Collection> {
    return this.http.get<Collection>(`${this.apiUrl}/${id}`);
  }

  createCollection(collection: Collection): Observable<Collection> {
    return this.http.post<Collection>(`${this.apiUrl}/create`, collection);
  }

  updateCollection(id: string, collection: Collection): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, collection);
  }

  deleteCollection(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  addAlbumToCollection(collectionId: string, album: AlbumResponse): Observable<Collection> {
    return this.http.post<Collection>(`${this.apiUrl}/${collectionId}/add-album`, album);
  }

  updateAlbumInCollection(collectionId: string, albumId: string, album: AlbumResponse): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${collectionId}/update-album/${albumId}`, album);
  }

  removeAlbumFromCollection(collectionId: string, albumId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${collectionId}/remove-album/${albumId}`);
  }
}
