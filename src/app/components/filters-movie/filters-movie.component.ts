import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MovieService } from '../../services/movie.service';
import { ClearObservable } from '../../directives/clearObservable';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-filters-movie',
  standalone: true,
  imports: [OverlayPanelModule, ButtonModule, ReactiveFormsModule, DropdownModule, CheckboxModule],
  templateUrl: './filters-movie.component.html',
  styleUrl: './filters-movie.component.scss',
})
export class FiltersMovieComponent extends ClearObservable implements OnInit {
	years: { label: string, value: number | null }[] = [];
	genres: { id: number, name: string }[] = [];
	form: FormGroup = new FormGroup({});

	constructor(private movieService: MovieService) {
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
			{ id: 10751, name: 'Family' },
			{ id: 14, name: 'Fantasy' },
			{ id: 36, name: 'History' },
			{ id: 828, name: 'Science Fiction' }
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

		this.movieService.getFilteredMovies(selectedGenres, selectedYear).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			console.log(movies.results);
			
		})
	}
}
