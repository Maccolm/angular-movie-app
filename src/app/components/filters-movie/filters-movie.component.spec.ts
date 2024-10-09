import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FiltersMovieComponent } from './filters-movie.component';
import { FilterService } from '../../services/filter.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

describe('FiltersMovieComponent', () => {
  let component: FiltersMovieComponent;
  let fixture: ComponentFixture<FiltersMovieComponent>;
  let filterService: jest.Mocked<FilterService>
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
	filterService = {
		setFilters: jest.fn(),
	} as unknown as jest.Mocked<FilterService>;
	router = {
		navigate: jest.fn(),
	} as unknown as jest.Mocked<Router>;
    await TestBed.configureTestingModule({
      imports: [FiltersMovieComponent, ReactiveFormsModule],
		providers: [
			{ provide: FilterService, useValue: filterService },
			{ provide: Router, useValue: router },
		],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltersMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
	 Storage.prototype.setItem = jest.fn();
	 Storage.prototype.removeItem = jest.fn();
  });
  afterEach(() => {
	jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should generate years list', () => {
	component.generateYears();
	expect(component.years.length).toBeGreaterThan(0);
	expect(component.years[0]).toEqual({ label: 'All years', value: null });
  });
  it('should add genre controls to the form', () => {
	component.addGenresControls();
	const genresControls = component.getGenresControls();
	expect(genresControls.length).toEqual(component.genres.length * 2);
  });
  it('should submit form and set filters in FilterService', () => {
	const selectedGenres = [true, false, true];
	const selectedYear = { label: '2020', value: 2020 };
	component.form.controls['year'].setValue(selectedYear);
	selectedGenres.forEach((val, i) => {
		(component.form.controls['genres'] as any).at(i).setValue(val);
	});
	component.onSubmit();
	expect(localStorage.setItem).toHaveBeenCalledWith('selectedGenres', [28,16]);
	expect(localStorage.setItem).toHaveBeenCalledWith('selectedYear', '2020');
	expect(filterService.setFilters).toHaveBeenCalledWith({
		genres: [28,16],
		year: 2020,
		page: 1,
	});
	expect(router.navigate).toHaveBeenCalledWith(['filteredMovies']);
  });
  it('should open and close the dialog', () => {
	component.showDialog();
	expect(component.visible).toBe(true);
	component.closeDialog();
	expect(component.visible).toBe(false);
  });
}); 
