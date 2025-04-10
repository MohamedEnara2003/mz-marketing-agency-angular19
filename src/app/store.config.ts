import { localStorageSync } from 'ngrx-store-localstorage';
import { ActionReducer, ActionReducerMap } from '@ngrx/store';
import { categoriesReducer, CategoriesState, categoryByIdReducer, categoryNameKay, CategoryState } from './categories/reducers/reducers.action';

export interface AppState {
    categories: CategoriesState;
    category: CategoryState;
}

export function localStorageSyncReducer(
    reducer: ActionReducer<any>
): ActionReducer<any> {
    return localStorageSync({
    keys: [categoryNameKay],
    rehydrate: true,
})(reducer);
}


export const appReducers :ActionReducerMap<AppState> = {
categories: categoriesReducer,
category: categoryByIdReducer,
};


export const storeConfig = {
    metaReducers: [localStorageSyncReducer],
};
