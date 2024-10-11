import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselComponent } from './carousel.component';
import { MovieService } from '../../services/movie.service';
import { GalleriaModule } from 'primeng/galleria';
import { YouTubePlayer } from '@angular/youtube-player';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CarouselComponent', () => {
  let component: CarouselComponent;
  let fixture: ComponentFixture<CarouselComponent>;
  let movieServiceMock: jest.Mocked<MovieService>;

  beforeEach(async () => {
	movieServiceMock = {
		getMovieMedia: jest.fn(),
		getVideosById: jest.fn(),
	} as unknown as jest.Mocked<MovieService>;
    await TestBed.configureTestingModule({
      imports: [CarouselComponent, GalleriaModule, YouTubePlayer, CarouselComponent],
		providers: [{ provide: MovieService, useValue: movieServiceMock }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
	jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('ngOnInit', () => {
	it('should load media and initialize responsive options', () => {
		const mockImages = [
			{ file_path: '/image1.jpg' },
			{ file_path: '/image2.jpg' },
		];
		movieServiceMock.getMovieMedia.mockReturnValue(of({ backdrops: mockImages }));
		component.category = 'pictures';
		component.id = 1;
		component.ngOnInit();
		fixture.detectChanges();
		expect(movieServiceMock.getMovieMedia).toHaveBeenCalledWith(1);
		expect(component.images).toEqual([
			'https://image.tmdb.org/t/p/w500/image1.jpg',
       	'https://image.tmdb.org/t/p/w500/image2.jpg',
		]);
		expect(component.responsiveOptions?.length).toBeGreaterThan(0);
	});
	it('should load videos when category is videos', () => {
		const mockVideos = {
			results: [
				{ key: 'video1', site: 'YouTube' },
				{ key: 'video2', site: 'YouTube' },
			],
		};
		movieServiceMock.getVideosById.mockReturnValue(of(mockVideos));
		component.category = 'videos';
		component.id = 2;
		component.ngOnInit();
		fixture.detectChanges();
		expect(movieServiceMock.getVideosById).toHaveBeenCalledWith(2);
		expect(component.videos).toEqual(mockVideos.results);
		expect(component.responsiveVideoOptions?.length).toBeGreaterThan(0);
	});
  });
  describe('ngOnChanges', () => {
	it('should reload media when id changes', () => {
		const mockImages = [
			{ file_path: '/image1.jpg' },
			{ file_path: '/image2.jpg' },
		 ];
		 movieServiceMock.getMovieMedia.mockReturnValue(of({ backdrops: mockImages }));
		 component.category = 'pictures';
		 component.id = 1;
		 component.ngOnInit();
		 fixture.detectChanges();
		 component.id = 2;
		 component.ngOnChanges({
			id: { currentValue: 2, previousValue: 1, firstChange: false, isFirstChange: () => false },
		 });
		 fixture.detectChanges();
		 expect(movieServiceMock.getMovieMedia).toHaveBeenCalledWith(2);
	});
  });
  it('should display images when media is loaded', () => {
	const mockImages = [
      { file_path: '/image1.jpg' },
      { file_path: '/image2.jpg' },
    ];
	 movieServiceMock.getMovieMedia.mockReturnValue(of({ backdrops: mockImages }));
	 component.category = 'pictures';
	 component.id = 1;
	 component.ngOnInit();
	 fixture.detectChanges();
	 const imageElements = fixture.debugElement.queryAll(By.css('img'));
	 expect(imageElements.length).toBe(2);
	 expect(imageElements[0].nativeElement.src).toContain('image1.jpg');
	 expect(imageElements[0].nativeElement.src).toContain('https://image.tmdb.org/t/p/w500/image1.jpg');
  });
  it('should display YouTube videos when videos are loaded', () => {
	const mockVideos = {
      results: [
        { key: 'video1', site: 'YouTube' },
        { key: 'video2', site: 'YouTube' },
      ],
    };
	 movieServiceMock.getVideosById.mockReturnValue(of(mockVideos));
	 component.category = 'videos';
	 component.id = 2;
	 component.ngOnInit();
	 fixture.detectChanges();
	 const videoElements = fixture.debugElement.queryAll(By.css('youtube-player'));
	 expect(videoElements.length).toBe(2);
  });
});
