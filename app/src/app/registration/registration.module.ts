import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPageRoutingModule } from './registration-routing.module';

import { RegistrationPage } from './registration.page';
import { CoreModule } from '../core/core.module';
import { AuthService } from '../core/services/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [RegistrationPage],
  providers: [AuthService],
})
export class RegistrationPageModule {}
