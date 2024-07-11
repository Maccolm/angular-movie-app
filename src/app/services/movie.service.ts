import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiMovieModel } from '../models/movie.models';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiKey = '?api_key=81c0dd880c00cce619f4569514eade3b';
  private apiToken =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MWMwZGQ4ODBjMDBjY2U2MTlmNDU2OTUxNGVhZGUzYiIsIm5iZiI6MTcyMDY4NjE3Ni40MTk4ODQsInN1YiI6IjY2OGRkYTJiMTI2YjJmN2Q0NDU5YzBjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NNGPUfrm-0XCZxI5QIoiPs4KN7p-0hKIaDqxO0MYmGs';

 private  apiUrl = 'https://api.themoviedb.org/3/movie';
  favoriteMovies: any[] = [];
  watchList: any[] = [];

  constructor(private httpClient: HttpClient) {}

  getPopularMovies(): Observable<ApiMovieModel> {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/popular${this.apiKey}`)
  }
  getUpcomingMovies() {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/upcoming${this.apiKey}`);
  }
  getNowPlayingMovies() {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/now_playing${this.apiKey}`)
  }
  getTopRateMovies() {
    return this.httpClient.get<ApiMovieModel>(`${this.apiUrl}/top_rated${this.apiKey}`);
  }

  getFavoriteMovies() {
    return this.favoriteMovies;
  }
  getWatchList() {
    return this.watchList;
  }
  setFavoriteMovies(movie: any) {
    const isInFavorite = this.favoriteMovies.find((m) => m === movie);
    if (!isInFavorite) {
      this.favoriteMovies.push(movie);
    } else {
      console.log('it is already in favorite');
    }
  }
  setWatchList(movie: any) {
    const isInWatchList = this.watchList.find((m) => m === movie);
    if (!isInWatchList) {
      this.watchList.push(movie);
    } else {
      console.log('already in watchList');
    }
  }
  isInFavoriteList(movie: any): boolean {
    return this.favoriteMovies.includes(movie);
  }
  isInWatchList(movie: any): boolean {
    return this.watchList.includes(movie);
  }

  deleteFromWatchList(movie: any) {
    const index = this.watchList.findIndex((m) => m === movie);
    this.watchList.splice(index, 1);
  }
  deleteFromFavorites(movie: any) {
    const index = this.favoriteMovies.findIndex((m) => movie === m);
    this.favoriteMovies.splice(index, 1);
  }
  getMovieById(id: number) {
    return 
  }
}
