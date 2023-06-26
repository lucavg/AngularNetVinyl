import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AlbumComplete } from 'src/app/interfaces/Spotify/Search/AlbumComplete';
import { CollectionService } from 'src/app/services/collection.service';
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-full-album',
  templateUrl: './full-album.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullAlbumComponent {
  @Input() album: AlbumComplete = {} as AlbumComplete;

  constructor(
    private collectionService: CollectionService,
    private refreshService: RefreshService,
    private toastr: ToastrService
  ) {}

  getArtistName(): string {
    return this.album.artists[0].name || '';
  }

  getSpotifyLink(): string | undefined {
    return this.album.external_urls.spotify;
  }

  removeFromFavorites(): void {
    const collectionId = localStorage.getItem('collectionId');
    if (collectionId !== null) {
      this.collectionService
        .removeAlbumFromCollection(collectionId, this.album)
        .subscribe({
          next: () => {
            this.album.added_to_collection = false;
            this.refreshService.triggerRefresh();
            this.toastr.info('Album removed from favorites!');
          },
          error: (response) => {
            this.toastr.error('Failed to remove album from favorites!');
          },
        });
    }
  }
}
