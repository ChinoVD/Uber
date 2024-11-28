import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  historial: any[] = []; // Array que almacenará los viajes

  constructor() { }

  ngOnInit() {
  // Llamar a la función para obtener el historial al cargar la página
  this.obtenerHistorialUsuario();
}

  // Método para obtener el historial del usuario desde el localStorage
  obtenerHistorialUsuario() {
    const idUsuarioActual = localStorage.getItem('idUsuarioActual'); // Obtener ID del usuario actual
    
    if (idUsuarioActual) {
      // Obtener los usuarios del localStorage
      const usuarioGuardado = localStorage.getItem('usuarios');
      if (usuarioGuardado) {
        const usuarios = JSON.parse(usuarioGuardado);
        const usuarioActual = usuarios.find((user: any) => user.id.toString() === idUsuarioActual);
    
        if (usuarioActual && usuarioActual.historial) {
          this.historial = usuarioActual.historial; // Asignar el historial al array
          console.log("Historial de viajes:", this.historial); // Verificar en consola
        } else {
          console.log("No se encontró historial para el usuario o el usuario no tiene viajes recientes.");
        }
      }
    } else {
      console.log("No hay sesión activa o no se ha guardado un usuario.");
    }
  }

  // Método para formatear el precio
  formatoPrecio(precio: number): string {
    return Math.round(precio).toLocaleString('es-CL'); // Formato para Chile con separador de miles
  }
}
