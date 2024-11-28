import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EnDesarrolloPage } from './en-desarrollo.page';

const routes: Routes = [
  {
    path: '',
    component: EnDesarrolloPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EnDesarrolloPageRoutingModule {}
