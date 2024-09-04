import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { ClearObservable } from '../../directives/clearObservable';
import { Movie } from '../../models/movie.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel-movie-list',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carousel-movie-list.component.html',
  styleUrl: './carousel-movie-list.component.scss'
})
export class CarouselMovieListComponent extends ClearObservable implements OnInit{
	@Input() movies!: Movie[];
	@Input() title!: string;
	@Input() autoplay?: number = 0; 
	public BACKDROP_PATH: string = 'https://image.tmdb.org/t/p/w500/';
	public responsiveOptions: any[] | undefined;
	constructor(private router: Router) {
		super();
	}
	ngOnInit(): void {
		this.responsiveOptions = [
			{
				breakpoint: "1210px",
				numVisible: 5,
				numScroll: 1
			},
			{
				breakpoint: "798px",
				numVisible: 3,
				numScroll: 1
			},
			{
				breakpoint: "554px",
				numVisible: 2,
				numScroll: 1
	
			},
			{
				breakpoint: "424px",
				numVisible: 1,
				numScroll: 1
			}
		]
	}
	navigateWithData(movieId: number) {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		const id = movieId;
		this.router.navigate(['/movie', id]);
	}
}
