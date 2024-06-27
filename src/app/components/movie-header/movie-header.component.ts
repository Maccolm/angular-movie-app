import { Component, Input } from '@angular/core';
import{ Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-header.component.html',
  styleUrl: './movie-header.component.scss'
})
export class MovieHeaderComponent  {
	@Input() favoriteMoviesIds: string[] = []
	@Input() watchLaterIds: string[] = []

	constructor(private router: Router){ }
	
	navigateWithData(data: string[], favorite?: string){
		const dataString = JSON.stringify(data);
		const path = favorite ? 'favorites' : 'watch-list';
	
		this.router.navigate([{ outlets: { header: [path] }}], { queryParams: { data: dataString } });
	}
}
