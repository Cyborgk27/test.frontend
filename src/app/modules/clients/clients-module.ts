import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing-module';
import { CreateOrEdit } from './create-or-edit/create-or-edit';
import { ListClients } from './pages/list-clients/list-clients';
import { SharedModule } from '../../shared/shared-module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CreateOrEdit, ListClients],
  imports: [CommonModule, ClientsRoutingModule, SharedModule, ReactiveFormsModule],
})
export class ClientsModule {}
