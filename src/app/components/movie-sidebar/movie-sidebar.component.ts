import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MovieAsideMenuComponent } from "../movie-aside-menu/movie-aside-menu.component";
import { RouterLink, RouterModule } from '@angular/router';

@Component({
    selector: 'app-movie-sidebar',
    standalone: true,
    templateUrl: './movie-sidebar.component.html',
    styleUrl: './movie-sidebar.component.scss',
    imports: [ButtonModule, SidebarModule, MovieAsideMenuComponent, RouterLink, RouterModule]
})
export class MovieSidebarComponent {
	sidebarVisible: boolean = false
}
