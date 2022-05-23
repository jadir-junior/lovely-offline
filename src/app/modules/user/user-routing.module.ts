import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { UserContainerComponent } from './user-container.component';

const routes: Routes = [{ path: '', component: UserContainerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
