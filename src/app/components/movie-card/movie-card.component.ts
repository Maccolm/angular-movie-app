import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberDurationFormatPipe } from '../../pipes/numberDurationFormat/number-duration-format.pipe';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule, NumberDurationFormatPipe],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  @Input() data: any;
  @Input() isInFavorite: boolean = false;
  @Input() isInWatchList: boolean = false;
  @Output() addFavorite = new EventEmitter<any>();
  @Output() addWatchList = new EventEmitter<any>();

  public movie: any;

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
}
