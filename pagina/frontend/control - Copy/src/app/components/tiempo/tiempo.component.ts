import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-tiempo',
  templateUrl: './tiempo.component.html',
  styleUrls: ['./tiempo.component.css']
})
export class TiempoComponent implements OnInit {

  minimo:any = '';
  maximo:any = '';
  fecha_minimo:any = '';
  fecha_maximo:any = '';
  diferencia_tiempo:number =0;

  constructor(private tiempoAguaService:DatosService) { }

  ngOnInit(): void {
    this.getTiempoAgua();
    this.getTiempoAguaTiempoReal();
  }

  getTiempoAguaTiempoReal(){
    //this.getTiempoAgua();
    //this.getTiempoAguaTiempoReal();
  }

  getTiempoAgua(){
    this.tiempoAguaService.get_tiempo_agua().subscribe(res=>{
      let resultado = res;
      if (resultado.codigo ==  "4"){ //fallo peticion
        this.minimo = 0;
        this.maximo = 0;
        this.fecha_minimo = 'Sin datos';
        this.fecha_maximo = 'Sin datos';
        this.diferencia_tiempo = 0;
      }else{ //peticion exitosa
        this.minimo = resultado.mensaje.min;
        this.maximo = resultado.mensaje.max;
        this.fecha_minimo = resultado.mensaje.fecha_min;
        this.fecha_maximo = resultado.mensaje.fecha_max;
        this.diferencia_tiempo = resultado.mensaje.minutos;
      }
    });
  }

}
