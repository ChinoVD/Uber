import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  
  {
    path: 'ajustes',
    loadChildren: () => import('./ajustes/ajustes.module').then( m => m.AjustesPageModule)
  },
  {
    path: 'crear-cuenta',
    loadChildren: () => import('./crear-cuenta/crear-cuenta.module').then( m => m.CrearCuentaPageModule)
  },
  
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: 'administrador',
    loadChildren: () => import('./administrador/administrador.module').then( m => m.AdministradorPageModule)
  },  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path: 'espera-conductor',
    loadChildren: () => import('./espera-conductor/espera-conductor.module').then( m => m.EsperaConductorPageModule)
  },
  {
    path: 'en-desarrollo',
    loadChildren: () => import('./en-desarrollo/en-desarrollo.module').then( m => m.EnDesarrolloPageModule)
  },
  {
    path: 'recuperar-password',
    loadChildren: () => import('./recuperar-password/recuperar-password.module').then( m => m.RecuperarPasswordPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
