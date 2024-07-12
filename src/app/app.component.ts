import { Component, OnInit} from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieAsideMenuComponent } from "./components/aside-menu/aside-menu.component";
import { MovieSidebarComponent } from "./components/sidebar/sidebar.component";
import { MovieHeaderComponent } from "./components/header-movie/header-movie.component";

@Component({
    selector: 'app-root ',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        MovieListComponent,
        RouterModule,
        RouterLink,
        MovieAsideMenuComponent,
        MovieSidebarComponent,
        MovieHeaderComponent
    ]
})
export class AppComponent implements OnInit{

	constructor() {}

	ngOnInit(): void {
	}
}
