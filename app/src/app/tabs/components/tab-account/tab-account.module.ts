import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabAccountPage } from './tab-account.page';

import { TabAccountPageRoutingModule } from './tab-account-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabAccountPageRoutingModule,
  ],
  declarations: [TabAccountPage],
})
export class Tab1PageModule {}
