import { Component, OnInit } from '@angular/core';
import { MovieCardComponent } from "../../components/movie-card/movie-card.component";
import { upcomingMovies } from '../../../../mock-data';
import { MovieHeaderComponent } from "../../components/movie-header/movie-header.component";
import { MovieService } from '../../services/movie.service';

@Component({
    selector: 'app-movie-upcoming-page',
    standalone: true,
    templateUrl: './movie-upcoming-page.component.html',
    styleUrl: './movie-upcoming-page.component.scss',
    imports: [MovieCardComponent, MovieHeaderComponent]
})
export class MovieUpcomingPageComponent implements OnInit{
 public upcoming: any[] = []

constructor(private movieService: MovieService) {}
ngOnInit(): void {
	this.upcoming = this.movieService.getUpcomingMovies();
}
}
