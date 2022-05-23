import { DataService, INote } from '../../core/data.service';

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notes-add',
  template: `
    <mat-card>
      <mat-card-title>New Note</mat-card-title>
      <mat-card-subtitle
        class="error"
        *ngIf="errorMessages$ | async as errorMessage"
      >
        {{ errorMessage }}
      </mat-card-subtitle>
      <mat-card-content>
        <app-note-form
          (saveNote)="onSaveNote($event)"
          (sendError)="onSendError($event)"
        ></app-note-form>
      </mat-card-content>
    </mat-card>
  `,
})
export class NotesAddComponent {
  public userID!: string;
  public errorMessages$ = new Subject();

  constructor(
    private router: Router,
    private data: DataService,
    private snackBar: MatSnackBar
  ) {}

  onSaveNote(values: Pick<INote, 'title' | 'content'>) {
    this.data
      .addNote(values)
      .then((doc) => {
        this.router.navigate(['/notes']);
        this.snackBar.open(`Note ${doc.id} has been succeffully saved`);
      })
      .catch(() => {
        this.errorMessages$.next('something is wrong when adding to DB');
      });
  }

  onSendError(message: string) {
    this.errorMessages$.next(message);
  }
}
