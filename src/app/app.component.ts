import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieListPageComponent } from "./pages/movie-list-page/movie-list-page.component";
import { MovieHeaderComponent } from "./pages/movie-header-page/movie-header-page.component";
import { MovieSidebarPageComponent } from "./pages/movie-sidebar-page/movie-sidebar-page.component";

@Component({
    selector: 'app-root ',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, MovieListComponent, MovieListPageComponent, MovieHeaderComponent, MovieSidebarPageComponent]
})
export class AppComponent {

}
