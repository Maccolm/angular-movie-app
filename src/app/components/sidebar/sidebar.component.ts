import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MovieAsideMenuComponent } from '../aside-menu/aside-menu.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SortingComponent } from '../sorting/sorting.component';
import { SearchResultsPageComponent } from "../../pages/search-results-page/search-results-page.component";
import { ClearObservable } from '../../directives/clearObservable';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-movie-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    ButtonModule,
    SidebarModule,
    MovieAsideMenuComponent,
    RouterLink,
    RouterModule,
    SortingComponent,
    SearchResultsPageComponent,
],
providers: [ConfirmationService]
})
export class MovieSidebarComponent extends ClearObservable implements OnInit {
  sidebarVisible: boolean = false;
  isClosedButtonBar: boolean = false;
	constructor(){
		super();
	}
	ngOnInit(): void {

	}
  links = [
    { name: 'Now playing', url: 'now_playing' },
    { name: 'Popular', url: 'popular' },
    { name: 'Top Rate', url: 'top_rated' },
    { name: 'Upcoming', url: 'upcoming' },
  ];
}
