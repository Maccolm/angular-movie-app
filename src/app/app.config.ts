import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MovieReducer } from './store/reducer';
import { MovieEffects } from './store/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		provideStore({ movieState: MovieReducer }),
		provideEffects([MovieEffects]),
		provideStoreDevtools({ maxAge: 25, logOnly: false }),
	],
};
