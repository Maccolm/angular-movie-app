import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { Auth } from '@angular/fire/auth';

class MockAuth {}

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, 
			{ provide: Auth, useClass: MockAuth }
		],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return accountId and sessionId on successful authentication', () => {
    const mockRequestToken = 'mockRequestToken';
    const mockSessionId = 'mockSessionId';
    const mockAccountId = 123;

    service.authenticateAndGetAccountId().subscribe(result => {
      expect(result.accountId).toEqual(mockAccountId);
      expect(result.sessionId).toEqual(mockSessionId);
    });

    const requestTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/new?api_key=${service['apiKey']}`);
    expect(requestTokenReq.request.method).toBe('GET');
    requestTokenReq.flush({ request_token: mockRequestToken });

    const validateTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/validate_with_login?api_key=${service['apiKey']}`);
    expect(validateTokenReq.request.method).toBe('POST');
    validateTokenReq.flush({});

    const createSessionReq = httpMock.expectOne(`${service['apiUrl']}/authentication/session/new?api_key=${service['apiKey']}`);
    expect(createSessionReq.request.method).toBe('POST');
    createSessionReq.flush({ session_id: mockSessionId });

    const getAccountIdReq = httpMock.expectOne(`${service['apiUrl']}/account?api_key=${service['apiKey']}&session_id=${mockSessionId}`);
    expect(getAccountIdReq.request.method).toBe('GET');
    getAccountIdReq.flush({ id: mockAccountId });
  });

  it('should handle errors in authenticateAndGetAccountId', () => {
    const errorMessage = 'Error getting request token';

    service.authenticateAndGetAccountId().subscribe(
      () => fail('Expected an error, but got a result'),
      (error) => {
			expect(error.status).toBe(500);
        expect(error.statusText).toBe(errorMessage);
      }
    );

    const requestTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/new?api_key=${service['apiKey']}`);
    requestTokenReq.flush(null, { status: 500, statusText: errorMessage });
  });

  it('should handle validation failure in authenticateAndGetAccountId', () => {
	const mockRequestToken = 'mockRequestToken';
	const errorMessage = 'Invalid login credentials';

	service.authenticateAndGetAccountId().subscribe(
		() => fail('Expected an error, but got a result'),
		(error) => {
			expect(error.status).toBe(401);
			expect(error.statusText).toBe(errorMessage);
		}
	);
	const requestTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/new?api_key=${service['apiKey']}`);
	expect(requestTokenReq.request.method).toBe('GET');
	requestTokenReq.flush({ request_token: mockRequestToken });
	const validateTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/validate_with_login?api_key=${service['apiKey']}`);
	expect(validateTokenReq.request.method).toBe('POST');
	validateTokenReq.flush(null, { status: 401, statusText: errorMessage });
  });
  
  it('should handle session creation failure in authenticateAndGetAccountId', () => {
	const mockRequestToken = 'mockRequestToken';
	const errorMessage = 'Error creating session';

	service.authenticateAndGetAccountId().subscribe(
		() => fail('Expected an error, but got a result'),
		(error) => {
			expect(error.status).toBe(500);
			expect(error.statusTExt).toBe(errorMessage);
		}
	);
	const requestTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/new?api_key=${service['apiKey']}`);
	expect(requestTokenReq.request.method).toBe('GET');
	requestTokenReq.flush({ request_token: mockRequestToken });
	const validateTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/validate_with_login?api_key=${service['apiKey']}`);
	expect(validateTokenReq.request.method).toBe('POST');
	validateTokenReq.flush({});
	const createSessionReq = httpMock.expectOne(`${service['apiUrl']}/authentication/session/new?api_key=${service['apiKey']}`);
	expect(createSessionReq.request.method).toBe('POST');
	createSessionReq.flush( null, {status: 500, statusText: errorMessage });
  });

  it('should handle account retrieval failure in authenticateAndGetAccountId', () => {
	const mockRequestToken = 'mockRequestToken';
    const mockSessionId = 'mockSessionId';
    const errorMessage = 'Error retrieving account details';

	 service.authenticateAndGetAccountId().subscribe(
		() => fail('Expected an error, but got a result'),
		(error) => {
			expect(error.status).toBe(500);
			expect(error.statusText).toBe(errorMessage);
		}
	 );
	 const requestTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/new?api_key=${service['apiKey']}`);
    expect(requestTokenReq.request.method).toBe('GET');
    requestTokenReq.flush({ request_token: mockRequestToken });

    const validateTokenReq = httpMock.expectOne(`${service['apiUrl']}/authentication/token/validate_with_login?api_key=${service['apiKey']}`);
    expect(validateTokenReq.request.method).toBe('POST');
    validateTokenReq.flush({});

    const createSessionReq = httpMock.expectOne(`${service['apiUrl']}/authentication/session/new?api_key=${service['apiKey']}`);
    expect(createSessionReq.request.method).toBe('POST');
    createSessionReq.flush({ session_id: mockSessionId });

    const getAccountIdReq = httpMock.expectOne(`${service['apiUrl']}/account?api_key=${service['apiKey']}&session_id=${mockSessionId}`);
    expect(getAccountIdReq.request.method).toBe('GET');
    getAccountIdReq.flush(null, { status: 500, statusText: errorMessage });
  });
});
