import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Component } from '@angular/core';
import { FirebaseAuthService } from '../core/firebase-auth.service';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styles: [
    `
      .login-container {
        display: flex;
        flex-direction: column;
        > * {
          width: 100%;
        }
      }
    `,
  ],
})
export class UserContainerComponent {
  public errorMessages$ = this.afAuthService.authErrorMessages$;
  public user$ = this.afAuthService.user$;
  public isLoading$ = this.afAuthService.isLoading$;
  public hide = true;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private afAuthService: FirebaseAuthService,
    private fb: FormBuilder
  ) {}

  public signUp() {
    this.checkFormValidity(() => {
      this.afAuthService.signUpFirebase(this.loginForm.value);
    });
  }

  public login() {
    this.checkFormValidity(() => {
      this.afAuthService.loginFirebase(this.loginForm.value);
    });
  }

  private checkFormValidity(cb: Function) {
    if (this.loginForm.valid) {
      cb();
    } else {
      this.errorMessages$.next('Please enter correct Email and Password value');
    }
  }

  public logOut() {
    this.afAuthService.logOutFirebase();
  }

  public getErrorMessage(controlName: string, errorName: string): string {
    const control = this.loginForm.get(controlName);
    return control?.hasError('required')
      ? 'You must enter a value'
      : control?.hasError(errorName)
      ? `Not a valid ${errorName}`
      : '';
  }
}
