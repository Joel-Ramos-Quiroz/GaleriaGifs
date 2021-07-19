import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent  {

  get historial(){
    return this.servicio.historial;
  }

  constructor(private servicio: GifsService){};

  buscar(item: string) {
    //console.log(this.nuevo);
    //this.onNuevoPersonaje.emit(this.nuevo);
    this.servicio.buscarGifs(item);
  }
}
