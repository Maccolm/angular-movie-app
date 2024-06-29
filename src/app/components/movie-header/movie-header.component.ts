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


	constructor(){ }
	
	
}
