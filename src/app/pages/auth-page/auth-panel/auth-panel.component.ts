import {Component, OnInit, inject, DestroyRef, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import {ButtonComponent} from "@ux/button/button.component";
import {emailOrPhoneValidator, getFieldError} from '@utils';
import {CommonModule} from "@angular/common";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'auth-panel',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-panel.component.html',
  styleUrl: './auth-panel.component.scss'
})
export class AuthPanelComponent implements OnInit {

  authForm: FormGroup;
  errorMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private cdr = inject(ChangeDetectorRef);

  protected readonly getFieldError = getFieldError;

  constructor(private fb: FormBuilder, ) {}

  ngOnInit(): void {
    this.authForm = this.fb.group({
      emailPhone: new FormControl('', [
        Validators.required,
        emailOrPhoneValidator
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5)
      ])
    });
  }

  onSubmit() {
    if (this.authForm.valid) {
      const login = this.authForm.get('emailPhone')?.value;
      const password = this.authForm.get('password')?.value;
      this.authService.login({ login, password })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: () => {
          this.errorMessage = 'Ошибка при регистрации';
          this.cdr.markForCheck();
        }
      });
    }
  }
}
