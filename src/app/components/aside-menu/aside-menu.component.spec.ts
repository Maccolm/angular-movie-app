import { TestBed } from '@angular/core/testing';
import { MovieAsideMenuComponent } from './aside-menu.component';
import { RouterModule } from '@angular/router';

describe('MovieAsideMenuComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieAsideMenuComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(MovieAsideMenuComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
