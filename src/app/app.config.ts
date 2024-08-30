import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { MovieReducer } from './store/reducer';
import { MovieEffects } from './store/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { initializeApp } from "firebase/app";
import { provideFirebaseApp } from '@angular/fire/app'
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideAnalytics, getAnalytics } from '@angular/fire/analytics';
import { environmentFirebase } from '../environments/environment';

export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		provideStore({ movieState: MovieReducer }),
		provideEffects([MovieEffects]),
		provideStoreDevtools({ maxAge: 25, logOnly: false }),
		importProvidersFrom(BrowserAnimationsModule),
		provideFirebaseApp(() => initializeApp(environmentFirebase.firebaseConfig)),
		provideAuth(() => getAuth()),
		provideAnalytics(() => getAnalytics())
	],
};
