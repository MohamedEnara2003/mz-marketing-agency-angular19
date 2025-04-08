import { createFeatureSelector, createSelector } from "@ngrx/store";
import { categoriesNameKay, CategoriesState, categoryNameKay, CategoryState } from "./reducers.action";

export const selectCategoriesState = createFeatureSelector<CategoriesState>(categoriesNameKay);
export const selectCategoryState = createFeatureSelector<CategoryState>(categoryNameKay);

export const selectAllCategories = createSelector(
    selectCategoriesState,
    (state) => state.categories
);

export const selectCategory = createSelector(
    selectCategoryState,
    (state) => state.category ,
);