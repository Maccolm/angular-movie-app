import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { mockApiTvShowModel } from '../models/movie.models';
import { Observable } from 'rxjs';
import { Show } from '../models/show.models';

@Injectable({
  providedIn: 'root',
})
export class TvShowService {
  private apiKey = environment.apiKey;
  private apiUrl = environment.apiUrl;
  private baseUrl = environment.baseUrl;
  private tvShowUrl = environment.tvShowUrl;

  constructor(private httpClient: HttpClient) {}

  getTvShowsByCategory(category: string, page: number = 1) {
    return this.httpClient.get<mockApiTvShowModel>(`${this.tvShowUrl}/${category}?page=${page}&${this.apiKey}`);
  }
  getTvShowById(id: number):Observable<Show> {
	return this.httpClient.get<Show>(`${this.tvShowUrl}/${id}?${this.apiKey}`);
  }
}
