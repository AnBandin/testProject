import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthPageComponent } from './auth-page.component';

describe('AuthPageComponent', () => {
  let component: AuthPageComponent;
  let fixture: ComponentFixture<AuthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthPageComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.authForm.get('emailPhone')?.value).toBe('');
    expect(component.authForm.get('password')?.value).toBe('');
  });

  it('should validate required fields', () => {
    const emailPhoneControl = component.authForm.get('emailPhone');
    const passwordControl = component.authForm.get('password');

    expect(emailPhoneControl?.hasError('required')).toBeTruthy();
    expect(passwordControl?.hasError('required')).toBeTruthy();
  });

  it('should validate email or phone format', () => {
    const emailPhoneControl = component.authForm.get('emailPhone');

    emailPhoneControl?.setValue('invalid');
    emailPhoneControl?.markAsTouched();
    expect(emailPhoneControl?.hasError('invalidEmailOrPhone')).toBeTruthy();

    expect(emailPhoneControl?.hasError('invalidEmailOrPhone')).toBeTruthy();
    emailPhoneControl?.setValue('abcbx');

    emailPhoneControl?.setValue('test@example.com');
    expect(emailPhoneControl?.hasError('invalidEmailOrPhone')).toBeFalsy();

    emailPhoneControl?.setValue('+79991210922');
    expect(emailPhoneControl?.hasError('invalidEmailOrPhone')).toBeFalsy();

    emailPhoneControl?.setValue('12345678901');
    expect(emailPhoneControl?.hasError('invalidEmailOrPhone')).toBeFalsy();
  });
});
