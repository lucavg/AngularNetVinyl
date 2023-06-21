import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded: boolean = false;

  constructor(private authService: AuthService) {}

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  closeMenu() {
    this.isExpanded = false;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.closeMenu();
    this.authService.logout();
  }
}
