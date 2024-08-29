import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { ClearObservable } from '../../directives/clearObservable';
import { takeUntil } from 'rxjs';
import { Movie } from '../../models/movie.models';
import { Store } from '@ngrx/store';
import { selectTrendingMovies } from '../../store/selectors';

@Component({
  selector: 'app-start-page',
  standalone: true,
  imports: [RouterModule, CarouselModule],
  templateUrl: './start-page.component.html',
  styleUrl: './start-page.component.scss',
//   changeDetection: ChangeDetectionStrategy.OnPush
})
export class StartPageComponent extends ClearObservable implements OnInit{
	IMAGINE_PATH = '../../../assets/img/background/poster_bg.jpeg';
	BACKDROP_PATH: string = 'https://image.tmdb.org/t/p/w500/';
	imgTitle = 'Background';
	movies: Movie[] | undefined;
	responsiveOptions: any[] | undefined;
	constructor(private store: Store, private router: Router){
		super();
	}
	ngOnInit(): void {
		this.store.select(selectTrendingMovies).pipe(takeUntil(this.destroy$)).subscribe(movies => {
			this.movies = movies?.results;
		})
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
		const id = movieId;
		this.router.navigate(['/movie', id]);
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
