import { Routes } from '@angular/router';
import { MovieDescriptionComponent } from './pages/description-movie-page/description-movie-page.component';
import { MovieFavoriteListPageComponent } from './pages/favorite-list-movie-page/favorite-list-movie-page.component';
import { MovieWatchListPageComponent } from './pages/movie-watchList-page/movie-watchlist-page.component';
import { MovieNowPlayingPageComponent } from './pages/now-playing-movie-page/now-playing-movie-page.component';
import { MoviePopularPageComponent } from './pages/popular-movie-page/popular-movie-page.component';
import { MovieTopRatePageComponent } from './pages/top-rate-movie-page/top-rate-movie-page.component';
import { MovieUpcomingPageComponent } from './pages/upcoming-movie-page/upcoming-movie-page.component';
import { movieListResolver } from './routerGuards/movieList.resolver';


export const routes: Routes = [
	{path: '', component: MovieNowPlayingPageComponent, resolve: {data: movieListResolver}},
	{path: 'now_playing', component: MovieNowPlayingPageComponent, resolve: {data: movieListResolver}},
	{path: 'popular', component: MoviePopularPageComponent, resolve: {data: movieListResolver}},
	{path: 'top_rated', component: MovieTopRatePageComponent, resolve: {data: movieListResolver}},
	{path: 'upcoming', component: MovieUpcomingPageComponent, resolve: {data: movieListResolver}},
	{path: 'favorites', component: MovieFavoriteListPageComponent},
	{path: 'watch-list', component: MovieWatchListPageComponent},
	{path: 'movie/:id', component: MovieDescriptionComponent},
];
