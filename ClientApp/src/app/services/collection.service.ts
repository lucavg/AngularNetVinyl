import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { Collection } from '../interfaces/Collection/Collection';
import { AlbumResponse } from '../interfaces/Spotify/Search/AlbumResponse';
import { CollectionResponse } from '../interfaces/Collection/CollectionResponse';

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
    return this.http.get<Collection[]>(this.baseUrl + `${this.apiUrl}/all`);
  }

  getCollection(id: string): Observable<CollectionResponse> {
    return this.http.get<CollectionResponse>(
      this.baseUrl + `${this.apiUrl}/get`,
      {
        params: { id: id },
      }
    );
  }

  createCollection(collection: Collection): Observable<Collection> {
    return this.http.post<Collection>(this.baseUrl + `${this.apiUrl}/create`, {
      params: { collection: collection },
    });
  }

  updateCollection(id: string, collection: Collection): Observable<void> {
    return this.http.put<void>(`this.baseUrl + ${this.apiUrl}/update`, {
      params: { id: id, collection: collection },
    });
  }

  deleteCollection(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + `${this.apiUrl}/delete`, {
      params: { id: id },
    });
  }

  addAlbumToCollection(
    collectionId: string,
    album: AlbumResponse
  ): Observable<any> {
    return this.addAlbumToCollectionAsync(collectionId, album).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  }

  addAlbumToCollectionAsync(
    collectionId: string,
    album: AlbumResponse
  ): Observable<Collection> {
    return this.http.post<Collection>(
      this.baseUrl + `${this.apiUrl}/addAlbum`,
      { CollectionId: collectionId, AlbumId: album.id }
    );
  }

  updateAlbumInCollection(
    collectionId: string,
    albumId: string,
    album: AlbumResponse
  ): Observable<void> {
    return this.http.put<void>(this.baseUrl + `${this.apiUrl}/updateAlbum`, {
      params: {
        collectionId: collectionId,
        albumId: albumId,
        album: album,
      },
    });
  }

  removeAlbumFromCollection(
    collectionId: string,
    album: AlbumResponse
  ): Observable<any> {
    return this.removeAlbumFromCollectionAsync(collectionId, album).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  }

  removeAlbumFromCollectionAsync(
    collectionId: string,
    album: AlbumResponse
  ): Observable<Collection> {
    return this.http.post<Collection>(
      this.baseUrl + `${this.apiUrl}/removeAlbum`,
      { CollectionId: collectionId, AlbumId: album.id }
    );
  }
}
