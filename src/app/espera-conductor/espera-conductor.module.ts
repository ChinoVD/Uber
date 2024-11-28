import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EsperaConductorPageRoutingModule } from './espera-conductor-routing.module';

import { EsperaConductorPage } from './espera-conductor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EsperaConductorPageRoutingModule
  ],
  declarations: [EsperaConductorPage]
})
export class EsperaConductorPageModule {}
