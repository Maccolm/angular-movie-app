import { Component, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.models';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-airing-today-tv-show-page',
  standalone: true,
  imports: [],
  templateUrl: './airing-today-tv-show-page.component.html',
  styleUrl: './airing-today-tv-show-page.component.scss'
})
export class AiringTodayTvShowPageComponent extends ClearObservable implements OnInit{
	serials: Movie[] = [];
	constructor(private movieService: MovieService){
		super()
	}
	ngOnInit(): void {
		this.movieService.getTvShowsByCategory('airing_today').pipe(takeUntil(this.destroy$)).subscribe(data => {
			this.serials = data.results;
			console.log(this.serials);
		})
		
	} 
}
