import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ButtonComponent} from "@ux/button/button.component";

@Component({
  selector: 'loyalty-panel',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loyalty-panel.component.html',
  styleUrl: './loyalty-panel.component.scss'
})
export class LoyaltyPanelComponent {

}
