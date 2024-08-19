import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MovieService } from '../../services/movie.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [PanelMenuModule],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss'
})
export class SortingComponent implements OnInit{
	items!: MenuItem[];
	constructor(private movieService: MovieService) {}
	ngOnInit(): void {
		this.items = [
			{
				label: 'Sort By',
				icon: 'pi pi-sort-alt',
				items: [
					{
						label: "Rating",
						icon: 'pi pi-sort-amount-down',
						command: () => {
							console.log('sort by rating');
						}
					},
					{
						label: "Name  \"A-Z\"",
						icon: "pi pi-sort-alpha-down",
						command: () => {
							console.log('sort by title ascending');
						}
					},
					{
						label: "Name \"Z-A\"",
						icon: "pi pi-sort-alpha-up",
						command: () => {
							console.log('sort by title descending');
						}
					},
					{
						label: "Date",
						icon: "pi pi-calendar",
						command: () => {
							console.log('sort by title descending');
						}
					},
				]
			}
		]
	}
}
