import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { SessionResponse, tokenResponse } from "../models/auth.models";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly tokenUrl = 'https://api.themoviedb.org/3/authentication/token/new';
	private readonly validateUrl = 'https://api.themoviedb.org/3/authentication/token/validate_with_login';
	private readonly sessionUrl = 'https://api.themoviedb.org/3/authentication/session/new';
	private apiUrl = 'https://api.themoviedb.org/3';
	private apiKey = '81c0dd880c00cce619f4569514eade3b';
	private username = 'VitaliiShapovalov';
	private password = 'cN.hwyTvag3s.8m';
	private readonly tokenBearer = environment.apiToken 

	constructor(private http: HttpClient) { }

	createSession(): Observable<SessionResponse>{
		const headers = new HttpHeaders({
			accept: 'application/json',
			Authorization: `Bearer ${this.tokenBearer}`,
		});
		return this.http.get<tokenResponse>(this.tokenUrl, {headers}).pipe(
			switchMap((tokenResponse) => {
				const requestToken = tokenResponse.request_token;
				const  validateBody = {
					username: this.username,
					password: this.password,
					request_token: requestToken,
				};
				return this.http.post<tokenResponse>(this.validateUrl, validateBody, {
					headers,
				});
			}),
			switchMap((validateResponse) => {
				const requestToken = validateResponse.request_token;
				const sessionBody = { request_token: requestToken };
				return this.http.post<SessionResponse>(this.sessionUrl, sessionBody, { headers });
			}),
			catchError((error) => {
				console.error('Error creating session', error);
				throw error
			}),
		);
	} 

}

