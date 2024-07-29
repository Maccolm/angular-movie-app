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
	
	private accountIdSubject$ = new BehaviorSubject<number | null>(this.getAccountId());
	private sessionIdSubject$ = new BehaviorSubject <string | null>(this.getSessionId());
	private readonly favoriteMoviesSubject$ = new BehaviorSubject<Movie[]>([]);
	private readonly watchListSubject$ = new BehaviorSubject<Movie[]>([]);
	
	favoriteMovies$ = this.favoriteMoviesSubject$.asObservable();
	watchList$ = this.watchListSubject$.asObservable();
	private readonly accountId$ = this.accountIdSubject$.asObservable()
	private readonly sessionId$ = this.sessionIdSubject$.asObservable()
	
	public readonly favoriteMovies: Movie[] = [];
	public readonly watchList: Movie[] = [];

	constructor(private httpClient: HttpClient, private auth: AuthService) { }

	setAccountId(accountId: number): void {
		window.localStorage.setItem('account_id', accountId.toString());
		this.accountIdSubject$.next(accountId);
	}
	getAccountId() {
		const account_id = window.localStorage.getItem('account_id'); 
		return account_id ? parseInt( account_id, 10) : null;
	}
	setSessionId(sessionId: string): void {
		window.localStorage.setItem('session_id', sessionId);
		this.sessionIdSubject$.next(sessionId);
	}
	getSessionId() {
		return window.localStorage.getItem('session_id');
	}

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
		return combineLatest([this.accountId$, this.sessionId$]).pipe(
			filter(([accountId, sessionId]) => accountId !== null && sessionId !== null),
			map(([accountId, sessionId]) =>{
				const url = `${this.baseUrl}/account/${accountId}/favorite/movies${this.apiKey}&session_id=${sessionId}`;
				return this.httpClient.get<{ results: Movie[] }>(url).pipe(
					map((response) => response.results),
					catchError(this.handleError)
				);
			}),
			switchMap(request => request)
		);
	}
	setToFavoriteMovies(movie: Movie) {
		return combineLatest([this.accountId$, this.sessionId$]).pipe(
			filter(([accountId, sessionId]) => accountId !== null && sessionId !== null),
			switchMap(([accountId, sessionId]) =>{
				const url = `${this.baseUrl}/account/${accountId}/favorite${this.apiKey}&session_id=${sessionId}`;
				const body = {
					media_type: 'movie',
					media_id: movie.id,
					favorite: true,
				};
				return this.httpClient.post<Movie>(url, body);
			}),
			catchError(this.handleError)
		);
	}
	setToFavoriteMoviesSubject(movie: Movie) {
		const isInFavorite = this.isInFavoriteList(movie);
		if (!isInFavorite) {
			this.favoriteMovies.push(movie);
			this.favoriteMoviesSubject$.next(this.favoriteMovies);
		}
	}
	removeFromFavoriteMovies(movie: Movie): Observable<Movie> {
		return combineLatest([this.accountId$, this.sessionId$]).pipe(
			filter(([accountId, sessionId]) => accountId !== null && sessionId !== null),
			switchMap(([accountId, sessionId]) =>{
				const url = `${this.baseUrl}/account/${accountId}/favorite${this.apiKey}&session_id=${sessionId}`;
				const body = {
					media_type: 'movie',
					media_id: movie.id,
					favorite: false,
				};
				return this.httpClient.post<Movie>(url, body);
			}),
			catchError(this.handleError)
		);
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
		return combineLatest([this.accountId$, this.sessionId$]).pipe(
			filter(([accountId, sessionId]) => accountId !== null && sessionId !== null),
			switchMap(([accountId, sessionId]) => {
				const url = `${this.baseUrl}/account/${accountId}/watchlist/movies${this.apiKey}&session_id=${sessionId}`;
				return this.httpClient.get<{ results: Movie[] }>(url).pipe(
					map((response) => response.results),
					catchError(this.handleError)
				);
			})
		)
	}
	setToWatchList(movie: Movie) {
		return combineLatest([this.accountId$, this.sessionId$]).pipe(
			filter(([accountId, sessionId]) => accountId !== null && sessionId !== null),
			switchMap(([accountId, sessionId]) => {
				const url = `${this.baseUrl}/account/${accountId}/watchlist${this.apiKey}&session_id=${sessionId}`;
				const body = {
					media_type: 'movie',
					media_id: movie.id,
					watchlist: true,
				};
				return this.httpClient.post<Movie>(url, body);
			}),
			catchError(this.handleError)
		);
	}
	setToWatchListSubject$(movie: Movie) {
		const isInWatchList = this.isInWatchList(movie);
		if (!isInWatchList) {
			this.watchList.push(movie);
			this.watchListSubject$.next(this.watchList);
		}
	}
	deleteFromWatchList(movie: Movie) {
		return combineLatest([this.accountId$, this.sessionId$]).pipe(
			filter(([accountId, sessionId]) => accountId !== null && sessionId !== null),
			switchMap(([accountId, sessionId]) => {
				const url = `${this.baseUrl}/account/${accountId}/watchlist${this.apiKey}&session_id=${sessionId}`;
				const body = {
					media_type: 'movie',
					media_id: movie.id,
					watchlist: false,
				};
				return this.httpClient.post<Movie>(url, body);
			}),
			catchError(this.handleError)
		)
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
