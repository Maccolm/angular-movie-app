import { Component, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { Movie, TvShow } from '../../models/movie.models';
import { takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { loadTvShows } from '../../store/actions';
import { selectTvShows } from '../../store/selectors';
import { ActivatedRoute } from '@angular/router';
import { MovieCardComponent } from '../../components/card-movie/movie-card.component';
import { DataViewModule } from 'primeng/dataview';

@Component({
  selector: 'app-airing-today-tv-show-page',
  standalone: true,
  imports: [MovieCardComponent, DataViewModule],
  templateUrl: './airing-today-tv-show-page.component.html',
  styleUrl: './airing-today-tv-show-page.component.scss'
})
export class AiringTodayTvShowPageComponent extends ClearObservable implements OnInit{
	serials: TvShow[] = [];
	constructor(private store: Store, private route: ActivatedRoute){
		super();
	}
	ngOnInit(): void {
		const category = this.route.routeConfig?.path;
		if(category)
			this.store.dispatch(loadTvShows({category}));

		this.store.select(selectTvShows).pipe(takeUntil(this.destroy$)).subscribe((tvShows) =>{
			this.serials = tvShows || [];
			console.log(tvShows);
			
		})
	}
	changeOnPage(event: any){

	}
}
