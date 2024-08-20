import { TestBed } from '@angular/core/testing';
import { MovieHeaderComponent } from './header-movie.component';
import { RouterModule } from '@angular/router';

describe('MovieHeaderComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieHeaderComponent, RouterModule.forRoot([])],
    })
    .compileComponents();
    
	});
	
	it('should create', () => {
	  const fixture = TestBed.createComponent(MovieHeaderComponent);
		 const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
