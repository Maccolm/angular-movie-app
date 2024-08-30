import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieAsideMenuComponent } from './components/aside-menu/aside-menu.component';
import { MovieSidebarComponent } from './components/sidebar/sidebar.component';
import { MovieHeaderComponent } from './components/header-movie/header-movie.component';
import { AuthService } from './services/auth.service';
import { ClearObservable } from './directives/clearObservable';
import { Store, StoreModule } from '@ngrx/store';
import { loadFavoriteMovies, loadTrendingMovies, loadWatchList } from './store/actions';
import { takeUntil } from 'rxjs';

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
		StoreModule,
	],
})
export class AppComponent extends ClearObservable implements OnInit {
	constructor(private authService: AuthService, private store: Store) {
		super()
	}

	ngOnInit(): void {
		this.store.dispatch(loadTrendingMovies());
		const login = window.localStorage.getItem('login');
		const password = window.localStorage.getItem('password');
		if (login && password) {
			this.authService.authenticateAndGetAccountId().pipe(takeUntil(this.destroy$)).subscribe(data => {
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
}
