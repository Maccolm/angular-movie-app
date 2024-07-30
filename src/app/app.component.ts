import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieAsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { MovieSidebarComponent } from './components/sidebar/sidebar.component';
import { MovieHeaderComponent } from './components/header-movie/header-movie.component';
import { AuthService } from './services/auth.service';
import { MovieService } from './services/movie.service';
import { takeUntil } from 'rxjs';
import { ClearObservable } from './directives/clearObservable';

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
export class AppComponent extends ClearObservable implements OnInit {
  constructor(private movieService: MovieService, private authService: AuthService) {
	super()
  }

  ngOnInit(): void {
	this.authService.authenticateAndGetAccountId().subscribe(
      data => {
			const { accountId, sessionId } = data;
        this.authService.setAccountId(accountId);
		  this.authService.setSessionId(sessionId)
		  console.log(data);

		  if (data !== null) {
			  this.loadFavoriteMovies()
			  this.loadWatchList()
		  }
      },
      error => {
        console.error('Authentication failed:', error);
      }
    );
	}
	loadFavoriteMovies(){
		this.movieService.getFavoriteMovies().pipe(takeUntil(this.destroy$)).subscribe(movies => {
			const favoriteMovies = movies
			favoriteMovies.forEach(movie => {
				this.movieService.setToFavoriteMoviesSubject(movie);
			});
		});
	}
	loadWatchList() {
		this.movieService.getWatchList().pipe(takeUntil(this.destroy$)).subscribe(movies => {
			const watchList = movies
			watchList.forEach(movie => {
				this.movieService.setToWatchListSubject$(movie);
			});
		});
	}
}
