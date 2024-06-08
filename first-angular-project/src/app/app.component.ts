import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyComponentComponent } from './components/my-component/my-component.component';

@Component({
  selector: 'app-root ',
  standalone: true,
  imports: [RouterOutlet, MyComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy{

	movie = {
		backdrop_path: "/assets/img/civil-war.webp",
		back_img: "/assets/img/background/back-civil-war.jpeg",
		id: 653346,
		overview: "In the near future, a group of war journalists attempt to survive while reporting the truth as the United States stands on the brink of civil war.",
		release_date: "2024-04-10",
		title: "Civil War",
		minutes: '117 min',
		type: "Action, Crime, Fantasy",
		rating: 8.5
	}

  constructor(){
		console.log("constructor");
	}

	ngOnChanges(changes: SimpleChanges): void {
		console.log("ngOnChanges");
	}
	ngOnInit(): void {
		console.log("ngOnInit");
	}
	ngDoCheck(): void {
		console.log('ngDoCheck');
	}
	ngAfterContentInit(): void {
		console.log("ngAfterContentInit");	
	}
	ngAfterContentChecked(): void {
		console.log("ngAfterContentChecked");	
	}
	ngAfterViewInit(): void {
		console.log("ngAfterViewInit");
	}
	ngAfterViewChecked(): void {
		console.log("ngAfterViewChecked");
	}
	ngOnDestroy(): void {
		
	}
}
