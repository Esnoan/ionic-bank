import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () =>
          import('./components/tab-account/tab-account.module').then(
            (m) => m.Tab1PageModule
          ),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('./components/tab-user/tab-user.module').then(
            (m) => m.Tab3PageModule
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
