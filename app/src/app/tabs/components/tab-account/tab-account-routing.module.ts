import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabAccountPage } from './tab-account.page';

const routes: Routes = [
  {
    path: '',
    component: TabAccountPage,
  },
  {
    path: 'new',
    loadChildren: () => import('./components/new/new.module').then( m => m.NewPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAccountPageRoutingModule {}
