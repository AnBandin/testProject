import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthPanelComponent} from "./auth-panel/auth-panel.component";
import {LoyaltyPanelComponent} from "./loyalty-panel/loyalty-panel.component";

@Component({
  selector: 'app-auth-page',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AuthPanelComponent,
    LoyaltyPanelComponent
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent {

}
