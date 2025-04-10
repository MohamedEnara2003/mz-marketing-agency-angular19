import { createAction, props } from "@ngrx/store";
import { CategoriesType } from "../../shared/interfaces/categories";


export const GetCategories = createAction(
    '[get categories] Categories Page' ,
)

export const GetCategoriesSuccess = createAction(
    '[get categories] Categories Page' ,
    props<{categories : CategoriesType[]}>()
)

export const GetCategoriesFailure = createAction(
    '[get categories] Categories Page' ,
    props<{error : string}>()
)

export const GetCategotyById = createAction(
    '[get category] CategoryDetails Page' ,
    props<{category : CategoriesType | undefined}>()
)


