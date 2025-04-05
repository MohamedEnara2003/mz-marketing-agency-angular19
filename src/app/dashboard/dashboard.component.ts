import { Component, inject, signal } from '@angular/core';
import { AsideComponent } from "./components/aside/aside.component";
import { RouterModule } from '@angular/router';
import { NavLinks } from '../shared/interfaces/shared';
import { LinksService } from '../core/services/links.service';
import { NavBarComponent } from "../shared/components/nav-bar/nav-bar.component";


@Component({
  selector: 'app-dashboard',
  imports: [AsideComponent, RouterModule, NavBarComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {
  dashboardLinks = signal<NavLinks[]>([]);

  private linksService = inject(LinksService);


  ngOnInit(): void {
  this.dashboardLinks.set(this.linksService.dashboardLinks);
  }
}
