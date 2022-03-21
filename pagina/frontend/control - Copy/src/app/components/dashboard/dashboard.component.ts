import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  // cantidades
  claridad_filtro1:number = 0;
  claridad_filtro2:number = 0;
  cantidad_agua:number = 0;
  humedad_jardin:number = 0;
  // fechas
  fecha:string = '';
 

  constructor(private datosService: DatosService) { }

  ngOnInit(): void {
    this.cargarDatos();
    this.cargarDatosTiempoReal();
  }

  cargarDatosTiempoReal(){
    setInterval( () => {
      this.cargarDatos();
    }, 10000);
  }

  cargarDatos(){
    this.datosService.get_datos_tiempo_real().subscribe( res => {
      let respuesta = res;
      if (respuesta.codigo ==  "4"){ //fallo peticion
        // cantidades
        this.claridad_filtro1 = 0;
        this.claridad_filtro2 = 0;
        this.cantidad_agua = 0;
        this.humedad_jardin = 0;
        // fechas
        this.fecha = 'Sin información';
      }else{ //peticion exitosa
        // cantidades
        this.claridad_filtro1 = respuesta.mensaje.filtro1;
        this.claridad_filtro2 = respuesta.mensaje.filtro2;
        this.cantidad_agua = respuesta.mensaje.humedad;
        this.humedad_jardin = respuesta.mensaje.cantidadAgua;
        // fechas
        this.fecha = respuesta.mensaje.fecha;
      }
    });
    
  }
 
  
}
