import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	BehaviorSubject,
	catchError,
	combineLatest,
	map,
	Observable,
	switchMap,
	throwError,
	filter
} from 'rxjs';
import { ApiMovieModel, DetailsMovie, Movie } from '../models/movie.models';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	private apiKey = environment.apiKey;
	private apiToken = environment.apiToken;
	private apiUrl = environment.apiUrl;
	private baseUrl = environment.baseUrl;
	private accountId: any;
	private sessionId: any;

	private readonly favoriteMoviesSubject$ = new BehaviorSubject<Movie[]>([]);
	private readonly watchListSubject$ = new BehaviorSubject<Movie[]>([]);

	favoriteMovies$ = this.favoriteMoviesSubject$.asObservable();
	watchList$ = this.watchListSubject$.asObservable();

	public readonly favoriteMovies: Movie[] = [];
	public readonly watchList: Movie[] = [];

	constructor(private httpClient: HttpClient, private auth: AuthService) { }

	getPopularMovies(): Observable<ApiMovieModel> {
		return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/popular${this.apiKey}`);
	}
	getUpcomingMovies(): Observable<ApiMovieModel> {
		return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/upcoming${this.apiKey}`);
	}
	getNowPlayingMovies(): Observable<ApiMovieModel> {
		return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/now_playing${this.apiKey}`);
	}
	getTopRateMovies(): Observable<ApiMovieModel> {
		return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/top_rated${this.apiKey}`);
	}
	getMovieById(id: number): Observable<DetailsMovie> {
		return this.httpClient.get<DetailsMovie>(`${this.apiUrl}/${id}${this.apiKey}`);
	}

	//favorite list functions===========================================
	getFavoriteMovies(): Observable<Movie[]> {
		this.accountId = this.auth.getPublicAccountId();
		this.sessionId = this.auth.getSessionId();
		const url = `${this.baseUrl}/account/${this.accountId}/favorite/movies${this.apiKey}&session_id=${this.sessionId}`;
		return this.httpClient.get<{ results: Movie[] }>(url).pipe(
			map((response) => response.results),
			catchError(this.handleError)
		);
	}

	setToFavoriteMovies(movie: Movie) {
		const url = `${this.baseUrl}/account/${this.accountId}/favorite${this.apiKey}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movie.id,
			favorite: true,
		};
		catchError(this.handleError)
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
		return this.httpClient.post<Movie>(url, body);
	}
	updateFavoriteMoviesSubject(movies: Movie[]) {
		this.favoriteMovies.length = 0;
		this.favoriteMovies.push(...movies);
		this.favoriteMoviesSubject$.next(this.favoriteMovies);
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
		return this.httpClient.post<Movie>(url, body);
	}
	updateWatchListSubject(movies: Movie[]) {
		this.watchList.length = 0;
		this.watchList.push(...movies);
		this.watchListSubject$.next(this.watchList);
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
