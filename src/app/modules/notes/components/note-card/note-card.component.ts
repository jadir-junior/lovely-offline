import { Component, Input } from '@angular/core';

import { INote } from 'src/app/modules/core/data.service';

@Component({
  selector: 'app-note-card',
  template: `
    <mat-card>
      <mat-card-title>{{ note.title }}</mat-card-title>
      <mat-card-subtitle>
        {{ note.created_at | date: 'short' }}
      </mat-card-subtitle>
      <mat-card-content> {{ note.content }} </mat-card-content>
      <mat-card-footer class="text-right">
        <button mat-raised-button color="primary" *ngIf="edit">
          <mat-icon>edit</mat-icon>
        </button>
        <mat-progress-bar
          *ngIf="loading"
          mode="indeterminate"
        ></mat-progress-bar>
      </mat-card-footer>
    </mat-card>
  `,
})
export class NoteCardComponent {
  @Input() note!: INote;
  @Input() loading!: boolean;
  @Input() edit = true;
}
