import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';

import { FirebaseAuthService } from './firebase-auth.service';
import { Injectable } from '@angular/core';

export interface INote {
  id: string;
  title: string;
  content: string;
  created_at: number;
  updated_at: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  protected readonly USERS_COLLECTION = 'users';
  protected readonly NOTES_COLLECTION = 'notes';
  public isLoading$ = new BehaviorSubject<boolean>(true);

  constructor(
    private afDb: AngularFirestore,
    private auth: FirebaseAuthService
  ) {
    this.getUserNotesCollection().valueChanges();
  }

  get timestamp() {
    return new Date().getTime();
  }

  getUserNotesCollection(): AngularFirestoreCollection<Partial<INote>> {
    return this.afDb.collection(
      `${this.USERS_COLLECTION}/${this.auth.id}/${this.NOTES_COLLECTION}`,
      (ref) => ref.orderBy('updated_at', 'desc')
    );
  }

  addNote(data: Pick<INote, 'title' | 'content'>) {
    return this.getUserNotesCollection().add({
      ...data,
      created_at: this.timestamp,
      updated_at: this.timestamp,
    });
  }

  editNote(id: string, data: INote) {
    return this.getUserNotesCollection()
      .doc(id)
      .update({
        ...data,
        updated_at: this.timestamp,
      });
  }

  deleteNote(id: string) {
    return this.getUserNotesCollection().doc(id).delete();
  }

  getNote(id: string) {
    return this.getUserNotesCollection()
      .doc(id)
      .snapshotChanges()
      .pipe(
        map((snapshot) => {
          return snapshot.payload.data() as INote;
        }),
        catchError((e) => throwError(() => new Error(e)))
      );
  }

  getNotes() {
    return this.getUserNotesCollection()
      .snapshotChanges()
      .pipe(
        map((snapshot) =>
          snapshot.map((a) => {
            // Get document data
            return a.payload.doc.data() as INote;
          })
        ),
        tap(() => {
          this.isLoading$.next(false);
        }),
        catchError((e) => throwError(() => new Error(e)))
      );
  }
}
