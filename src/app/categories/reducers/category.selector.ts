import { createFeatureSelector, createSelector } from "@ngrx/store";
import { categoriesNameKay, CategoriesState } from "./reducers.action";

export const selectCategoryState = createFeatureSelector<CategoriesState>(categoriesNameKay);

export const selectAllCategories = createSelector(
    selectCategoryState,
    (state) => state.categories
);