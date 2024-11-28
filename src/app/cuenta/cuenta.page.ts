import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.page.html',
  styleUrls: ['./cuenta.page.scss'],
})
export class CuentaPage implements OnInit {
  nombre: string = '';

  constructor(private routing: Router) {}

  ngOnInit() {
    this.obtenerDatosUsuario();
  }

  obtenerDatosUsuario() {
    const usuarioGuardado = localStorage.getItem('usuarios');
    const idUsuarioActual = localStorage.getItem('idUsuarioActual');

    if (usuarioGuardado && idUsuarioActual) {
      const usuarios = JSON.parse(usuarioGuardado);
      const usuarioActual = usuarios.find((user: any) => user.id.toString() === idUsuarioActual);

      if (usuarioActual) {
        this.nombre = usuarioActual.usuario || '';
      } else {
        console.log("Usuario no encontrado.");
      }
    } else {
      console.log("No hay usuarios guardados o no hay sesión activa.");
    }
  }

  navegarAjustes() {
    this.routing.navigate(['/ajustes'], { replaceUrl: true });
  }

  activarCupon() {
    let viajesGratis = JSON.parse(localStorage.getItem('viajesGratis') || '0');

    if (viajesGratis < 3) {
      viajesGratis += 1;
      localStorage.setItem('viajesGratis', JSON.stringify(viajesGratis));
      localStorage.setItem('precioPorKilometro', '0');

      alert(`¡Disfruta de tu ${viajesGratis}° viaje gratis!`);
    }
  }

  irHistorial() {
    this.routing.navigate(['/tabs/historial'], { replaceUrl: true });
  }

  registrarTarjeta() {
    this.routing.navigate(['/ajustes'], { replaceUrl: true });
  }

}
