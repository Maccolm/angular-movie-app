import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClearObservable } from '../../directives/clearObservable';
import { takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { Store } from '@ngrx/store';
import { selectTrendingMovies } from '../../store/selectors';
import { CarouselMovieListComponent } from '../../components/carousel-movie-list/carousel-movie-list.component';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterModule, CarouselMovieListComponent],
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
})
export class StartPageComponent extends ClearObservable implements OnInit{
	IMAGINE_PATH = '../../../assets/img/background/poster_bg.jpeg';
	BACKDROP_PATH: string = 'https://image.tmdb.org/t/p/w500/';
	imgTitle = 'Background';
	movies: Movie[] | undefined;
	responsiveOptions: any[] | undefined;
	carousel__title: string = 'Top movies for a week'
	constructor(private store: Store){
		super();
	}
	ngOnInit(): void {
		this.store.select(selectTrendingMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.movies = movies?.results;
		})
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
		  name: 'Top rated',
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
