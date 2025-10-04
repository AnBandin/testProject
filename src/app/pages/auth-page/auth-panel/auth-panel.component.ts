import {Component, OnInit, OnDestroy, inject, DestroyRef} from '@angular/core';
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
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {filter} from "rxjs";

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit {

  authForm: FormGroup;
  errorMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

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
        }
      });
    }
  }

}
