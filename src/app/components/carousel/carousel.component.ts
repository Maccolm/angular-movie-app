import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { MovieService } from '../../services/movie.service';
import { ClearObservable } from '../../directives/clearObservable';
import { takeUntil } from 'rxjs';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, GalleriaModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent extends ClearObservable implements OnInit {
	@Input() id!: number;
	public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
	public images: string[] = [];
	public displayPicture: boolean = false;
	responsiveOptions: any[] | undefined;
	constructor(private movieService: MovieService){
		super();
	}
	ngOnInit(): void {
		this.movieService.getMovieMedia(this.id).pipe(takeUntil(this.destroy$)).subscribe(data => {
			if(data && data.backdrops){
				this.images = data.backdrops.map((backdrop:any) => this.IMAGINE_PATH + backdrop.file_path);
			}
		})
		this.responsiveOptions = [
			{
				breakpoint: '1590px',
				numVisible: 2.2,
				numScroll: 2,
			},
			
			{
				breakpoint: '990px',
				numVisible: 1.8,
				numScroll: 1,
			},
			{
				breakpoint: '755px',
				numVisible: 1.5,
				numScroll: 1,
			},
			{
				breakpoint: '660px',
				numVisible: 1,
				numScroll: 1,
			},
		]
	}

}
