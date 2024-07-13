import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiMovieModel, DetailsMovie, Movie } from '../models/movie.models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '?api_key=81c0dd880c00cce619f4569514eade3b';
  private apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWMwZGQ4ODBjMDBjY2U2MTlmNDU2OTUxNGVhZGUzYiIsIm5iZiI6MTcyMDY4NjE3Ni40MTk4ODQsInN1YiI6IjY2OGRkYTJiMTI2YjJmN2Q0NDU5YzBjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NNGPUfrm-0XCZxI5QIoiPs4KN7p-0hKIaDqxO0MYmGs';

 private  apiUrl = 'https://api.themoviedb.org/3/movie';
 favoriteMoviesSubject = new BehaviorSubject<Movie[]>([]);
 watchListSubject = new BehaviorSubject<Movie[]>([]);
 
 favoriteMovies: Movie[] = [];
 watchList: Movie[] = [];

  constructor(private httpClient: HttpClient) {}
	

  getPopularMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/popular${this.apiKey}`)
  }
  getUpcomingMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/upcoming${this.apiKey}`);
  }
  getNowPlayingMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/now_playing${this.apiKey}`)
  }
  getTopRateMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/top_rated${this.apiKey}`);
  }
	getMovieById(id: number): Observable<DetailsMovie> {
		return this.httpClient.get<DetailsMovie>(`${this.apiUrl}/${id}${this.apiKey}`)
  }
  
  getFavoriteMovies(): Observable<Movie[]> {
    return this.favoriteMoviesSubject.asObservable();
  }
  getWatchList(): Observable<Movie[]> {
    return this.watchListSubject.asObservable();
  }
  setToFavoriteMovies(movie: Movie) {
    const isInFavorite = this.isInFavoriteList(movie);
    if (!isInFavorite) {
      this.favoriteMovies.push(movie);
    } else {
      console.log('it is already in favorite');
    }

	 this.favoriteMoviesSubject.next(this.favoriteMovies)
  }
  setToWatchList(movie: Movie) {
    const isInWatchList = this.isInWatchList(movie);
    if (!isInWatchList) {
      this.watchList.push(movie);
    } else {
      console.log('already in watchList');
    }

	 this.watchListSubject.next(this.watchList)
  }
  isInFavoriteList(movie: Movie): boolean {
    return this.favoriteMovies.find(m => m.id === movie.id) !== undefined;
  }
  isInWatchList(movie: Movie): boolean {
    return this.watchList.find(m => m.id === movie.id) !== undefined;
  }

  deleteFromWatchList(movie: Movie) {
    const index = this.watchList.findIndex((m) => m === movie);
    this.watchList.splice(index, 1);

	 this.watchListSubject.next(this.watchList)
  }
  deleteFromFavorites(movie: Movie) {
    const index = this.favoriteMovies.findIndex((m) => movie === m);
    this.favoriteMovies.splice(index, 1);

	 this.favoriteMoviesSubject.next(this.favoriteMovies);
  }
}
