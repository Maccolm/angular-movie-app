import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieAsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { MovieSidebarComponent } from './components/sidebar/sidebar.component';
import { MovieHeaderComponent } from './components/header-movie/header-movie.component';
import { AuthService } from './services/auth.service';
import { MovieService } from './services/movie.service';
import { ClearObservable } from './directives/clearObservable';
import { Store, StoreModule } from '@ngrx/store';
import { loadFavoriteMovies, loadWatchList } from './store/actions';

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
	 StoreModule
  ],
})
export class AppComponent extends ClearObservable implements OnInit {
  constructor(private movieService: MovieService, private authService: AuthService, private store: Store) {
	super()
  }

  ngOnInit(): void {
	  this.authService.authenticateAndGetAccountId().subscribe(
		  data => {
			  const { accountId, sessionId } = data;
			  this.authService.setAccountId(accountId);
			  this.authService.setSessionId(sessionId);
			},
			error => {
				console.error('Authentication failed:', error);
			}
		);
		this.store.dispatch(loadFavoriteMovies());
		this.store.dispatch(loadWatchList());
	}
}
