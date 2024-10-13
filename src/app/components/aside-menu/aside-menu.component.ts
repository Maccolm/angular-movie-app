import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SortingComponent } from "../sorting/sorting.component";
import { FiltersMovieComponent } from '../filters-movie/filters-movie.component';

@Component({
  selector: 'app-movie-aside-menu',
  standalone: true,
  imports: [RouterModule, SortingComponent, FiltersMovieComponent],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss',
})
export class MovieAsideMenuComponent {
  links = [
    {
      name: 'Now playing',
      url: 'now_playing',
      icon: 'pi pi-play-circle',
      color: 'color: rgb(89, 133, 92)',
    },
    {
      name: 'Popular',
      url: 'popular',
      icon: 'pi pi-chart-line',
      color: 'color: rgb(236, 200, 90)',
    },
    {
      name: 'Top rate',
      url: 'top_rated',
      icon: 'pi pi-star-fill',
      color: 'color: rgb(255, 140, 68)',
    },
    {
      name: 'Upcoming',
      url: 'upcoming',
      icon: 'pi pi-calendar-clock',
      color: 'color: rgb(89, 110, 133)',
    },
  ];
  tvShowLinks = [
	{
		name: 'Airing today',
		url: 'airing_today',
		icon: 'pi pi-cloud',
		color: 'color: #19769c',
	},
	{
		name: 'On the air',
		url: 'on_the_air',
		icon: 'pi pi-check-circle',
		color: 'color: rgb(89, 133, 92)',
	},
	{
		name: 'Popular',
		url: 'popular',
		icon: 'pi pi-chevron-circle-right',
		color: 'color: rgb(236, 200, 90)',
	},
	{
		name: 'Top rated',
		url: 'top_rated',
		icon: 'pi pi-chevron-up',
		color: 'color: rgb(255, 140, 68)',
	}
 ];
}
