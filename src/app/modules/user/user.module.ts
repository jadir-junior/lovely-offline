import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { UserContainerComponent } from './user-container.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [UserContainerComponent],
  imports: [UserRoutingModule, SharedModule],
})
export class UserModule {}
