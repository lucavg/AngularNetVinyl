import { Component } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { AlbumResponse } from '../interfaces/Spotify/Search/AlbumResponse';
import { ArtistResponse } from '../interfaces/Spotify/Search/ArtistResponse';
import { CollectionService } from '../services/collection.service';
import { AuthService } from '../services/auth.service';
import { Collection } from '../interfaces/Collection/Collection';
import { CollectionResponse } from '../interfaces/Collection/CollectionResponse';
import { CollectionAlbum } from '../interfaces/Collection/CollectionAlbum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchQuery: string = '';
  searchType: string = 'album';
  albumSearchResults: AlbumResponse[] = [];
  artistSearchResults: ArtistResponse[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;

  constructor(
    private spotifyService: SpotifyService,
    private collectionService: CollectionService,
    private authService: AuthService
  ) {}

  search(): void {
    switch (this.searchType) {
      case 'artist':
        this.searchArtist();
        break;
      case 'album':
        this.searchAlbum();
        break;
      default:
        break;
    }
  }

  searchArtist() {
    this.artistSearchResults = [];
    this.albumSearchResults = [];
    this.currentPage = 1;
    try {
      this.spotifyService.searchArtist(this.searchQuery).subscribe({
        error: (response) => {
          console.log('Search failed: ' + response.message);
        },
        next: (response: any) => {
          this.artistSearchResults = response.artists.items;
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  searchAlbum(): void {
    this.artistSearchResults = [];
    this.albumSearchResults = [];
    this.currentPage = 1;
    try {
      this.spotifyService.searchAlbum(this.searchQuery).subscribe({
        error: (response) => {
          console.log('Search failed: ' + response.message);
        },
        next: (response: any) => {
          this.albumSearchResults = response.albums.items;

          if (this.authService.isLoggedIn()) {
            var collectionId = localStorage.getItem('collectionId');
            this.collectionService
              .getCollection(collectionId!)
              .subscribe((collection: CollectionResponse) => {
                this.albumSearchResults.forEach((album: AlbumResponse) => {
                  const foundAlbum = collection.albums.find(
                    (cAlbum: CollectionAlbum) => cAlbum.id === album.id
                  );
                  album.added_to_collection = !!foundAlbum;
                });
              });
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  get totalPages(): number[] {
    var totalPages: number[] = [];
    switch (this.searchType) {
      case 'artist':
        const totalAlbums = Math.ceil(
          this.artistSearchResults.length / this.itemsPerPage
        );
        totalPages = Array(totalAlbums)
          .fill(0)
          .map((_, index) => index + 1);
        break;
      case 'album':
        const totalArtists = Math.ceil(
          this.albumSearchResults.length / this.itemsPerPage
        );
        totalPages = Array(totalArtists)
          .fill(0)
          .map((_, index) => index + 1);
        break;
    }
    return totalPages;
  }

  setCurrentPage(page: number): void {
    if (page >= 1 && page <= this.totalPages.length) {
      this.currentPage = page;
    }
  }

  getIterable(value: any): any[] {
    return Array.isArray(value) ? value : Array.from({ length: value });
  }
}
