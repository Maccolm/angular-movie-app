import { Routes } from '@angular/router';
import { MovieDescriptionComponent } from './pages/movie-description-page/movie-description-page.component';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { MovieFavoriteListPageComponent } from './pages/movie-favorite-list-page/movie-favorite-list-page.component';
import { MovieWatchlistPageComponent } from './pages/movie-watchlist-page/movie-watchlist-page.component';

export const routes: Routes = [
	{path: '', component: MovieListPageComponent},
	{path: 'movie/:id', component: MovieDescriptionComponent},
	
	{path: 'favorites', component: MovieFavoriteListPageComponent, outlet: 'header'},
	{path: 'watch-list', component: MovieWatchlistPageComponent, outlet: 'header'}
];
