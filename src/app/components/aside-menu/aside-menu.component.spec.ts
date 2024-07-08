import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAsideMenuComponent } from './aside-menu.component';

describe('MovieAsideMenuComponent', () => {
  let component: MovieAsideMenuComponent;
  let fixture: ComponentFixture<MovieAsideMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieAsideMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieAsideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
