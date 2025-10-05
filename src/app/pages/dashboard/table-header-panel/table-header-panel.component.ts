import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'table-header-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './table-header-panel.component.html',
  styleUrl: './table-header-panel.component.scss'
})
export class TableHeaderPanelComponent {

}
