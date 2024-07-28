import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Movie } from '../models/movie.models';
import { MovieService } from '../services/movie.service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class watchListMoviesResolver implements Resolve<Movie[]> {
 private watchList: Movie[] = [];
  constructor(private movieService: MovieService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Movie[]> {
    return this.movieService.getWatchList().pipe(
      tap((movies) => {
        this.watchList = movies;
        this.movieService.updateWatchListSubject(this.watchList);
      })
    );
  }
}
