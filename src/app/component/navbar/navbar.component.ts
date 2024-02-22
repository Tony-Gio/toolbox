import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isMenuOpen: boolean = false;

  toggleMenu(): void{
    this.isMenuOpen= !this.isMenuOpen;
  }
}
