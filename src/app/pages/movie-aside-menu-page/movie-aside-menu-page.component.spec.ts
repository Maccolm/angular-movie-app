import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAsideMenuPageComponent } from './movie-aside-menu-page.component';

describe('MovieAsideMenuPageComponent', () => {
  let component: MovieAsideMenuPageComponent;
  let fixture: ComponentFixture<MovieAsideMenuPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieAsideMenuPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieAsideMenuPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
