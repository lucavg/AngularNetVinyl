import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { AlbumResponse } from '../interfaces/Spotify/Search/AlbumResponse';
import { ArtistResponse } from '../interfaces/Spotify/Search/ArtistResponse';
import { AlbumComplete } from '../interfaces/Spotify/Search/AlbumComplete';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  searchAlbum(searchQuery: string): Observable<AlbumResponse[]> {
    return this.searchAlbumAsync(searchQuery).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  }

  searchAlbumAsync(searchQuery: string): Observable<AlbumResponse[]> {
    return this.http.get<AlbumResponse[]>(
      this.baseUrl + 'api/v1/spotify/search/albums',
      {
        headers: { 'Content-Type': 'application/json' },
        params: { query: searchQuery },
      }
    );
  }

  searchArtist(searchQuery: string): Observable<ArtistResponse[]> {
    return this.searchArtistAsync(searchQuery).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  }

  searchArtistAsync(searchQuery: string): Observable<ArtistResponse[]> {
    return this.http.get<ArtistResponse[]>(
      this.baseUrl + 'api/v1/spotify/search/artist',
      {
        headers: { 'Content-Type': 'application/json' },
        params: { query: searchQuery },
      }
    );
  }

  getAlbum(searchQuery: string): Observable<AlbumComplete> {
    return this.getAlbumAsync(searchQuery).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  }

  getAlbumAsync(searchQuery: string): Observable<AlbumComplete> {
    return this.http.get<AlbumComplete>(
      this.baseUrl + 'api/v1/spotify/get/album',
      {
        headers: { 'Content-Type': 'application/json' },
        params: { query: searchQuery },
      }
    );
  }
}
