import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Response } from '../models/Response';
import { AuthService } from '../core/services/auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  credentials: FormGroup;

  constructor(
    private authService: AuthService,
    public router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  submit() {
    this.authService
      .register(this.credentials.value)
      .subscribe((response: Response) => {
        if (response.success) {
          this.router.navigate(['tabs']);
        }
      });
  }

  get name() {
    return this.credentials.get('name');
  }

  get email() {
    return this.credentials.get('email');
  }

  get password() {
    return this.credentials.get('password');
  }
}
