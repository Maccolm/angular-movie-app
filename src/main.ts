import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';;
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { importProvidersFrom } from '@angular/core'; 

import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
    provideHttpClient(),
    provideStore(),
    provideEffects()
]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
