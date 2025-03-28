import { Routes } from "@angular/router";
import { CategoryComponent } from "./pages/category/category.component";
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";


export const categoriesRoutes: Routes = [
    {path : '' , component : CategoryComponent},
    {path : 'watch'  , component : CategoryDetailsComponent},
    {path : '' , redirectTo : '/categories' , pathMatch :'full'}

]