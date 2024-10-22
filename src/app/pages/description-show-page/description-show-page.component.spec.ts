import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionShowPageComponent } from './description-show-page.component';

describe('DescriptionShowPageComponent', () => {
  let component: DescriptionShowPageComponent;
  let fixture: ComponentFixture<DescriptionShowPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptionShowPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptionShowPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
