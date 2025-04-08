import { createReducer, on } from "@ngrx/store";
import { CategoriesType } from "../../shared/interfaces/categories";
import { categoriesActions } from "./action-types";

export const categoriesNameKay : string = 'categories' ;
export interface CategoriesState {
    categories : CategoriesType[] ,
}
export const initialCategoriesState : CategoriesState = { 
    categories : [] ,
} 

export const categoriesReducer = createReducer(
    initialCategoriesState ,
    on(categoriesActions.GetCategories , (state , {categories}) => ({
    ...state , loading : false , categories ,
    })
    )   
)

export const categoryNameKay : string = 'category' ;
export interface CategoryState {
    category : CategoriesType | undefined ,
}

export const initialCategoryState : CategoryState = { 
    category : undefined ,
} 

export const categoryByIdReducer = createReducer(
    initialCategoryState ,
    on(categoriesActions.GetCategotyById , (state , {category}) => ({
    ...state , category
    })
    )
)