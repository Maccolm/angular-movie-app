import { Component, OnInit } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { ClearObservable } from '../../directives/clearObservable';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [PanelMenuModule, CommonModule],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss'
})
export class SortingComponent extends ClearObservable implements OnInit{
	items!: MenuItem[];
	constructor(private router: Router) {
		super();
	}
	ngOnInit(): void {
		this.items = [
			{
				label: 'Sort By',
				icon: 'pi pi-sort-alt',
				items: [
					{
						label: "Rating",
						icon: 'pi pi-check',
						command: () => {
							const method = 'vote_average.desc';
							this.router.navigate(['sorting', {data: method}])
						}
					},
					{
						label: "Popularity",
						icon: 'pi pi-sort-amount-down',
						command: () => {
							const method = 'popularity.desc';
							this.router.navigate(['sorting', {data: method}])
						}
					},
					{
						label: "Name  \"A-Z\"",
						icon: "pi pi-sort-alpha-down",
						command: () => {
							const method = 'title.asc';
							this.router.navigate(['sorting', {data: method}])
						}
					},
					{
						label: "Name \"Z-A\"",
						icon: "pi pi-sort-alpha-up",
						command: () => {
							const method = 'title.desc';
							this.router.navigate(['sorting', {data: method}])
						}
					},
					{
						label: "Date",
						icon: "pi pi-calendar",
						command: () => {
							const method = 'primary_release_date.desc';
							this.router.navigate(['sorting', {data: method}])
						}
					},
				]
			}
		]
	}
}
