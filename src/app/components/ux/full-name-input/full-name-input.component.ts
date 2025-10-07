import {ChangeDetectionStrategy, Component, forwardRef} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export type FullName = {
  firstName: string;
  lastName: string;
  patName: string;
};

@Component({
  selector: 'full-name-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FullNameInputComponent),
    multi: true
  }],
  templateUrl: './full-name-input.component.html',
  styleUrl: './full-name-input.component.scss'
})
export class FullNameInputComponent implements ControlValueAccessor {
  placeholder = 'Иванов Иван Иванович';
  disabled = false;
  displayText = '';

  onChange: (val: FullName | null) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.displayText = value;
  }

  registerOnChange(fn: (val: FullName | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(e: Event): void {
    const text = (e.target as HTMLInputElement).value;
    this.displayText = text.trim();

    if (this.displayText.length) {
      const parsed = this.parseFullName(this.displayText);
      this.onChange(parsed);
    } else {
      this.onChange(null);
    }
  }

  private parseFullName(fio: string): FullName {
    const parts = fio.split(' ');
    const [lastName, firstName, patName] = parts;

    return {
      lastName: lastName ?? '',
      firstName: firstName ?? '',
      patName: patName ?? ''
    };
  }

}
