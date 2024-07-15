import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieAsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { MovieSidebarComponent } from './components/sidebar/sidebar.component';
import { MovieHeaderComponent } from './components/header-movie/header-movie.component';
import { AuthService } from './services/auth.service';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root ',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    RouterOutlet,
    MovieListComponent,
    RouterModule,
    RouterLink,
    MovieAsideMenuComponent,
    MovieSidebarComponent,
    MovieHeaderComponent,
  ],
})
export class AppComponent implements OnInit {
  constructor(private movieService: MovieService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authenticateAndGetAccountId().subscribe(
      (accountId) => {
        this.movieService.setAccountId(accountId);
        console.log('Account ID:', accountId);
      },
      (error) => {
        console.error('Authentication failed:', error);
      }
    );
  }
}
