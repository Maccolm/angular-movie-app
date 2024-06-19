import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieListPageComponent } from "./pages/movie-list-page/movie-list-page.component";
import { MovieSidebarComponent } from "./pages/movie-sidebar/movie-sidebar.component";
import { MovieHeaderComponent } from "./pages/movie-header/movie-header.component";

@Component({
    selector: 'app-root ',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MovieListComponent, MovieListPageComponent, MovieSidebarComponent, MovieHeaderComponent]
})
export class AppComponent {

}
