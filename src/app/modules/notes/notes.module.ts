import { NgModule } from '@angular/core';
import { NoteCardComponent } from './components/note-card/note-card.component';
import { NoteFormComponent } from './components/notes-form/notes-form.component';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { NotesListComponent } from './notes-list/notes-list.component';
import { NotesRoutingModule } from './notes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NotesListComponent,
    NotesAddComponent,
    NotesDetailsComponent,
    NoteFormComponent,
    NoteCardComponent,
  ],
  imports: [NotesRoutingModule, SharedModule],
})
export class NotesModule {}
