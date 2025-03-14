import { Routes } from "@angular/router";
import { CategoryComponent } from "./pages/category/category.component";
import { CategoryDetailsComponent } from "./components/category-details/category-details.component";


export const categoriesRoutes: Routes = [
    {path : 'category/:category' , component : CategoryComponent},
    {path : 'watch/:category'  , component : CategoryDetailsComponent},
    {path : '' , redirectTo : '/categories/category/motion' , pathMatch :'full'}

]