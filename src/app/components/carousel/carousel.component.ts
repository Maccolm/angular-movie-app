import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { MovieService } from '../../services/movie.service';
import { ClearObservable } from '../../directives/clearObservable';
import { takeUntil } from 'rxjs';
import { GalleriaModule } from 'primeng/galleria';
import { YouTubePlayer } from '@angular/youtube-player';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CarouselModule, GalleriaModule, YouTubePlayer],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss',
})
export class CarouselComponent extends ClearObservable implements OnInit, OnChanges {
	@Input() id!: number;
	@Input() category!: string;
	public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';
	public images: string[] = [];
	public videos: string[] = [];
	public displayPicture: boolean = false;
	public loadedVideo: string | null = null;
	responsiveOptions: any[] | undefined;
	responsiveVideoOptions: any[] | undefined;
	constructor(private movieService: MovieService){
		super();
	}
	ngOnInit(): void {
		this.loadMedia();
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
		this.responsiveVideoOptions = [
			{
				breakpoint: '1280px',
				numVisible: 1.3,
				numScroll: 1
			},
			{
				breakpoint: '1160px',
				numVisible: 1.1,
				numScroll: 1
			},
			{
				breakpoint: '880px',
				numVisible: 1,
				numScroll: 1
			}
		]
	}
	ngOnChanges(changes: SimpleChanges): void {
		if(changes['id'] && !changes['id'].isFirstChange()){
			this.loadMedia();
		}
	}
	private loadMedia(){
		if(this.category === 'pictures'){
			this.movieService.getMovieMedia(this.id).pipe(takeUntil(this.destroy$)).subscribe(data => {
				if(data && data.backdrops){
					this.images = data.backdrops.map((backdrop:any) => this.IMAGINE_PATH + backdrop.file_path);
				}
			});
		}
		if(this.category === 'videos'){
			this.movieService.getVideosById(this.id).pipe(takeUntil(this.destroy$)).subscribe(data => {
				if(data) {
					this.videos = data.results;
				}
			})
		}
	}
}
