import { Component, Input } from '@angular/core';
import{ Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-movie.component.html',
  styleUrl: './header-movie.component.scss',
})
export class MovieHeaderComponent {
  constructor() {}
}
