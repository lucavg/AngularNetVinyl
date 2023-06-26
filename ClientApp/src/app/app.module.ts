import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SearchComponent } from './search/search.component';
import { CollectionComponent } from './collection/collection.component';
import { AlbumComponent } from './components/album/album.component';
import { PaginationPipe } from './pipes/pagination-pipe';
import { ArtistComponent } from './components/artist/artist.component';
import { FullAlbumComponent } from './components/full-album/full-album.component';
import { RefreshService } from './services/refresh.service';
import { AuthGuard } from './guards/auth-guard.guard';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    SearchComponent,
    CollectionComponent,
    AlbumComponent,
    FullAlbumComponent,
    ArtistComponent,
    PaginationPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 3000,
      progressBar: true,
    }),
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
      {
        path: 'collection',
        component: CollectionComponent,
        canActivate: [AuthGuard],
      },
    ]),
  ],
  providers: [RefreshService],
  bootstrap: [AppComponent],
})
export class AppModule {}
