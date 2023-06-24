import { Component, Input } from '@angular/core';
import { AlbumResponse } from 'src/app/interfaces/Spotify/Search/AlbumResponse';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  @Input() album: AlbumResponse = {} as AlbumResponse;
  addedToCollection: boolean = false;

  AlbumComponent(album: AlbumResponse) {
    this.album = album;
  }

  getArtistName(): string {
    return this.album.artists[0].name;
  }

  addToFavorites(): void {
    console.log('Added to favorites');
  }
}
