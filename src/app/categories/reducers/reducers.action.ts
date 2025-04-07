import { createReducer, on } from "@ngrx/store";
import { CategoriesType } from "../../shared/interfaces/categories";
import { categoriesActions } from "./action-types";

export const categoriesNameKay : string = 'categories' ;
export interface CategoriesState {
    categories : CategoriesType[] ,
}
export const initialState : CategoriesState = { 
    categories : [] ,
} 

export const categoriesReducer = createReducer(
    initialState ,
    on(categoriesActions.GetCategories , (state , {categories}) => ({
    ...state , categories
    })

    )
)