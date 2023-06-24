import { Component, Input } from '@angular/core';
import { AlbumResponse } from 'src/app/interfaces/Spotify/Search/AlbumResponse';
import { ArtistResponse } from 'src/app/interfaces/Spotify/Search/ArtistResponse';

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
})
export class ArtistComponent {
  @Input() artist: ArtistResponse = {} as ArtistResponse;

  AlbumComponent(artist: ArtistResponse) {
    this.artist = artist;
  }
}
