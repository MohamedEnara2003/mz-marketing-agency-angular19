import { Injectable, signal } from "@angular/core";
import { Actions , createEffect, ofType } from "@ngrx/effects";
import { CategoriesService } from "../service/categories.service";
import { catchError, map, Observable, of, switchMap, tap } from "rxjs";
import { categoriesActions } from "./action-types";
import { CategoriesType } from "../../shared/interfaces/categories";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";




@Injectable()
export class CategoriesEffect {

loadCategory$! : Observable<{categories: CategoriesType[]} | {error : string}>

constructor(
private actions$ : Actions ,
private categoriesService : CategoriesService,
){}

}