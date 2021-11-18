import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TabUserPage } from './tab-user.page';

import { TabUserPageRoutingModule } from './tab-user-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, TabUserPageRoutingModule],
  declarations: [TabUserPage],
})
export class Tab3PageModule {}
