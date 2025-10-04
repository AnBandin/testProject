import {Component, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit {

  authForm: FormGroup;
  protected readonly getFieldError = getFieldError;

  constructor(private fb: FormBuilder) {}

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
    if (this.authForm.invalid) {
      return;
    }
  }

}
