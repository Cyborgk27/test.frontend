import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovementsRoutingModule } from './movements-routing-module';
import { CreateOrEdit } from './create-or-edit/create-or-edit';
import { ListMovements } from './pages/list-movements/list-movements';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared-module';

@NgModule({
  declarations: [CreateOrEdit, ListMovements],
  imports: [CommonModule, MovementsRoutingModule, ReactiveFormsModule, SharedModule, FormsModule],
})
export class MovementsModule {}
