import { Component, inject, OnInit } from '@angular/core';
import { LoginStore } from '../../../store/login.store';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  readonly store = inject(LoginStore);
  private formBuilder = inject(FormBuilder);

  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.loginForm.valid && this.loginForm.value) {
      console.log(this.loginForm.value);
      const { username, password } = this.loginForm.value;
      if (username && password) {
        this.store.login({ username, password });
      }
    } else {
      console.log('Form is not valid');
    }
  }
}
