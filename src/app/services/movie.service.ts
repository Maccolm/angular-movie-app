import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { ApiMovieModel, DetailsMovie, Movie } from '../models/movie.models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '?api_key=81c0dd880c00cce619f4569514eade3b';
  private apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWMwZGQ4ODBjMDBjY2U2MTlmNDU2OTUxNGVhZGUzYiIsIm5iZiI6MTcyMDY4NjE3Ni40MTk4ODQsInN1YiI6IjY2OGRkYTJiMTI2YjJmN2Q0NDU5YzBjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NNGPUfrm-0XCZxI5QIoiPs4KN7p-0hKIaDqxO0MYmGs';
	private accountId: number | null = this.getAccountId();
	private sessionId: string | null = this.getSessionId();
	
	private  apiUrl = 'https://api.themoviedb.org/3/movie';
	private baseUrl = 'https://api.themoviedb.org/3';
	private readonly favoriteMoviesSubject$ = new BehaviorSubject<Movie[]>([]);
	private readonly watchListSubject$ = new BehaviorSubject<Movie[]>([]);
	favoritesMovies$ = this.favoriteMoviesSubject$.asObservable();
	
	public favoriteMovies: Movie[] = [];
	public readonly watchList: Movie[] = [];
	
	constructor(private httpClient: HttpClient) {}
	
	setAccountId(id: number) {
		window.localStorage['account_id'] = id;
	}
	setSessionId(id: string) {
		window.localStorage['session_id'] = id;
	}
	getSessionId() {
		return window.localStorage['session_id'];
	}
	getAccountId() {
		return window.localStorage['account_id']
	}

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
	const url = `${this.baseUrl}/account/${this.accountId}/favorite/movies${this.apiKey}&session_id=${this.sessionId}`;
    return this.httpClient.get<{ results: Movie[] }>(url).pipe(
      map(response => response.results),
      catchError(this.handleError)
    );
   //  return this.favoriteMoviesSubject$.asObservable();
  }

  getWatchList(): Observable<Movie[]> {
    return this.watchListSubject$.asObservable();
  }

  setToFavoriteMovies(movie: Movie) {
	const url = `https://api.themoviedb.org/3/account/${this.accountId}/favorite${this.apiKey}&session_id=${this.sessionId}`;
	const body = {
	  media_type: 'movie',
	  media_id: movie.id,
	  favorite: true
	};
	this.setToFavoriteMoviesSubject(movie)
	return this.httpClient.post<any>(url, body).pipe(
	  map(response => response),
	  catchError(this.handleError)
	);
  }
  //тут в мене все зберігається локально та ця функція спрацьовує після перезавантаження сторінки, щоб дані підтягнулися та зявилися на екрані
  setToFavoriteMoviesSubject(movie: Movie) {
	const isInFavorite = this.isInFavoriteList(movie);
    if (!isInFavorite) {
      this.favoriteMovies.push(movie);
		this.favoriteMoviesSubject$.next(this.favoriteMovies)
    }
  }
  removeFromFavoriteMovies(movie: Movie): Observable<Movie> {
	const url = `https://api.themoviedb.org/3/account/${this.accountId}/favorite${this.apiKey}&session_id=${this.sessionId}`;
	const body = {
	  media_type: 'movie',
	  media_id: movie.id,
	  favorite: false
	};
	this.deleteFromFavorites(movie)
	return this.httpClient.post<Movie>(url, body).pipe(
      map(response => {
        this.getFavoriteMovies().subscribe(); 
        return response;
      }),
		catchError(this.handleError)
    );
  }
  setToWatchList(movie: Movie) {
    const isInWatchList = this.isInWatchList(movie);
    if (!isInWatchList) {
      this.watchList.push(movie);
		this.watchListSubject$.next(this.watchList)
    }
  }
  

  isInFavoriteList(movie: Movie): boolean {
	const favoriteMovies = this.favoriteMoviesSubject$.getValue()
    return favoriteMovies.find(m => m.id === movie.id) !== undefined;
  }

  isInWatchList(movie: Movie): boolean {
    return this.watchList.find(m => m.id === movie.id) !== undefined;
  }

  deleteFromWatchList(movie: Movie) {
    const index = this.watchList.findIndex((m) => m === movie);
    this.watchList.splice(index, 1);

	 this.watchListSubject$.next(this.watchList)
  }

  deleteFromFavorites(movie: Movie) {
    const index = this.favoriteMovies.findIndex((m) => movie.id === m.id);
    this.favoriteMovies.splice(index, 1);

	 this.favoriteMoviesSubject$.next(this.favoriteMovies);
  }
  private handleError(error: any) {
	console.error('An error occurred:', error);
	return throwError(error);
 }
}
