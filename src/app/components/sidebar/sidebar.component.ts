import { Component, HostListener } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MovieAsideMenuComponent } from '../aside-menu/aside-menu.component';
import { RouterLink, RouterModule } from '@angular/router';
import { SortingComponent } from '../sorting/sorting.component';
import { SearchResultsPageComponent } from "../../pages/search-results-page/search-results-page.component";
import { ClearObservable } from '../../directives/clearObservable';
import { ConfirmationService } from 'primeng/api';
import { FiltersMovieComponent } from '../filters-movie/filters-movie.component';
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
	 FiltersMovieComponent
],
providers: [ConfirmationService]
})
export class MovieSidebarComponent extends ClearObservable {
	sidebarVisible: boolean = false;
	isClosedButtonBar: boolean = false;
	constructor(){
		super();
	}

	@HostListener('document:click', ['$event'])
	onDocumentClick(event: MouseEvent) {
		const target = event.target as HTMLElement;
		const isClickedInside = target.closest('.custom-sidebar');
		const clickedButton = target.closest('.bar-button');
		const filterPanel = target.closest('.p-dialog');
		const li = target.closest('li');
		const isCheckbox = target.closest('svg');
		const isSubmitButton = target.closest('.filter__button-submit');
	if (!isClickedInside && !clickedButton && this.sidebarVisible && !filterPanel && !li && !isCheckbox) {
		this.sidebarVisible = false;
	} else if(isSubmitButton) {
			setTimeout(() => {
				this.sidebarVisible = false;
			},300)
		}
	}

	links = [
		{
		  name: 'Now playing',
		  url: 'now_playing',
		  icon: 'pi pi-play-circle',
		  color: 'color: rgb(89, 133, 92)',
		},
		{
		  name: 'Popular',
		  url: 'popular',
		  icon: 'pi pi-chart-line',
		  color: 'color: rgb(236, 200, 90)',
		},
		{
		  name: 'Top rate',
		  url: 'top_rated',
		  icon: 'pi pi-star-fill',
		  color: 'color: rgb(255, 140, 68)',
		},
		{
		  name: 'Upcoming',
		  url: 'upcoming',
		  icon: 'pi pi-calendar-clock',
		  color: 'color: rgb(89, 110, 133)',
		},
	 ];
}
