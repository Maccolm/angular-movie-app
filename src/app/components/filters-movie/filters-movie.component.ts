import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { ClearObservable } from '../../directives/clearObservable';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-filters-movie',
  standalone: true,
  imports: [ ButtonModule, ReactiveFormsModule, DropdownModule, CheckboxModule, DialogModule],
  templateUrl: './filters-movie.component.html',
  styleUrl: './filters-movie.component.scss',
})
export class FiltersMovieComponent extends ClearObservable implements OnInit {
	visible: boolean = false;
	years: { label: string, value: number | null }[] = [];
	genres: { id: number, name: string }[] = [];
	form: FormGroup = new FormGroup({});

	constructor(private router: Router, private filterService: FilterService) {
		super();
	}
	ngOnInit(): void {
		this.generateYears();
		this.genres = [
			{ id: 28, name: 'Action' },
			{ id: 12, name: 'Adventure' },
			{ id: 16, name: 'Animation' },
			{ id: 35, name: 'Comedy' },
			{ id: 80, name: 'Crime' },
			{ id: 99, name: 'Documentary' },
			{ id: 18, name: 'Drama' },
			{ id: 10749, name: 'Romance' },
			{ id: 10751, name: 'Family' },
			{ id: 14, name: 'Fantasy' },
			{ id: 36, name: 'History' },
			{ id: 27, name: 'Horror' },
			{ id: 9648, name: 'Mystery' },
			{ id: 53, name: 'Thriller' },
			{ id: 878, name: 'Science Fiction' },
			{ id: 37, name: 'Western' },
		 ];
		this.form = new FormGroup({
			year: new FormControl(null),
			genres: new FormArray([])
		});
		this.addGenresControls();
	}

	generateYears(){
		const startYear = 1920;
		const currentYear = new Date().getFullYear();
		this.years.push({ label: 'All years', value: null })

		for(let year = currentYear; year >= startYear; year--) {
			this.years.push({ label: year.toString(), value: year})
		}		
	}
	addGenresControls(){
		this.genres.forEach(() => {
			(this.form.controls['genres'] as FormArray).push(new FormControl(false));
		});
	}
	getGenresControls() {
		return (this.form.controls['genres'] as FormArray).controls as FormControl[]
	}
	onSubmit(){
		const selectedGenres = this.form.value.genres
		.map((checked: boolean, i: number) => checked ? this.genres[i].id : null)
		.filter((v: number | null) => v !== null);
		const selectedYear = this.form.value.year;
		console.log(selectedYear);
		
		if(selectedGenres.length < 1){
			localStorage.removeItem('selectedGenres');
		} else {
			localStorage.setItem('selectedGenres', selectedGenres);
		}
		if(!selectedYear || selectedYear.value === null) {
			localStorage.removeItem('selectedYear')
			this.filterService.setFilters({genres: selectedGenres, page: 1});
		} else {
			localStorage.setItem('selectedYear', selectedYear.value.toString());
			this.filterService.setFilters({genres: selectedGenres, year: selectedYear.value, page: 1});
		}
		this.router.navigate(['filteredMovies']);
		this.closeDialog();
	}
	showDialog(){
		this.visible = true;
	}
	closeDialog(){
		this.visible = false;
	}
}
