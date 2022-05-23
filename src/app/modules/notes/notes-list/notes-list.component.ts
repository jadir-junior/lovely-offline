import { Component, OnInit } from '@angular/core';
import { DataService, INote } from '../../core/data.service';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-notes-list',
  template: ` <div *ngIf="notes$ | async as notes"></div> `,
  styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {
  notes$!: Observable<INote[]>;
  isDbLoading$ = this.db.isLoading$;

  constructor(private db: DataService) {}

  ngOnInit(): void {
    this.db.getNotes().subscribe((notes) => {
      console.log(notes);
      return notes;
    });
  }
}
