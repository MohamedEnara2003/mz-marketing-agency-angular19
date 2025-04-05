import { Component,  input,  } from '@angular/core';
import { SharedModule } from '../../../shared/modules/shared.module';
import { LogoComponent } from "../../../shared/components/logo/logo.component";
import { LinkComponent } from "../link/link.component";
import { NavLinks } from '../../../shared/interfaces/shared';


@Component({
  selector: 'app-aside',
  imports: [SharedModule, LogoComponent, LinkComponent],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.css'
})
export class AsideComponent {
  dashboardLinks = input.required<NavLinks[]>();


}
