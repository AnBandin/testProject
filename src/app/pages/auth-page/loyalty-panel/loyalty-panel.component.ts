import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'loyalty-panel',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './loyalty-panel.component.html',
  styleUrl: './loyalty-panel.component.scss'
})
export class LoyaltyPanelComponent {

}
