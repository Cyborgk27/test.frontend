import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full'
  },
  {
    path: 'clients',
    loadChildren: () => import('./modules/clients/clients-module')
      .then(m => m.ClientsModule)
  },
  {
    path: 'accounts',
    loadChildren: () => import('./modules/accounts/accounts-module')
      .then(m => m.AccountsModule)
  },
  {
    path: 'movements',
    loadChildren: () => import('./modules/movements/movements-module')
      .then(m => m.MovementsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
