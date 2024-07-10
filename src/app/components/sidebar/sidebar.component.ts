import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MovieAsideMenuComponent } from "../aside-menu/aside-menu.component";
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    ButtonModule,
    SidebarModule,
    MovieAsideMenuComponent,
    RouterLink,
    RouterModule,
  ],
})
export class MovieSidebarComponent {
  sidebarVisible: boolean = false;

  links = [
    { name: 'Now playing', url: 'now-playing' },
    { name: 'Popular', url: 'popular' },
    { name: 'Top Rate', url: 'top-rate' },
    { name: 'Upcoming', url: 'upcoming' },
  ];
}
