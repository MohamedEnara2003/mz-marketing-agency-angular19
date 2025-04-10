import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppTranslateModule } from './shared/modules/app-translate.module';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore,} from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { appReducers, storeConfig } from './store.config';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(AppTranslateModule.forRoot()),
    provideStore(appReducers, storeConfig),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode()}),
    provideEffects(),
  
  ]
};
