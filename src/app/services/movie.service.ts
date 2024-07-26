import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  throwError,
} from 'rxjs';
import { ApiMovieModel, DetailsMovie, Movie } from '../models/movie.models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = environment.apiKey;
  private apiToken = environment.apiToken;
  private accountId: number | null = this.getAccountId();
  private sessionId: string = this.getSessionId();
  private apiUrl = environment.apiUrl;
  private baseUrl = environment.baseUrl;
  
  private readonly favoriteMoviesSubject$ = new BehaviorSubject<Movie[]>([]);
  private readonly watchListSubject$ = new BehaviorSubject<Movie[]>([]);

  favoriteMovies$ = this.favoriteMoviesSubject$.asObservable();
  watchList$ = this.watchListSubject$.asObservable();

  public readonly favoriteMovies: Movie[] = [];
  public readonly watchList: Movie[] = [];

  constructor(private httpClient: HttpClient) {}

 
  getSessionId() {
    return window.localStorage['session_id'];
  }
  getAccountId() {
    return window.localStorage['account_id'];
  }

  getPopularMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/popular${this.apiKey}`);
  }
  getUpcomingMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>( `${this.apiUrl}/upcoming${this.apiKey}`);
  }
  getNowPlayingMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/now_playing${this.apiKey}`);
  }
  getTopRateMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>( `${this.apiUrl}/top_rated${this.apiKey}`);
  }
  getMovieById(id: number): Observable<DetailsMovie> {
    return this.httpClient.get<DetailsMovie>(`${this.apiUrl}/${id}${this.apiKey}`);
  }

  //favorite list functions===========================================
  getFavoriteMovies(): Observable<Movie[]> {
		const url = `${this.baseUrl}/account/${this.accountId}/favorite/movies${this.apiKey}&session_id=${this.sessionId}`;
		return this.httpClient.get<{ results: Movie[] }>(url).pipe(
			map((response) => response.results),
		);
  }
  setToFavoriteMovies(movie: Movie) {
    const url = `${this.baseUrl}/account/${this.accountId}/favorite${this.apiKey}&session_id=${this.sessionId}`;
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: true,
    };
   //  this.setToFavoriteMoviesSubject(movie);
    return this.httpClient.post<Movie>(url, body);
  }
  setToFavoriteMoviesSubject(movie: Movie) {
    const isInFavorite = this.isInFavoriteList(movie);
    if (!isInFavorite) {
      this.favoriteMovies.push(movie);
      this.favoriteMoviesSubject$.next(this.favoriteMovies);
    }
  }
  removeFromFavoriteMovies(movie: Movie): Observable<Movie> {
    const url = `${this.baseUrl}/account/${this.accountId}/favorite${this.apiKey}&session_id=${this.sessionId}`;
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      favorite: false,
    };
	 const index = this.favoriteMovies.findIndex(fv => fv.id === movie.id)
	 this.favoriteMovies.splice(index, 1)
	 this.favoriteMoviesSubject$.next(this.favoriteMovies)
	 
    return this.httpClient.post<Movie>(url, body);
  }
  isInFavoriteList(movie: Movie): boolean {
    const favoriteMovies = this.favoriteMoviesSubject$.getValue();
    return favoriteMovies.find((m) => m.id === movie.id) !== undefined;
  }
  //watchList functions==================================================
  getWatchList(): Observable<Movie[]> {
    const url = `${this.baseUrl}/account/${this.accountId}/watchlist/movies${this.apiKey}&session_id=${this.sessionId}`;
    return this.httpClient.get<{ results: Movie[] }>(url).pipe(
      map((response) => response.results),
      catchError(this.handleError)
    );
  }
  setToWatchList(movie: Movie) {
    const url = `${this.baseUrl}/account/${this.accountId}/watchlist${this.apiKey}&session_id=${this.sessionId}`;
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: true,
    };
   //  this.setToWatchListSubject$(movie);
    return this.httpClient.post<Movie>(url, body);
  }
  setToWatchListSubject$(movie: Movie) {
    const isInWatchList = this.isInWatchList(movie);
    if (!isInWatchList) {
      this.watchList.push(movie);
      this.watchListSubject$.next(this.watchList);
    }
  }
  deleteFromWatchList(movie: Movie) {
    const url = `${this.baseUrl}/account/${this.accountId}/watchlist${this.apiKey}&session_id=${this.sessionId}`;
    const body = {
      media_type: 'movie',
      media_id: movie.id,
      watchlist: false,
    };
	 const index = this.watchList.findIndex(fv => fv.id === movie.id)
	 this.watchList.splice(index, 1)
	 this.watchListSubject$.next(this.watchList)
	 
    return this.httpClient.post<Movie>(url, body);
  }

  isInWatchList(movie: Movie): boolean {
    const watchList = this.watchListSubject$.getValue();
    return watchList.find((m) => m.id === movie.id) !== undefined;
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(error);
  }
}
