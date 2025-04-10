import { createReducer, on } from "@ngrx/store";
import { CategoriesType } from "../../shared/interfaces/categories";
import { categoriesActions } from "./action-types";

export const categoriesNameKay : string = 'categories' ;
export interface CategoriesState {
    categories : CategoriesType[] ,
    isLoading : boolean ,
    error : string
}

export const initialCategoriesState : CategoriesState = { 
    categories : [] ,
    isLoading : false ,
    error : ''
} 

export const categoriesReducer = createReducer(
    initialCategoriesState ,
    on(categoriesActions.GetCategories , (state) => ({
    ...state , isLoading : true })
    ),
    on(categoriesActions.GetCategoriesSuccess , (state , {categories}) => 
    ({...state , isLoading : false , categories})
    ),
    on(categoriesActions.GetCategoriesFailure , (state , {error}) => 
    ({ ...state , isLoading : false , error })
    ),
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