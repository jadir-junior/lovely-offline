import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './modules/notes/auth.guard';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'notes',
    loadChildren: () =>
      import('./modules/notes/notes.module').then((m) => m.NotesModule),
    canLoad: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/notes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule],
})
export class AppRoutingModule {}
