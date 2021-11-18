import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { LoginPage } from './login.page';
import { CoreModule } from '../core/core.module';
import { AuthService } from '../core/services/auth/auth.service';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    LoginPageRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [LoginPage],
  providers: [AuthService],
})
export class LoginPageModule {}
