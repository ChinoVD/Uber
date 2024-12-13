import { Component, OnInit } from '@angular/core';
import { AnimationController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-espera-conductor',
  templateUrl: './espera-conductor.page.html',
  styleUrls: ['./espera-conductor.page.scss'],
})
export class EsperaConductorPage implements OnInit {
  mensaje: string = "Esperando a que el conductor llegue...";
  imagenVisible: boolean = false;

  constructor(private navCtrl: NavController, private animationCtrl: AnimationController) { }

  ngOnInit() {
    // Simulamos la espera de 3 segundos antes de confirmar que el conductor ha llegado
    setTimeout(() => {
      this.mensaje = "¡El conductor está en camino! El viaje comenzará en breve.";

      // Simulamos un retraso en la llegada del conductor
      setTimeout(() => {
        this.mensaje = "¡Conductor llegado! El viaje ha comenzado.";
      }, 2000); // Espera adicional de 3 segundos antes de mostrar que el viaje comenzó
    }, 3000); // Espera inicial de 3 segundos

    setTimeout(() => {
    this.mostrarImagen();
    }, 2000);
  }

  volver() {
    this.navCtrl.back();
  }

 

  mostrarImagen() {
    this.imagenVisible = true;

    const auto = {
      id: 'auto',
      from: 'translate(0, -20vw)',  // Comienza fuera de la pantalla hacia la derecha
      to: 'translate(67vw, -20vw)'         // Termina en el centro de la pantalla
    };

    const autoElement = document.querySelector(`#${auto.id}`);
    if (autoElement) {
      this.animationCtrl.create()
        .addElement(autoElement)
        .duration(3000)
        .fromTo("transform", auto.from, auto.to)
        .play();
    }

    setTimeout(() => {
      this.imagenVisible = false;
    }, 3000);
  }
}
