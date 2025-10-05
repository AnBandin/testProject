import { Component } from '@angular/core';
import {HeaderPanelComponent} from "./header-panel/header-panel.component";
import {SliderPanelComponent} from "./slider-panel/slider-panel.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderPanelComponent,
    SliderPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
