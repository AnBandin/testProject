import {
  Component,
  signal,
  WritableSignal,
  ChangeDetectionStrategy,
  inject, DestroyRef, OnInit
} from '@angular/core';
import { ButtonComponent } from '@ux/button/button.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { ClientService } from '../../../services/client.service';
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import {phoneValidator} from "@utils";
import {FullName, FullNameInputComponent} from "../../../components/full-name-input/full-name-input.component";

@Component({
  selector: 'new-client-popup',
  standalone: true,
  imports: [ButtonComponent, CommonModule, ReactiveFormsModule, FullNameInputComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-client-popup.component.html',
  styleUrl: './new-client-popup.component.scss'
})
export class NewClientPopupComponent implements OnInit {

  private clientService = inject(ClientService);
  private destroyRef = inject(DestroyRef);
  private fb = inject(FormBuilder);

  isModalOpen: WritableSignal<boolean> = signal(false);

  clientForm: FormGroup;

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      template: new FormControl({value: 'Тестовый', disabled: true}, [Validators.required]),
      fullName: new FormControl<FullName | string | null>('', [Validators.required, Validators.nullValidator]),
      phone: new FormControl('', [Validators.required, phoneValidator]),
      email: new FormControl('', [Validators.required, Validators.email]),
      birthday: new FormControl(''),
      gender: new FormControl(''),
      barcode: new FormControl(''),
      discount: new FormControl(''),
      bonus: new FormControl(0),
      loyaltyLevel: new FormControl('')
    });
  }

  openModal() {
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.resetForm();
  }

  addClient() {
    if (this.clientForm.valid) {
      const raw = this.clientForm.getRawValue();

      const clientData = {
        template: 'Тестовый',
        first_name: raw.fullName.firstName,
        last_name: raw.fullName.lastName,
        pat_name: raw.fullName.patName,
        phone: raw.phone,
        email: raw.email,
        birthday: raw.birthday,
        gender: raw.gender,
        barcode: raw.barcode,
        discount: raw.discount,
        bonus: raw.bonus,
        loyalty_level: raw.loyaltyLevel
      };


      this.clientService.addClient(clientData)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.closeModal();
          },
          error: (error) => {
            console.error('Error adding client:', error);
          }
        });
    }
  }

  cancelAdd() {
    this.closeModal();
  }

  private resetForm() {
    this.clientForm.reset({
      template: 'Тестовый',
      fullName: '',
      phone: '',
      email: '',
      birthday: '',
      gender: '',
      barcode: '',
      discount: '',
      bonus: 0,
      loyaltyLevel: ''
    });
  }

  isFormValid(): boolean {
    return this.clientForm.valid;
  }

}

