import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRestService } from '../Servicios_Internos/Api/api-rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  // Variables generales
  grupo: string = 'Chino_Claudio';
  selector: string = 'viajes'; // Esto se puede cambiar dependiendo de la lógica de navegación
  productos: any[] = [];

  constructor(private router: Router, private api: ApiRestService) {}

  ngOnInit(): void {
    // Obtener productos iniciales al cargar la página
    this.obtenerProductos(this.selector);
  }

  /**
   * Navega a la página del mapa.
   */
  abrirMapa(): void {
    this.router.navigate(['/mapa']); // Ajusta la ruta según tu configuración
  }

  /**
   * Obtiene los productos según el selector actual.
   * @param selector - El valor del segmento seleccionado.
   */
  obtenerProductos(selector: string): void {
    this.api.traerProductosPorGrupo(this.grupo).subscribe(
      (data: any) => {
        console.log('Respuesta de la API', data);
        this.productos = Array.isArray(data) ? data : [];
      },
      (error: any) => {
        console.error('Error al traer los productos', error);
      }
    );
  }

  /**
   * Maneja el cambio del segmento y actualiza los productos.
   * @param event - Evento del cambio de segmento.
   */
  onSegmentChange(event: any): void {
    this.obtenerProductos(event.detail.value);
  }

  /**
   * Redirige al delivery cuando se hace clic en la opción correspondiente.
   */
  irADelivery(): void {
    // Redirige a la página Home con el parámetro "delivery"
    this.router.navigate(['/tabs/home'], { queryParams: { section: 'delivery' } });
  }

  redirigirEnDesarrollo() {
    this.router.navigate(['/en-desarrollo']);
  }
}
