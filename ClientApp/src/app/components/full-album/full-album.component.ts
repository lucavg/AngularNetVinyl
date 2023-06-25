import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { AlbumComplete } from 'src/app/interfaces/Spotify/Search/AlbumComplete';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-full-album',
  templateUrl: './full-album.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullAlbumComponent {
  @Input() album: AlbumComplete = {} as AlbumComplete;

  constructor(private collectionService: CollectionService) {}

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
        .subscribe(() => {
          this.album.added_to_collection = false;
        });
    }
  }
}
