import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListAccounts } from './pages/list-accounts/list-accounts';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list-accounts',
    pathMatch: 'full'
  },
  {
    path: 'list-accounts',
    component: ListAccounts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountsRoutingModule {}
