import { Routes } from '@angular/router';
import { movieListResolver } from './routerGuards/movieList.resolver';


export const routes: Routes = [
	{path: '', loadComponent: () => import('./pages/start-page/start-page.component').then(m => m.StartPageComponent)},
	{path: 'now_playing', loadComponent: () => import('./pages/now-playing-movie-page/now-playing-movie-page.component').then(m => m.MovieNowPlayingPageComponent), resolve: {data: movieListResolver}},
	{path: 'popular', loadComponent: () => import('./pages/popular-movie-page/popular-movie-page.component').then(m => m.MoviePopularPageComponent), resolve: {data: movieListResolver}},
	{path: 'top_rated', loadComponent: () => import('./pages/top-rate-movie-page/top-rate-movie-page.component').then(m => m.MovieTopRatePageComponent), resolve: {data: movieListResolver}},
	{path: 'upcoming', loadComponent: () => import('./pages/upcoming-movie-page/upcoming-movie-page.component').then(m => m.MovieUpcomingPageComponent), resolve: {data: movieListResolver}},
	{path: 'favorites', loadComponent: () => import('./pages/favorite-list-movie-page/favorite-list-movie-page.component').then( m => m.MovieFavoriteListPageComponent)},
	{path: 'watch-list', loadComponent: () => import('./pages/movie-watchlist-page/movie-watchlist-page.component').then(m => m.MovieWatchListPageComponent)},
	{path: 'movie/:id', loadComponent: () => import('./pages/description-movie-page/description-movie-page.component').then(m => m.MovieDescriptionComponent)},
	{path: 'search_results', loadComponent: () => import('./pages/search-results-page/search-results-page.component').then(m => m.SearchResultsPageComponent)}
];
