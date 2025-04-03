import { Component } from '@angular/core';
import { AsideComponent } from "./components/aside/aside.component";
import { DashboardHeaderComponent } from "./components/dashboard-header/dashboard-header.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  imports: [AsideComponent, DashboardHeaderComponent , RouterModule],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {

}
