import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  isLoading = false;
  serverError = {id: '', hasError: false};

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
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  trimInput(formCtrlName: string): void {
    const field = this.formLogin.get(formCtrlName);
    if (field) {
      field?.setValue(field?.value.trim());
    }
  }

  onSubmit(): void {
    if (this.formLogin.valid) {
      this.isLoading = true;
      const user = {
        email: this.formLogin.get('email')?.value,
        password: this.formLogin.get('password')?.value,
      };
      this.authenticationService
        .login(user)
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
