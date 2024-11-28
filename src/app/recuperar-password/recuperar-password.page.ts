import { Component, OnInit } from '@angular/core';
import { ApiRecuperarPswService } from '../Servicios_Internos/Api/api-recuperar-psw.service';
import { ToastController, AlertController, AnimationController } from '@ionic/angular';
import { Router } from '@angular/router';

// Interfaz para representar a un usuario
interface Usuario {
  usuario: string;
  password: string;
  email: string;
}

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {
  // Variables para los datos de recuperación
  email: string = '';         // Almacena el correo electrónico ingresado
  nombre: string = '';        // Almacena el nombre del usuario
  password: string = '';      // Almacena la nueva contraseña
  app: string = 'UBER_UWU';   // Almacena el nombre de la app
  clave: string = '';         // Almacena la nueva contraseña (agregada)

  constructor(
    private apiRecuperarPsw: ApiRecuperarPswService, // Servicio de API para la recuperación de contraseña
    private alerta: AlertController,                // Para mostrar alertas
    private router: Router,                         // Para redireccionar
    private anim: AnimationController               // Controlador de animaciones
  ) {}

  ngOnInit(): void {
    // Lógica de inicialización, si es necesaria
  }

  /**
   * Envía la solicitud de recuperación de contraseña.
   */
  recuperarPassword(): void {  // Método agregado para la acción del botón
    const usuarioGuardado = this.obtenerUsuarioPorEmail(this.email); // Busca el usuario por el email

    if (usuarioGuardado && usuarioGuardado.usuario === this.nombre) {
      const solicitud = {
        nombre: this.nombre,
        app: this.app,
        email: this.email,
        clave: this.clave, // Usar 'clave' aquí
      };

      // Envía la solicitud a la API
      this.apiRecuperarPsw.enviarCorreoRecuperacion(solicitud).subscribe({
        next: (response: any) => {
          this.mostrarAlerta('Éxito', 'Correo de recuperación enviado correctamente.');
          this.guardarNuevaContraseña(this.clave); // Guarda la nueva contraseña localmente
          this.router.navigate(['/login'],{replaceUrl: true}); // Redirige al login
        },
        error: (err: any) => {
          this.mostrarAlerta('Error', 'Hubo un problema al enviar el correo. Inténtalo de nuevo más tarde.');
        },
      });
    } else {
      this.mostrarAlerta('Error', 'El nombre de usuario o el correo no coinciden.');
    }
  }

  /**
   * Busca un usuario en el almacenamiento local por su correo.
   * @param email - Correo del usuario
   * @returns El usuario encontrado o null si no existe
   */
  obtenerUsuarioPorEmail(email: string): Usuario | null {
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    return usuarios.find((user) => user.email === email) || null;
  }

  /**
   * Guarda la nueva contraseña del usuario en el almacenamiento local.
   * @param nuevaContraseña - Nueva contraseña del usuario
   */
  guardarNuevaContraseña(nuevaContraseña: string): void {
    const usuarios: Usuario[] = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioIndex = usuarios.findIndex((user) => user.email === this.email);

    if (usuarioIndex !== -1) {
      usuarios[usuarioIndex].password = nuevaContraseña; // Actualiza la contraseña
      localStorage.setItem('usuarios', JSON.stringify(usuarios)); // Guarda el array actualizado
    }
  }

  /**
   * Muestra una alerta al usuario.
   * @param header - Encabezado de la alerta
   * @param message - Mensaje de la alerta
   */
  async mostrarAlerta(header: string, message: string): Promise<void> {
    const alert = await this.alerta.create({
      header,
      message,
      buttons: ['Aceptar'],
    });
    await alert.present();
  }

  /**
   * Redirige al usuario a la página de login.
   */
  volverAlLogin(): void {
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  animarError(inputId: string) {
    const inputElement = document.getElementById(inputId);

    if (inputElement) {
      this.anim.create()
        .addElement(inputElement)
        .duration(300)
        .iterations(3)
        .keyframes([
          { offset: 0, border: '1px transparent solid', transform: 'translateX(0px)' },
          { offset: 0.25, border: '1px red solid', transform: 'translateX(-5px)' },
          { offset: 0.5, border: '1px transparent solid', transform: 'translateX(0px)' },
          { offset: 0.75, border: '1px red solid', transform: 'translateX(5px)' },
          { offset: 1, border: '1px transparent solid', transform: 'translateX(0px)' },
        ])
        .play();
    }
  }

  salir() {
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  
}
