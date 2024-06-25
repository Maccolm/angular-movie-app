import { Routes } from '@angular/router';
import { MovieDescriptionComponent } from './pages/movie-description-page/movie-description-page.component';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';
import { MovieFavoriteListPageComponent } from './pages/movie-favorite-list-page/movie-favorite-list-page.component';
import { MovieWatchlistPageComponent } from './pages/movie-watchlist-page/movie-watchlist-page.component';
import { MovieNowPlayingPageComponent } from './pages/movie-now-playing-page/movie-now-playing-page.component';
import { MoviePopularPageComponent } from './pages/movie-popular-page/movie-popular-page.component';
import { MovieTopRatePageComponent } from './pages/movie-top-rate-page/movie-top-rate-page.component';
import { MovieUpcomingPageComponent } from './pages/movie-upcoming-page/movie-upcoming-page.component';

export const routes: Routes = [
	{path: '', component: MovieListPageComponent},
	{path: 'movie/:id', component: MovieDescriptionComponent},
	{path: 'now-playing', component: MovieNowPlayingPageComponent},
	{path: 'popular', component: MoviePopularPageComponent},
	{path: 'top-rate', component: MovieTopRatePageComponent},
	{path: 'upcoming', component: MovieUpcomingPageComponent},
	
	{path: 'favorites', component: MovieFavoriteListPageComponent, outlet: 'header'},
	{path: 'watch-list', component: MovieWatchlistPageComponent, outlet: 'header'},
];
