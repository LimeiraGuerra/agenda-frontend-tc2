import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  formSignup!: FormGroup;
  isLoading = false;
  serverError = {id: '', hasError: false};
  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.formSignup = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(2)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  trimInput(formCtrlName: string): void {
    const field = this.formSignup.get(formCtrlName);
    if (field) {
      field?.setValue(field?.value.trim());
    }
  }

  onSubmit(): void {
    if (this.formSignup.valid) {
      this.isLoading = true;
      const newUser = {
        name: this.formSignup.get('name')?.value,
        email: this.formSignup.get('email')?.value,
        password: this.formSignup.get('newPassword')?.value,
      };
      this.authenticationService
        .signup(newUser)
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate(['/dashboard']);
          },
          (error) => {
            this.serverError.id = error.id;
            this.serverError.hasError = true;
            this.isLoading = false;
          }
        );
    }
  }
}
