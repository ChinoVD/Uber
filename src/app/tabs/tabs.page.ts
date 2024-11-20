import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    private router: Router
  ) {}

home(){
  this.router.navigate(['/tabs/home'], {replaceUrl: true});
}

servicios(){
  this.router.navigate(['/tabs/servicios'], {replaceUrl: true});
}
historial(){
  this.router.navigate(['/tabs/historial'], {replaceUrl: true});
}
cuenta(){
  this.router.navigate(['/tabs/cuenta'], {replaceUrl: true});
}

}
