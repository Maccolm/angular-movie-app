import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormControl, FormArray } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-filters-movie',
  standalone: true,
  imports: [OverlayPanelModule, ButtonModule, ReactiveFormsModule, DropdownModule, CheckboxModule],
  templateUrl: './filters-movie.component.html',
  styleUrl: './filters-movie.component.scss',
})
export class FiltersMovieComponent implements OnInit {
	years: { label: string, value: number | null }[] = [];
	genres: { id: number, name: string }[] = [];
	form: FormGroup = new FormGroup({});

	
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
			{ id: 36, name: 'History' }
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
		.filter((v: number | null) => v !== null)
		console.log(this.form.value.year);
		console.log(selectedGenres);
		
	}
}
