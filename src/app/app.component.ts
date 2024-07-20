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
	private subscriptions: Subscription = new Subscription;
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
//1) тут я отримую список улюблених та watchlist фільмів та сетаю в сабжект, це працює після оновлення сторінки
	 this.subscriptions.add( this.movieService.getFavoriteMovies().subscribe(movies => {
		const favoriteMovies = movies;
	},
	error => {
		console.error('Failed to load favorite movies:', error);
	 })
	)
	this.subscriptions.add( this.movieService.getWatchList().subscribe(movies =>{
		const watchList = movies
	}))
}

	ngOnDestroy(): void {
		this.subscriptions.unsubscribe();
	}
}
