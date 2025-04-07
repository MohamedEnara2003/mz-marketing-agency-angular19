import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { AppTranslateModule } from './shared/modules/app-translate.module';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideStore, StoreConfig } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { categoriesNameKay, categoriesReducer } from './categories/reducers/reducers.action';
import { localStorageSync } from 'ngrx-store-localstorage';

export const storeConfig: StoreConfig<any, any> = {
  metaReducers: [
    localStorageSyncReducer
  ]
};

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: [categoriesNameKay],
    rehydrate: true, 
  })(reducer);
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(),
    importProvidersFrom(AppTranslateModule.forRoot()),
    provideStore(
    { [categoriesNameKay] : categoriesReducer},
    storeConfig 
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideEffects(),
  
  ]
};
