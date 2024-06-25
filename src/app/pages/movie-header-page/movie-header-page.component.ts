import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MovieHeaderComponent } from "../../components/movie-header/movie-header.component";

@Component({
    selector: 'app-movie-header-page',
    standalone: true,
    templateUrl: './movie-header-page.component.html',
    styleUrl: './movie-header-page.component.scss',
    imports: [RouterModule, MovieHeaderComponent]
})
export class MovieHeaderPageComponent {

	favoritesMoviesListIds:string[] = []
	watchLaterMoviesListIds:string[] = []
}
