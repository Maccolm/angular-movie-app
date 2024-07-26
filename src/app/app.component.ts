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
  constructor(private movieService: MovieService) {
	super()
  }

  ngOnInit(): void {
	//коли ціх субскрайбів немає, то при оновленні сторінки помітки in favorite, watchlist зникають. Тільки з ними вони залишаються на місці.
	this.movieService.getFavoriteMovies().pipe(takeUntil(this.destroy$)).subscribe(movies => {
		const favoriteMovies = movies
		favoriteMovies.forEach(movie => {
			this.movieService.setToFavoriteMoviesSubject(movie);
		});
	});
	this.movieService.getWatchList().pipe(takeUntil(this.destroy$)).subscribe(movies => {
		const watchList = movies
		watchList.forEach(movie => {
			this.movieService.setToWatchListSubject$(movie);
		});
	});
	}
}
