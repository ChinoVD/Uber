import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { Platform } from '@ionic/angular';

declare var google: any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage {
  @ViewChild('map', { static: false }) mapElement: ElementRef | undefined;

  carrito: any[] = [];
  input = '';
  autocompleteItems: any[] = [];
  distancia = '';
  duracion = '';

  public map: any;
  public start: string = 'Duoc UC: Sede Melipilla - Serrano, Melipilla, Chile';
  public end: string = 'Pomaire';
  public directionsService: any;
  public directionsDisplay: any;

  constructor(private platform: Platform, private zone: NgZone) {}

  ionViewDidEnter() {
    this.platform.ready().then(() => {
      this.initMap();
    });
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
    this.calculateAndDisplayRoute();
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
          this.distancia = `${(leg.distance.value / 1000).toFixed(2)} km`;
          const minutos = Math.floor(leg.duration.value / 60);
          const segundos = leg.duration.value % 60;
          this.duracion = `${minutos.toString().padStart(2, '0')}:${segundos
            .toString()
            .padStart(2, '0')}`;
        } else {
          window.alert('Error al calcular la ruta: ' + status);
        }
      }
    );
  }

  /**
   * Actualiza resultados para autocompletado.
   */
  updateSearchResults() {
    const GoogleAutocomplete = new google.maps.places.AutocompleteService();
    if (this.end === '') {
      this.autocompleteItems = [];
      return;
    }

    GoogleAutocomplete.getPlacePredictions(
      { input: this.end },
      (predictions: any) => {
        this.zone.run(() => {
          this.autocompleteItems = predictions || [];
        });
      }
    );
  }

  /**
   * Selecciona un resultado de búsqueda.
   */
  selectSearchResult(item: any) {
    this.end = item.description;
    this.autocompleteItems = [];
    this.initMap();
  }
}
