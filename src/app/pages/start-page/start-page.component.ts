import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss'
})
export class StartPageComponent {
	IMAGINE_PATH = '../../../assets/img/background/poster_bg.jpg';
	imgTitle = 'Background';
	constructor(){}

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
		  name: 'Top rated',
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
}
