import { BehaviorSubject, Subject, first, tap } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';

interface IUser {
  email: string | null;
  uid: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IRegister extends ILogin {}

interface IErrorLogin {
  code: string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseAuthService {
  public authErrorMessages$ = new Subject<string>();
  public isLoading$ = new BehaviorSubject<boolean>(true);
  public user$ = new Subject<IUser | null>();

  private authState: IUser | null = null;

  constructor(private afAuth: AngularFireAuth) {
    this.isLoggedIn().subscribe((user) => (this.authState = user));
  }

  get authenticated(): boolean {
    return this.authState !== null;
  }

  get id(): string {
    return this.authenticated ? this.authState!.uid : '';
  }

  private isLoggedIn() {
    return this.afAuth.authState.pipe(
      first(),
      tap((user) => {
        this.isLoading$.next(false);
        if (user) {
          const { email, uid } = user;
          this.user$.next({ email, uid });
        }
      })
    );
  }

  public signUpFirebase({ email, password }: IRegister) {
    this.isLoading$.next(true);
    this.handleErrorOrSuccess(() => {
      return this.afAuth.createUserWithEmailAndPassword(email, password);
    });
  }

  public loginFirebase({ email, password }: ILogin) {
    this.isLoading$.next(true);
    this.handleErrorOrSuccess(() => {
      return this.afAuth.signInWithEmailAndPassword(email, password);
    });
  }

  public logOutFirebase() {
    this.isLoading$.next(true);
    this.afAuth
      .signOut()
      .then(() => {
        this.isLoading$.next(false);
        this.user$.next(null);
      })
      .catch((e) => {
        console.error(e);
        this.isLoading$.next(false);
        this.authErrorMessages$.next('Something is wrong when signing out!');
      });
  }

  private handleErrorOrSuccess(
    cb: () => Promise<firebase.auth.UserCredential>
  ) {
    cb()
      .then((data) => this.authenticateUser(data))
      .catch((e) => this.handleSignUpLoginError(e));
  }

  private authenticateUser(UserCredential: firebase.auth.UserCredential) {
    if (UserCredential?.user) {
      const {
        user: { email, uid },
      } = UserCredential;
      this.user$.next({ email, uid });
    }
    this.isLoading$.next(false);
  }

  private handleSignUpLoginError(error: IErrorLogin) {
    this.isLoading$.next(false);
    this.authErrorMessages$.next(error.message);
  }
}
