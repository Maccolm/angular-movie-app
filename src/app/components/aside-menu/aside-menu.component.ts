import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie-aside-menu',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './aside-menu.component.html',
  styleUrl: './aside-menu.component.scss',
})
export class MovieAsideMenuComponent {
  links = [
    {
      name: 'Now playing',
      url: 'now-playing',
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
      url: 'top-rate',
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
