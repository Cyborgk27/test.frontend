import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing-module';
import { ListAccounts } from './pages/list-accounts/list-accounts';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../shared/shared-module";
import { CreateOrEditAccount } from './create-or-edit/create-or-edit';

@NgModule({
  declarations: [CreateOrEditAccount, ListAccounts],
  imports: [CommonModule, AccountsRoutingModule, ReactiveFormsModule, SharedModule],
})
export class AccountsModule {}
