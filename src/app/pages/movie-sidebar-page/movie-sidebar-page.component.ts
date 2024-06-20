import { Component } from '@angular/core';
import { MovieSidebarComponent } from "../../components/movie-sidebar/movie-sidebar.component";



@Component({
    selector: 'app-movie-sidebar-page',
    standalone: true,
    templateUrl: './movie-sidebar-page.component.html',
    styleUrl: './movie-sidebar-page.component.scss',
    imports: [MovieSidebarComponent]
})
export class MovieSidebarPageComponent {

}
