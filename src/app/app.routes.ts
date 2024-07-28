import { Routes } from '@angular/router';
import { MovieDescriptionComponent } from './pages/description-movie-page/description-movie-page.component';
import { MovieFavoriteListPageComponent } from './pages/favorite-list-movie-page/favorite-list-movie-page.component';
import { MovieWatchListPageComponent } from './pages/movie-watchList-page/movie-watchList-page.component';
import { MovieNowPlayingPageComponent } from './pages/now-playing-movie-page/now-playing-movie-page.component';
import { MoviePopularPageComponent } from './pages/popular-movie-page/popular-movie-page.component';
import { MovieTopRatePageComponent } from './pages/top-rate-movie-page/top-rate-movie-page.component';
import { MovieUpcomingPageComponent } from './pages/upcoming-movie-page/upcoming-movie-page.component';
import { favoriteMoviesResolver } from './routerGuards/favoriteMovies.resolver';
import { watchListMoviesResolver } from './routerGuards/watchList.resolver';

export const routes: Routes = [
	{path: '', component: MovieNowPlayingPageComponent, resolve: {favoriteMovies: favoriteMoviesResolver, watchList: watchListMoviesResolver}},
	{path: 'now-playing', component: MovieNowPlayingPageComponent, resolve: {favoriteMovies: favoriteMoviesResolver, watchList: watchListMoviesResolver}},
	{path: 'popular', component: MoviePopularPageComponent, resolve: {favoriteMovies: favoriteMoviesResolver, watchList: watchListMoviesResolver}},
	{path: 'top-rate', component: MovieTopRatePageComponent, resolve: {favoriteMovies: favoriteMoviesResolver, watchList: watchListMoviesResolver}},
	{path: 'upcoming', component: MovieUpcomingPageComponent, resolve: {favoriteMovies: favoriteMoviesResolver, watchList: watchListMoviesResolver}},
	{path: 'favorites', component: MovieFavoriteListPageComponent, resolve: {favoriteMovies: favoriteMoviesResolver, watchList: watchListMoviesResolver}},
	{path: 'watch-list', component: MovieWatchListPageComponent, resolve: {favoriteMovies: favoriteMoviesResolver, watchList: watchListMoviesResolver}},
	{path: 'movie/:id', component: MovieDescriptionComponent},
];
