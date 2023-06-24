import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, switchMap } from 'rxjs';
import { AlbumResponse } from '../interfaces/Spotify/Search/AlbumResponse';
import { ArtistResponse } from '../interfaces/Spotify/Search/ArtistResponse';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {}

  searchArtist(searchQuery: string): Observable<ArtistResponse[]> {
    return this.searchAlbumAsync(searchQuery).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  }

  searchArtistAsync(searchQuery: string): Observable<ArtistResponse[]> {
    return this.http.get<ArtistResponse[]>(
      this.baseUrl + 'api/v1/spotify/search/artists?query=' + searchQuery,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }

  searchAlbum(searchQuery: string): Observable<AlbumResponse[]> {
    return this.searchAlbumAsync(searchQuery).pipe(
      switchMap((response) => {
        return of(response);
      })
    );
  }

  searchAlbumAsync(searchQuery: string): Observable<AlbumResponse[]> {
    return this.http.get<AlbumResponse[]>(
      this.baseUrl + 'api/v1/spotify/search/albums?query=' + searchQuery,
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}
