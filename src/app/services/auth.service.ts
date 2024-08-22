import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, switchMap, throwError } from "rxjs";
import { environment } from "../../environments/environment";

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
	setAccountId(accountId: number): void {
		window.localStorage.setItem('account_id', accountId.toString());
	}
	getPublicAccountId() {
		const account_id = window.localStorage.getItem('account_id'); 
		return account_id ? parseInt( account_id, 10) : null;
	}
	setSessionId(sessionId: string): void {
		window.localStorage.setItem('session_id', sessionId);
	}
	getSessionId() {
		return window.localStorage.getItem('session_id');
	}

	private getRequestToken(): Observable<string> {
		const url = `${this.apiUrl}/authentication/token/new?api_key=${this.apiKey}`;
		return this.http.get<any>(url).pipe(
			 map(response => response.request_token),
			 catchError(this.handleError)
		);
  }

  // Validate the request token with the user's credentials
  private validateRequestToken(username: string, password: string, requestToken: string): Observable<void> {
		const url = `${this.validateUrl}?api_key=${this.apiKey}`;
		const body = {
			 username: username,
			 password: password,
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
  public authenticateAndGetAccountId(username: string, password: string): Observable<{ accountId: number, sessionId: string}> {
		return this.getRequestToken().pipe(
			 switchMap(requestToken => this.validateRequestToken(username, password, requestToken).pipe(
				  switchMap(() => this.createSession(requestToken)),
				  switchMap(sessionId => this.getAccountId(sessionId).pipe(
					map(accountId => ({ accountId, sessionId }))
				  ))
			 ))
		);
  }

  private handleError(error: any) {
		console.error('An error occurred:', error);
		return throwError(error);
  }

}

