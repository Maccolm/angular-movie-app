import { Routes } from '@angular/router';
import { MovieDescriptionComponent } from './pages/description-movie-page/description-movie-page.component';
import { MovieFavoriteListPageComponent } from './pages/favorite-list-movie-page/favorite-list-movie-page.component';
import { MovieWatchListPageComponent } from './pages/movie-watchList-page/movie-watchList-page.component';
import { MovieNowPlayingPageComponent } from './pages/now-playing-movie-page/now-playing-movie-page.component';
import { MoviePopularPageComponent } from './pages/popular-movie-page/popular-movie-page.component';
import { MovieTopRatePageComponent } from './pages/top-rate-movie-page/top-rate-movie-page.component';
import { MovieUpcomingPageComponent } from './pages/upcoming-movie-page/upcoming-movie-page.component';

export const routes: Routes = [
	{path: '', component: MovieNowPlayingPageComponent},
	{path: 'now-playing', component: MovieNowPlayingPageComponent},
	{path: 'popular', component: MoviePopularPageComponent},
	{path: 'top-rate', component: MovieTopRatePageComponent},
	{path: 'upcoming', component: MovieUpcomingPageComponent},
	{path: 'favorites', component: MovieFavoriteListPageComponent},
	{path: 'watch-list', component: MovieWatchListPageComponent},
	{path: 'movie/:id', component: MovieDescriptionComponent},
];
