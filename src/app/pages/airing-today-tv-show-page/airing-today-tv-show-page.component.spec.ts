import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiringTodayTvShowPageComponent } from './airing-today-tv-show-page.component';

describe('AiringTodayTvShowPageComponent', () => {
  let component: AiringTodayTvShowPageComponent;
  let fixture: ComponentFixture<AiringTodayTvShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiringTodayTvShowPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AiringTodayTvShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
