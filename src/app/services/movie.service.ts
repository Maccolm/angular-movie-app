import { Injectable } from '@angular/core';
import { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies } from '../../../mock-data';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getPopularMovies(){
	return popularMovies;
  }
  getUpcomingMovies() {
	return upcomingMovies;
  }
  getNowPlayingMovies(){
	return nowPlayingMovies;
  }
  getTopRateMovies(){
	return topRatedMovies;
  }
}
