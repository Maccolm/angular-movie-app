import { Component, Input, OnInit, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDurationFormatPipe } from '../../pipes/numberDurationFormat/number-duration-format.pipe';
import { CardModule } from 'primeng/card';
import { DialogModule }from 'primeng/dialog'
import { LimitedSymbolsPipe } from '../../pipes/limitedSymbols/limited-symbols.pipe';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, NumberDurationFormatPipe, CardModule, DialogModule, LimitedSymbolsPipe, ButtonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class MovieCardComponent implements OnInit {
  @Input() data: any;
  @Input() isInFavorite: boolean = false;
  @Input() isInWatchList: boolean = false;
  @Output() addToFavorites = new EventEmitter<string>();
  @Output() addToWatchList = new EventEmitter<string>();
  @Output() deleteFromFavorite = new EventEmitter<string>();
  @Output() deleteFromWatchList = new EventEmitter<string>();

  public movie: any;
  public displayDialog: boolean = false;
  public IMAGINE_PATH: string = 'https://image.tmdb.org/t/p/w500/';

  ngOnInit(): void {
    this.movie = this.data;
  }
	toggleFavorite(){
		if(this.isInFavorite) {
			this.deleteFromFavorite.emit(this.movie.id)
		} else {
			this.addToFavorites.emit(this.movie.id)
		}
	}
	toggleWatchList() {
		if (this.isInWatchList) {
			this.deleteFromWatchList.emit(this.movie.id)
		} else {
			this.addToWatchList.emit(this.movie.id)
		}
	}
  
  showDialog() {
	  this.displayDialog = true
  }
}
