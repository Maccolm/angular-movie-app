import { Component } from '@angular/core';
import { MovieAsideMenuComponent } from "../../components/movie-aside-menu/movie-aside-menu.component";

@Component({
    selector: 'app-movie-aside-menu-page',
    standalone: true,
    templateUrl: './movie-aside-menu-page.component.html',
    styleUrl: './movie-aside-menu-page.component.scss',
    imports: [MovieAsideMenuComponent]
})
export class MovieAsideMenuPageComponent {

}
