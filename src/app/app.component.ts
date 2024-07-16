import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieAsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { MovieSidebarComponent } from './components/sidebar/sidebar.component';
import { MovieHeaderComponent } from './components/header-movie/header-movie.component';
import { AuthService } from './services/auth.service';
import { MovieService } from './services/movie.service';
import { Subscription } from 'rxjs';

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
	private subscription!: Subscription;
  constructor(private movieService: MovieService, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.authenticateAndGetAccountId().subscribe(
      (accountId) => {
        this.movieService.setAccountId(accountId);
        console.log('Account ID:', accountId);
		
		  this.authService.authenticateAndGetSessionId().subscribe(
			 sessionId => {
				 console.log('SessionId:', sessionId);
				 this.movieService.setSessionId(sessionId)
			 }
		  )
      },
      (error) => {
        console.error('Authentication failed:', error);
      }
    );
//1) тут я отримую список улюблених фільмів та сетаю в сабжект, це працює після оновлення сторінки
	 this.subscription = this.movieService.getFavoriteMovies().subscribe(movies => {
		const favoriteMovies = movies;
		favoriteMovies.forEach(movie => {
			this.movieService.setToFavoriteMoviesSubject(movie)
		})
	},
	error => {
		console.error('Failed to load favorite movies:', error);
	 });
}

	ngOnDestroy(): void {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}
}
