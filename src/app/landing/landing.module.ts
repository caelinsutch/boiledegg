import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule} from './landing-routing.module';

import { LandingComponent } from './landing.component';
import { FirstPageComponent } from './first-page/first-page.component';
import {MaterialModule} from '../shared/material/material.module';
import { SecondPageComponent } from './second-page/second-page.component';
import { ThirdPageComponent } from './third-page/third-page.component';
import { FourthPageComponent } from './fourth-page/fourth-page.component';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    MaterialModule
  ],
  declarations: [
    LandingComponent,
    FirstPageComponent,
    SecondPageComponent,
    ThirdPageComponent,
    FourthPageComponent
  ]
})
export class LandingModule { }
