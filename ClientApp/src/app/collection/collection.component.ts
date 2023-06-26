import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CollectionService } from '../services/collection.service';
import { AlbumResponse } from '../interfaces/Spotify/Search/AlbumResponse';
import { SpotifyService } from '../services/spotify.service';
import { AlbumComplete } from '../interfaces/Spotify/Search/AlbumComplete';
import { Observable, forkJoin, switchMap, tap } from 'rxjs';
import { RefreshService } from '../services/refresh.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css'],
})
export class CollectionComponent implements OnInit {
  albums: AlbumComplete[] = [];
  filteredAlbums: AlbumComplete[] = [];
  searchControl = new FormControl('');
  currentPage = 1;
  itemsPerPage = 9;
  collectionId = localStorage.getItem('collectionId');

  constructor(
    private collectionService: CollectionService,
    private spotifyService: SpotifyService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    this.refreshService.refresh$.subscribe(() => {
      this.loadData();
      this.searchControl.valueChanges.subscribe((searchTerm) => {
        this.filterAlbums(searchTerm!);
      });
    });

    this.loadData();
    this.searchControl.valueChanges.subscribe((searchTerm) => {
      this.filterAlbums(searchTerm!);
    });
  }

  loadData(): void {
    this.loadCollection().subscribe(() => {
      this.filteredAlbums = this.albums;
      this.filterAlbums(this.searchControl.value!);
    });
  }

  loadCollection(): Observable<AlbumComplete[]> {
    return this.collectionService.getCollection(this.collectionId!).pipe(
      switchMap((collection) => {
        const albumIds = collection.albums.map((album) => album.id);
        const albumRequests = albumIds.map((albumId) =>
          this.spotifyService.getAlbum(albumId)
        );

        return forkJoin(albumRequests).pipe(
          tap((albums) => {
            this.albums = albums;
          })
        );
      })
    );
  }

  filterAlbums(searchTerm: string): void {
    const filtered = this.albums.filter(
      (album) =>
        album.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (album.artists.length > 0 &&
          album.artists[0].name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()))
    );
    this.filteredAlbums = filtered;
    this.currentPage = 1;
  }

  get totalPages(): number[] {
    var totalPages: number[] = [];
    const totalAlbums = Math.ceil(this.albums.length / this.itemsPerPage);
    totalPages = Array(totalAlbums)
      .fill(0)
      .map((_, index) => index + 1);
    return totalPages;
  }

  get visibleAlbums(): AlbumComplete[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredAlbums.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
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
