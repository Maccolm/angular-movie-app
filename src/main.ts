import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationConfig } from '@angular/core';;
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { importProvidersFrom } from '@angular/core'; 

import { routes } from './app/app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule) 
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
