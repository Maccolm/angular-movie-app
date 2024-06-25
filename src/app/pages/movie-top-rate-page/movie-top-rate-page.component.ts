import { Component } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { topRatedMovies } from '../../../../mock-data';
@Component({
    selector: 'app-movie-top-rate-page',
    standalone: true,
    templateUrl: './movie-top-rate-page.component.html',
    styleUrl: './movie-top-rate-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieTopRatePageComponent {
 public movies = topRatedMovies
}
