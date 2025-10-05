import { Component } from '@angular/core';
import {ButtonComponent} from "@ux/button/button.component";

@Component({
  selector: 'header-panel',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header-panel.component.html',
  styleUrl: './header-panel.component.scss'
})
export class HeaderPanelComponent {

}
