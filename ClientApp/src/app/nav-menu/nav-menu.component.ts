import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded: boolean = false;

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  closeMenu() {
    this.isExpanded = false;
  }
}
