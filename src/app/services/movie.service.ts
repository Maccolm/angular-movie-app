import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	catchError,
	map,
	Observable,
	throwError,
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

	public readonly favoriteMovies: Movie[] = [];
	public readonly watchList: Movie[] = [];

	constructor(private httpClient: HttpClient, private auth: AuthService) { }

	getMoviesByCategory(category: string, page: number = 1): Observable<ApiMovieModel> {
		return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/${category}?page=${page}&${this.apiKey}`);
	}
	getMovieById(id: number): Observable<DetailsMovie> {
		return this.httpClient.get<DetailsMovie>(`${this.apiUrl}/${id}?${this.apiKey}`);
	}
	searchMovie(query: string, page: number = 1){
		return this.httpClient.get<any>(`${this.baseUrl}/search/movie?query=${query}&page=${page}&${this.apiKey}`)
	}
	//favorite list functions===========================================
	getFavoriteMovies(): Observable<Movie[]> {
		this.accountId = this.auth.getPublicAccountId();
		this.sessionId = this.auth.getSessionId();
		const url = `${this.baseUrl}/account/${this.accountId}/favorite/movies?${this.apiKey}&session_id=${this.sessionId}`;
		return this.httpClient.get<{ results: Movie[] }>(url).pipe(
			map((response) => response.results),
			catchError(this.handleError)
		);
	}

	setToFavoriteMovies(movie: Movie) {
		const url = `${this.baseUrl}/account/${this.accountId}/favorite?${this.apiKey}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movie.	id,
			favorite: true,
		};
		catchError(this.handleError)
		return this.httpClient.post<Movie>(url, body);
	}
	removeFromFavoriteMovies(movie: Movie): Observable<Movie> {
		const url = `${this.baseUrl}/account/${this.accountId}/favorite?${this.apiKey}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movie.id,
			favorite: false,
		};
		return this.httpClient.post<Movie>(url, body);
	}
	//watchList functions==================================================
	getWatchList(): Observable<Movie[]> {
		const url = `${this.baseUrl}/account/${this.accountId}/watchlist/movies?${this.apiKey}&session_id=${this.sessionId}`;
		return this.httpClient.get<{ results: Movie[] }>(url).pipe(
			map((response) => response.results),
			catchError(this.handleError)
		);
	}
	setToWatchList(movie: Movie) {
		const url = `${this.baseUrl}/account/${this.accountId}/watchlist?${this.apiKey}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movie.id,
			watchlist: true,
		};
		return this.httpClient.post<Movie>(url, body);
	}
	removeFromWatchList(movie: Movie) {
		const url = `${this.baseUrl}/account/${this.accountId}/watchlist?${this.apiKey}&session_id=${this.sessionId}`;
		const body = {
			media_type: 'movie',
			media_id: movie.id,
			watchlist: false,
		};
		return this.httpClient.post<Movie>(url, body);
	}

	private handleError(error: any) {
		console.error('An error occurred:', error);
		return throwError(error);
	}
}
