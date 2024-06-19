import { Routes } from '@angular/router';
import { MovieDescriptionComponent } from './pages/movie-description/movie-description.component';
import { MovieListPageComponent } from './pages/movie-list-page/movie-list-page.component';

export const routes: Routes = [
	{path: '', component: MovieListPageComponent},
	{path: 'movie/:id', component: MovieDescriptionComponent}
];
