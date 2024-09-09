import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';

@Component({
  selector: 'app-filters-movie',
  standalone: true,
  imports: [OverlayPanelModule, ButtonModule],
  templateUrl: './filters-movie.component.html',
  styleUrl: './filters-movie.component.scss'
})
export class FiltersMovieComponent implements OnInit {
	year: number[] = [];
	
	ngOnInit(): void {
		this.generateYears();
	}

	generateYears(){
		const startYear = 1920;
		const currentYear = new Date().getFullYear();
		for(let year = startYear; year <= currentYear; year++) {
			this.year.push(year)
		}		
	}
}
