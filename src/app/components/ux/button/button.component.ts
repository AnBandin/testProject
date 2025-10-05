import {Component, EventEmitter, Input, Output} from '@angular/core';

export type ButtonSeverity = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large' | 'fullscreen';

@Component({
  selector: 'p-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() severity: ButtonSeverity = 'primary';
  @Input() size: ButtonSize = 'medium';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() width?: string;
  @Input() height?: string;
  @Input() borderRadius?: string;
  @Output() onClick = new EventEmitter<Event>();
}
