import { Component } from '@angular/core';
import { nowPlayingMovies } from '../../../../mock-data';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
@Component({
    selector: 'app-movie-now-playing-page',
    standalone: true,
    templateUrl: './movie-now-playing-page.component.html',
    styleUrl: './movie-now-playing-page.component.scss',
    imports: [MovieCardComponent]
})
export class MovieNowPlayingPageComponent {
	public movies = nowPlayingMovies
}
