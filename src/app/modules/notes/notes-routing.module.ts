import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { NotesAddComponent } from './notes-add/notes-add.component';
import { NotesDetailsComponent } from './notes-details/notes-details.component';
import { NotesListComponent } from './notes-list/notes-list.component';

const routes: Routes = [
  {
    path: '',
    component: NotesListComponent,
  },
  {
    path: 'add',
    component: NotesAddComponent,
  },
  {
    path: ':id',
    component: NotesDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotesRoutingModule {}
