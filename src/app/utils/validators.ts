import { AbstractControl, ValidationErrors, Validators } from '@angular/forms';

export const phoneValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;

  const phonePattern = /^(\+?[1-9]\d{10,13})$/;
  return phonePattern.test(control.value) ? null : 
  { invalidPhone: 'Неверный формат телефона' };
};

export const emailOrPhoneValidator = (control: AbstractControl): ValidationErrors | null => {
  if (!control.value) return null;

  const emailError = Validators.email(control);
  const phoneError = phoneValidator(control);

  if (emailError === null || phoneError === null) {
    return null;
  }

  return { invalidEmailOrPhone: 'Неправильный номер или почта' };
};

export function getFieldError(control: AbstractControl | null): string {
    if (!control?.errors || !control.touched) return '';
    
    const errorKey = Object.keys(control.errors)[0];
    const error = control.errors[errorKey];
    
    switch (errorKey) {
      case 'required':
        return 'Поле обязательно для заполнения';
      case 'minlength':
        return `Минимум ${error.requiredLength} символов`;
      case 'invalidEmailOrPhone':
        return 'Неправильный номер или почта';
      default:
        return 'Неверное значение';
    }
  }
