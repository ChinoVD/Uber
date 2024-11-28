import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnDesarrolloPageRoutingModule } from './en-desarrollo-routing.module';

import { EnDesarrolloPage } from './en-desarrollo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EnDesarrolloPageRoutingModule
  ],
  declarations: [EnDesarrolloPage]
})
export class EnDesarrolloPageModule {}
