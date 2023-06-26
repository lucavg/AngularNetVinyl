import { Component, Input } from '@angular/core';
import { AlbumResponse } from 'src/app/interfaces/Spotify/Search/AlbumResponse';
import { CollectionService } from 'src/app/services/collection.service';
import { ChangeDetectorRef } from '@angular/core';
import { RefreshService } from 'src/app/services/refresh.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  @Input() album: AlbumResponse = {} as AlbumResponse;

  constructor(
    private collectionService: CollectionService,
    private refreshService: RefreshService,
    private toastr: ToastrService
  ) {}

  AlbumComponent(album: AlbumResponse) {
    this.album = album;
  }

  getArtistName(): string {
    return this.album.artists[0].name;
  }

  getAddedToCollection(): boolean {
    return this.album.added_to_collection;
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
              this.refreshService.triggerRefresh();
              this.toastr.info('Album added to favorites!');
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
              this.toastr.error('Failed to remove album from favorites!');
            },
            next: () => {
              this.album.added_to_collection = false;
              this.refreshService.triggerRefresh();
              this.toastr.info('Album removed from favorites!');
            },
          });
      }
    } catch (error) {
      console.log(error);
    }
  }
}
