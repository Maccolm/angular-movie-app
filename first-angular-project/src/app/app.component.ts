import { Component} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieListComponent } from './components/movie-list/movie-list.component';

@Component({
  selector: 'app-root ',
  standalone: true,
  imports: [RouterOutlet, MovieListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {


	handleAddFavorite() {
		console.log('handleAddFavorite');
	}
	handleAddWatchList() {
		console.log('handleAddWatchList');
		
	}
}
