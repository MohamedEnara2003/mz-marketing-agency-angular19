import { createAction, props } from "@ngrx/store";
import { CategoriesType } from "../../shared/interfaces/categories";


export const GetCategories = createAction(
    '[get categories] Categories Page' ,
    props<{categories : CategoriesType[]}>()
)


