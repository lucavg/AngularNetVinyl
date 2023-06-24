import { Component, Input } from '@angular/core';
import { AlbumResponse } from 'src/app/interfaces/Spotify/Search/AlbumResponse';
import { CollectionService } from 'src/app/services/collection.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
})
export class AlbumComponent {
  @Input() album: AlbumResponse = {} as AlbumResponse;
  addedToCollection: boolean = false;

  constructor(private collectionService: CollectionService, private userService: UserService) {}

  AlbumComponent(album: AlbumResponse) {
    this.album = album;
  }

  getArtistName(): string {
    return this.album.artists[0].name;
  }

  addToFavorites() {
    try {
      this.userService.getUser().subscribe({
                error: (response) => {
          console.log('Search failed: ' + response.message);
        },
        next: (response) => {
          console.log(response);
        },
      });
      // this.collectionService.addAlbumToCollection('favorites', this.album).subscribe({
      //   error: (response) => {
      //     console.log('Search failed: ' + response.message);
      //   },
      //   next: (response) => {
      //     console.log(response);
      //   },
      // });
    }  catch (error) {
      console.log(error);
    }
  };
}
