import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage {
  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;
  public map: any;
  public start: string = ''; // Campo de origen
  public end: string = ''; // Campo de destino
  public directionsService: any;
  public directionsDisplay: any;
  precio: number = 300; // Almacena el precio calculado
  carrito: any[] = [];
  input = '';
  autocompleteItems: any[] = [];
  distancia = '';
  duracion = '';
  precioFormateado: string = ''; // Almacena el precio formateado

  constructor(
    private platform: Platform,
    private zone: NgZone,
    private alerta: AlertController,
    private router: Router
  ) {}

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.setCurrentLocation(); // Establecer la ubicación actual como origen
      this.initMap();
    });
  }

  /**
   * Establece la ubicación actual del usuario y la convierte a una dirección.
   */
  setCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          const geocoder = new google.maps.Geocoder();
          const latlng = { lat, lng };

          geocoder.geocode({ location: latlng }, (results: any, status: string) => {
            if (status === 'OK' && results[0]) {
              this.zone.run(() => {
                this.start = results[0].formatted_address; // Dirección legible
              });
            } else {
              console.error('Error obteniendo la dirección: ', status);
            }
          });
        },
        (error) => {
          console.error('Error obteniendo la ubicación: ', error);
        }
      );
    } else {
      console.error('Geolocalización no está soportada en este navegador.');
    }
  }

  /**
   * Inicializa el mapa.
   */
  initMap() {
    this.directionsService = new google.maps.DirectionsService();
    this.directionsDisplay = new google.maps.DirectionsRenderer();

    const mapOptions = {
      zoom: 5,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    this.map = new google.maps.Map(this.mapElement?.nativeElement, mapOptions);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        new google.maps.InfoWindow({
          content: 'Estás aquí.',
          position: pos,
        }).open(this.map);

        this.map.setCenter(pos);
      });
    }

    this.directionsDisplay.setMap(this.map);
  }

  /**
   * Calcula y muestra la ruta en el mapa.
   */
  calculateAndDisplayRoute() {
    this.directionsService.route(
      {
        origin: this.start,
        destination: this.end,
        travelMode: 'DRIVING',
      },
      (response: any, status: string) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          const leg = response.routes[0].legs[0];

          // Distancia en kilómetros
          const distanciaKm = leg.distance.value / 1000;
          this.distancia = `${distanciaKm.toFixed(2)} km`;

          // Tiempo en minutos y segundos
          const minutos = Math.floor(leg.duration.value / 60);
          const segundos = leg.duration.value % 60;
          this.duracion = `${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

          // Calcular precio
          this.precio = this.calcularPrecio(distanciaKm);

          // Formatear el precio
          this.precioFormateado = this.formatoPrecio(this.precio); // Usar el nuevo formato aquí
        }
      }
    );
  }

  /**
   * Actualiza los resultados para autocompletado.
   */
  updateSearchResults(type: 'start' | 'end') {
    const GoogleAutocomplete = new google.maps.places.AutocompleteService();
    const input = type === 'start' ? this.start : this.end;

    if (input === '') {
      this.autocompleteItems = [];
      return;
    }

    GoogleAutocomplete.getPlacePredictions({ input }, (predictions: any) => {
      this.zone.run(() => {
        this.autocompleteItems = predictions || [];
      });
    });
  }

  /**
   * Selecciona un resultado de búsqueda.
   */
  selectSearchResult(item: any) {
    if (this.autocompleteItems.length > 0) {
      this.end = item.description;
      this.autocompleteItems = [];
      this.calculateAndDisplayRoute();
    }
  }

  /**
   * Calcula el precio según la distancia.
   * @param distanciaKm Distancia recorrida en kilómetros.
   * @returns Precio calculado.
   */
  calcularPrecio(distanciaKm: number): number {
    const precioPorKilometro = 300; // Precio por kilómetro
    return distanciaKm * precioPorKilometro;
  }

  /**
   * Muestra la alerta con los detalles del viaje.
   */
  async mostrarDetalles() {
    const mensaje = `Distancia: ${this.distancia} \nGasto Total: $${this.formatoPrecio(this.precio)} \nTiempo estimado: ${this.formatoTiempo(this.duracion)}`;
    await this.mostrarAlerta(mensaje);
  }

  /**
   * Muestra una alerta con el texto proporcionado.
   * @param text Texto a mostrar en la alerta.
   * @param accion Acción a ejecutar al hacer clic en el botón de la alerta.
   */
  async mostrarAlerta(text: string, accion?: () => void) {
    const alert = await this.alerta.create({
      header: 'Información del Viaje',
      message: text,
      buttons: [{
        text: 'Solicitar Viaje', 
        handler: () => {
          // Llamamos a la acción (redirigimos a la página de espera)
          this.router.navigate(['/espera-conductor'],{ replaceUrl: true });
        }
      }]
    });
    alert.present();
  }

  // Método para formatear el precio
  formatoPrecio(precio: number): string {
    // Redondear el precio y formatearlo con separadores de miles
    return Math.round(precio).toLocaleString('es-CL'); // Formato para Chile con separador de miles
  }

  // Método para formatear el tiempo (minutos a horas o minutos)
  formatoTiempo(duracion: string): string {
    let [minutos, segundos] = duracion.split(':').map(Number);

    if (minutos >= 60) {
      // Si es mayor a 60 minutos, calcular las horas y los minutos restantes
      let horas = Math.floor(minutos / 60);
      minutos = minutos % 60;

      return `${horas} horas ${minutos.toString().padStart(2, '0')} minutos`;
    } else {
      // Si es menor a 60 minutos, solo mostrar minutos
      return `${minutos} minutos`;
    }
  }
  
  finalizarViaje() {
    // Obtener el id del usuario actual desde el localStorage
    const idUsuarioActual = localStorage.getItem('idUsuarioActual');
    
    if (idUsuarioActual) {
      // Obtener la lista de usuarios del localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      
      // Encontrar el usuario actual en la lista de usuarios
      const usuarioActual = usuarios.find((user: any) => user.id.toString() === idUsuarioActual);
  
      if (usuarioActual) {
        // Crear el objeto de viaje con la información del viaje
        const viaje = {
          start: this.start,
          end: this.end,
          precio: this.precio,
          distancia: this.distancia,
          fecha: new Date().toLocaleString() // Guarda la fecha y hora actual
        };
  
        // Si el usuario ya tiene historial, agregar el nuevo viaje
        const historial = usuarioActual.historial || []; // Si no tiene historial, crear uno vacío
        historial.push(viaje); // Agregar el nuevo viaje
  
        // Actualizar el historial del usuario
        usuarioActual.historial = historial;
  
        // Guardar la lista de usuarios actualizada en el localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        console.log("Historial actualizado para el usuario", usuarioActual);
      } else {
        console.log("No se encontró el usuario actual.");
      }
    } else {
      console.log("No hay sesión activa o el idUsuarioActual no está disponible.");
    }
  }
  

  
  
}
