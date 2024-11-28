import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.page.html',
  styleUrls: ['./servicios.page.scss'],
})
export class ServiciosPage implements OnInit {
  selector: string = ''; // Aunque no se usa aquí, puede eliminarse si es innecesario
  imagenVisible: boolean = false; // Controla la visibilidad de la imagen

  constructor(
    private router: Router,
    private animationCtrl: AnimationController
  ) {}

  ngOnInit() {}

  // Método para redirigir a la página de "en desarrollo"
  redirigirEnDesarrollo() {
    this.router.navigate(['/en-desarrollo']);
  }

  // Método para abrir el mapa
  abrirMapa(): void {
    this.router.navigate(['/mapa']); // Ajusta la ruta si "mapa" tiene un prefijo o pertenece a tabs
  }

  // Método para redirigir al Delivery
  irADelivery(): void {
    this.router.navigate(['/tabs/home'], { replaceUrl: true });
  }

  // Método para mostrar la animación de fantasmas
  mostrarImagen() {
    this.imagenVisible = true;

    const fantasmas = [
      { id: 'fantasma1', from: 'translate(0px, 100px)', to: 'translate(0px, -950px)' }, // Sin desplazamiento horizontal
      { id: 'fantasma2', from: 'translate(-50px, 0px)', to: 'translate(-50px, -850px)' }, // Desplazado a la izquierda
      { id: 'fantasma3', from: 'translate(50px, 0px)', to: 'translate(50px, -750px)' }   // Desplazado a la derecha
    ];

    // Aplicar la animación a los elementos
    fantasmas.forEach(fantasma => {
      const fantasmaElement = document.querySelector(`#${fantasma.id}`);
      if (fantasmaElement) {
        this.animationCtrl.create()
          .addElement(fantasmaElement)
          .duration(5000) // Duración de la animación en milisegundos
          .fromTo("transform", fantasma.from, fantasma.to)
          .play();
      }
    });

    // Ocultar las imágenes después de 5 segundos
    setTimeout(() => {
      this.imagenVisible = false;
    }, 5000);
  }
}
