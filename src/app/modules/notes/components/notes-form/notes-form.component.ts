import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { INote } from 'src/app/modules/core/data.service';

@Component({
  selector: 'app-note-form',
  template: `
    <div class="note-container" [formGroup]="noteForm">
      <mat-form-field>
        <input
          type="text"
          matInput
          placeholder="Enter your title"
          formControlName="title"
          required
        />
      </mat-form-field>
      <br />
      <mat-form-field>
        <textarea
          matInput
          placeholder="Leave a comment"
          formControlName="content"
          required
          cdkTextareaAutosize
        ></textarea>
      </mat-form-field>
    </div>
    <br />
    <br />
    <div class="text-right">
      <button mat-raised-button color="primary" (click)="addNote()">
        Save
      </button>
    </div>
  `,
})
export class NoteFormComponent implements OnInit {
  noteForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    content: ['', [Validators.required]],
  });

  @Input() note?: Pick<INote, 'title' | 'content'>;

  @Output() saveNote = new EventEmitter();

  @Output() sendError = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.note) {
      this.noteForm.patchValue(this.note);
    }
  }

  addNote() {
    if (this.noteForm.valid) {
      this.saveNote.emit(this.noteForm.value);
    } else {
      this.sendError.emit('please fill all fields');
    }
  }
}
