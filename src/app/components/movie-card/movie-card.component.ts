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
  @Output() addFavorite = new EventEmitter<any>();
  @Output() addWatchList = new EventEmitter<any>();

  public movie: any;
  public displayDialog: boolean = false

  ngOnInit(): void {
    this.movie = this.data;
  }
  addToFavorites() {
    this.addFavorite.emit({
      title: this.movie.title,
      backdrop_path: this.movie.backdrop_path,
      link: this.movie.link,
      id: this.movie.id,
    });
  }
  addToWatchList() {
    this.addWatchList.emit({
      title: this.movie.title,
      backdrop_path: this.movie.backdrop_path,
      link: this.movie.link,
      id: this.movie.id,
    });
  }
  
  showDialog() {
	  this.displayDialog = true
  }
}
