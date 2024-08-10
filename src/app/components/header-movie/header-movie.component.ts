import { Component } from '@angular/core';
import{ RouterLink } from '@angular/router';

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
