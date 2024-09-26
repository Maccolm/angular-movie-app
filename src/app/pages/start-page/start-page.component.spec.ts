import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StartPageComponent } from './start-page.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { initialState } from '../../store/state';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('StartPageComponent', () => {
  let component: StartPageComponent;
  let fixture: ComponentFixture<StartPageComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
		providers: [
			provideMockStore({ initialState }),
			{
				provide: ActivatedRoute,
				useValue: {
					snapshot: {
						paramMap: {
							get: () => '1',
						},
					},
					queryParams: of({}),
				},
			},
		],
      imports: [StartPageComponent]
    })
    .compileComponents();
    
	 store = TestBed.inject(MockStore)
    fixture = TestBed.createComponent(StartPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should clean up subscriptions on destroy', () => {
	const spy = jest.spyOn(component.destroy$, 'next');
	component.ngOnDestroy();
	expect(spy).toHaveBeenCalledWith(true);
  });
});
