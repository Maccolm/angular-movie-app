import { Component, OnInit} from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { MovieListPageComponent } from "./pages/movie-list-page/movie-list-page.component";
import { MovieAsideMenuComponent } from "./components/movie-aside-menu/movie-aside-menu.component";
import { MovieSidebarComponent } from "./components/movie-sidebar/movie-sidebar.component";
import { MovieHeaderComponent } from "./components/movie-header/movie-header.component";

@Component({
    selector: 'app-root ',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [
        RouterOutlet,
        MovieListComponent,
        MovieListPageComponent,
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
