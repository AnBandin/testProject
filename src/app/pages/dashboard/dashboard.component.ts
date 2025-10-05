import { Component } from '@angular/core';
import {HeaderPanelComponent} from "./header-panel/header-panel.component";
import {SliderPanelComponent} from "./slider-panel/slider-panel.component";
import {TableHeaderPanelComponent} from "./table-header-panel/table-header-panel.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HeaderPanelComponent,
    SliderPanelComponent,
    TableHeaderPanelComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
