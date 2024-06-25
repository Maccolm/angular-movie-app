import { Component } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { upcomingMovies } from '../../../../mock-data';

@Component({
    selector: 'app-movie-upcoming-page',
    standalone: true,
    templateUrl: './movie-upcoming-page.component.html',
    styleUrl: './movie-upcoming-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieUpcomingPageComponent {
 public movies = upcomingMovies
}
