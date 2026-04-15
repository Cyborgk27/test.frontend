import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListClients } from './pages/list-clients/list-clients';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'list-clients',
      pathMatch: 'full'
    },
    {
      path: 'list-clients',
      component: ListClients
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
