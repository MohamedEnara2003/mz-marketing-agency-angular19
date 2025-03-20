import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppTranslateModule } from './shared/modules/app-translate.module';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes) ,
  provideHttpClient(),
  provideAnimationsAsync(),
  importProvidersFrom(AppTranslateModule.forRoot()),
  ]
};
