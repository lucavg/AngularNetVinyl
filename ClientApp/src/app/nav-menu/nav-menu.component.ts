import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RefreshService } from '../services/refresh.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
})
export class NavMenuComponent {
  isExpanded: boolean = false;

  constructor(
    private authService: AuthService,
    private refreshService: RefreshService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.refreshService.refresh$.subscribe(() => {
      this.isLoggedIn();
    });
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  closeMenu() {
    this.isExpanded = false;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  getUsername(): string {
    const username = this.authService.getUsername();
    return username;
  }

  logout() {
    this.closeMenu();
    this.authService.logout();
    this.refreshService.triggerRefresh();
    this.toastr.info('Logged out!');
    this.router.navigate(['/']);
  }
}
