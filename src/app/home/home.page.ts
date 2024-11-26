import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Variables generales
  selector: string = 'viajes';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Navega a la página del mapa.
   */
  abrirMapa(): void {
    this.router.navigate(['/mapa']); // Ajusta la ruta según tu configuración
  }
}
