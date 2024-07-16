import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private apiUrl = 'https://api.themoviedb.org/3';
	private apiKey = '81c0dd880c00cce619f4569514eade3b';

	private username = 'VitaliiShapovalov';
	private password = 'cN.hwyTvag3s.8m';

	constructor(private http: HttpClient) { }

	// Get the request token
	private getRequestToken(): Observable<string> {
		 const url = `${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`;
		 return this.http.get<any>(url).pipe(
			  map(response => response.request_token),
			  catchError(this.handleError)
		 );
	}

	// Validate the request token with the user's credentials
	private validateRequestToken(requestToken: string): Observable<void> {
		 const url = `${this.apiUrl}/authentication/token/validate_with_login?api_key=${this.apiKey}`;
		 const body = {
			  username: this.username,
			  password: this.password,
			  request_token: requestToken
		 };
		 return this.http.post<any>(url, body).pipe(
			  map(() => { }),
			  catchError(this.handleError)
		 );
	}

	// Create a session ID
	private createSession(requestToken: string): Observable<string> {
		 const url = `${this.apiUrl}/authentication/session/new?api_key=${this.apiKey}`;
		 const body = { request_token: requestToken };
		 return this.http.post<any>(url, body).pipe(
			  map(response => response.session_id),
			  catchError(this.handleError)
		 );
	}

	// Get account details to retrieve accountId
	private getAccountId(sessionId: string): Observable<number> {
		 const url = `${this.apiUrl}/account?api_key=${this.apiKey}&session_id=${sessionId}`;
		 return this.http.get<any>(url).pipe(
			  map(response => response.id),
			  catchError(this.handleError)
		 );
	}

	// Public method to get accountId
	public authenticateAndGetAccountId(): Observable<number> {
		 return this.getRequestToken().pipe(
			  switchMap(requestToken => this.validateRequestToken(requestToken).pipe(
					switchMap(() => this.createSession(requestToken)),
					switchMap(sessionId => this.getAccountId(sessionId))
			  ))
		 );
	}

	private handleError(error: any) {
		 console.error('An error occurred:', error);
		 return throwError(error);
	}
	public authenticateAndGetSessionId(): Observable<string> {
		return this.getRequestToken().pipe(
		  switchMap(requestToken => this.validateRequestToken(requestToken).pipe(
			 switchMap(() => this.createSession(requestToken))
		  ))
		);
	 }
}

