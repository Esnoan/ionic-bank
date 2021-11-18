import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AutoLoginGuard } from './guards/auto-login.guard';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [AuthGuard, AutoLoginGuard],
})
export class CoreModule {}
