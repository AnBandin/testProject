import { Component } from '@angular/core';
import {ButtonComponent} from "@ux/button/button.component";

@Component({
  selector: 'slider-panel',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './slider-panel.component.html',
  styleUrl: './slider-panel.component.scss'
})
export class SliderPanelComponent {

}
