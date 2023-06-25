import { Component, Input } from '@angular/core';
import { AlbumResponse } from 'src/app/interfaces/Spotify/Search/AlbumResponse';
import { CollectionService } from 'src/app/services/collection.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  @Input() album: AlbumResponse = {} as AlbumResponse;

  constructor(
    private collectionService: CollectionService,
    private cdRef: ChangeDetectorRef
  ) {}

  AlbumComponent(album: AlbumResponse) {
    this.album = album;
  }

  getArtistName(): string {
    return this.album.artists[0].name;
  }

  addToFavorites() {
    try {
      var collectionId = localStorage.getItem('collectionId');
      if (collectionId != undefined) {
        this.collectionService
          .addAlbumToCollection(collectionId, this.album)
          .subscribe({
            error: (response) => {
              console.log('Search failed: ' + response.message);
            },
            next: () => {
              this.album.added_to_collection = true;
              this.cdRef.detectChanges();
            },
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  removeFromFavorites() {
    try {
      var collectionId = localStorage.getItem('collectionId');
      if (collectionId != undefined) {
        this.collectionService
          .removeAlbumFromCollection(collectionId, this.album)
          .subscribe({
            error: (response) => {
              console.log('Search failed: ' + response.message);
            },
            next: () => {
              this.album.added_to_collection = false;
              this.cdRef.detectChanges();
            },
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
