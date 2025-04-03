import { Component } from '@angular/core';
import { UserComponent } from "../../../shared/components/user/user.component";

@Component({
  selector: 'app-dashboard-header',
  imports: [UserComponent],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.css'
})
export class DashboardHeaderComponent {

}
