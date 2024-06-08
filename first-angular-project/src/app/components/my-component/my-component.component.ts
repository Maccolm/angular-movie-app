import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss'
})
export class MyComponentComponent implements OnInit {
	@Input() data: any;
	@Output() addFavorite = new EventEmitter<any>()
	@Output() addWatchList = new EventEmitter<any>()
	public hello = 'Hello com com'
	public movie: any;
	ngOnInit(): void {
		this.movie = this.data
	}
	addToFavorites(){
		this.addFavorite.emit(this.movie.title)
	}
	addToWatchList(){
		this.addWatchList.emit(this.movie.title)
	}
}
