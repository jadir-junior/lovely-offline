import { Component } from '@angular/core';
import { DataService } from '../../core/data.service';

@Component({
  selector: 'app-notes-list',
  template: `
    <div *ngIf="notes$ | async as notes; else notFound">
      <app-note-card *ngFor="let note of notes" [note]="note"></app-note-card>
    </div>
    <ng-template #notFound>
      <mat-card>
        <mat-card-title> Either you have no notes </mat-card-title>
      </mat-card>
    </ng-template>
  `,
})
export class NotesListComponent {
  notes$ = this.db.getNotes();
  isDbLoading$ = this.db.isLoading$;

  constructor(private db: DataService) {}
}
