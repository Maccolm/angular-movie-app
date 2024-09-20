import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieSidebarComponent } from './sidebar.component';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';


describe('MovieSidebarComponent', () => {
  let component: MovieSidebarComponent;
  let fixture: ComponentFixture<MovieSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSidebarComponent, SidebarModule, CommonModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onDocumentClick', () => {
	it('should close sidebar if clicked outside the sidebar and other specific elements', () => {
		component.sidebarVisible = true;
		const event = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		const target = document.createElement('div');
		document.body.appendChild(target);
		Object.defineProperty(event, 'target', { value: target });
		component.onDocumentClick(event as any);
		expect(component.sidebarVisible).toBe(false);
		document.body.removeChild(target);
	});

	it('should not close sidebar if clicked inside the sidebar', () => {
		component.sidebarVisible = true;

		const sidebarElement = document.createElement('div');
		sidebarElement.classList.add('custom-sidebar');
		document.body.appendChild(sidebarElement);

		const event = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		Object.defineProperty(event, 'target', { value: sidebarElement });
		component.onDocumentClick(event as any);
		expect(component.sidebarVisible).toBe(true);
		document.body.removeChild(sidebarElement);
	});

	it('should not close sidebar if clicked on the bar button', () => {
		component.sidebarVisible = true;
		const buttonElement = document.createElement('button');
		buttonElement.classList.add('bar-button');
		document.body.append(buttonElement);

		const event = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window
		});
		Object.defineProperty(event, 'target', { value: buttonElement });
		component.onDocumentClick(event as any);
		expect(component.sidebarVisible).toBe(true);
		document.body.removeChild(buttonElement);
	});
	it('should close sidebar with delay if clicked on the submit filter button', () => {
		jest.useFakeTimers();
		component.sidebarVisible = true;
		const submitButton = document.createElement('button');
		submitButton.classList.add('filter__button-submit');
		document.body.appendChild(submitButton);

		const event = {
			target: submitButton,
			stopPropagation: jest.fn(),
			preventDefault: jest.fn()
		} as unknown as MouseEvent;
		component.onDocumentClick(event);
		jest.advanceTimersByTime(300);
		expect(component.sidebarVisible).toBe(false);
		document.body.removeChild(submitButton);
	});
	});
});
