import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListMovements } from './pages/list-movements/list-movements';

const routes: Routes = [
    {
      path: '',
      redirectTo: 'list-movements',
      pathMatch: 'full'
    },
    {
      path: 'list-movements',
      component: ListMovements
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementsRoutingModule {}
