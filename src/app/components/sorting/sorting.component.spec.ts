import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SortingComponent } from './sorting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SortingComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
