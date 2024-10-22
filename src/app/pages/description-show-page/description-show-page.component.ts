import { Component, Input, OnInit } from '@angular/core';
import { ClearObservable } from '../../directives/clearObservable';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs';
import { TvShowService } from '../../services/tv-show.service';

@Component({
  selector: 'app-description-show-page',
  standalone: true,
  imports: [],
  templateUrl: './description-show-page.component.html',
  styleUrl: './description-show-page.component.scss'
})
export class DescriptionShowPageComponent extends ClearObservable implements OnInit{
	@Input() data: any;
	@Input() isInWatchList: boolean = false;
	@Input() isInFavorite: boolean = false;

	public tvShow: any;
	public tvId!: number;

	constructor(private route: ActivatedRoute, private tvShowService: TvShowService) {
		super();
	}
	ngOnInit(): void {
		this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
			this.tvId = +params.get('id')!;
			if (this.tvId) {
				this.tvShowService.getTvShowById(this.tvId).pipe(takeUntil(this.destroy$)).subscribe((show) => {
					this.tvShow = show;
					console.log(this.tvShow);
				})
			}
		})
	}
}
