import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import {MaterialModule} from '../shared/material/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { SignupOptionsComponent } from './signup-options/signup-options.component';

@NgModule({
  declarations: [
      SignupComponent,
      SignupOptionsComponent
  ],
  imports: [
      CommonModule,
      AuthRoutingModule,
      MaterialModule,
      FormsModule,
      FlexLayoutModule

  ]
})
export class AuthModule { }
