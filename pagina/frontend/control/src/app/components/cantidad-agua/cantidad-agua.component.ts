import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-cantidad-agua',
  templateUrl: './cantidad-agua.component.html',
  styleUrls: ['./cantidad-agua.component.css']
})
export class CantidadAguaComponent implements OnInit {

  datosAgua:any = [];

  // options
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tiempo';
  yAxisLabel: string = 'Volumen Agua (cm^3)';
  timeline: boolean = true;
  view:any = [500, 300]
  barChartcustomColors = 
 [
   { name: "2019", value: '#4A830E' },
   { name: "2020", value: '#4A830E' },
   { name: "2021", value: '#4A830E' },
   { name: "2022", value: '#4A830E' },
 ];

  constructor(private aguaService:DatosService) { }

  ngOnInit(): void {
    this.getAguaNivel();
    this.llenarAgua_tiempoReal();
  }
 
  llenarAgua_tiempoReal()
  {
    setInterval( () => {
      this.getAguaNivel();
    }, 10000)
  }

  getAguaNivel(){
    this.aguaService.get_cantidad_agua().subscribe(res => {
      let respuesta = res;
      if (respuesta.codigo ==  "4"){ //fallo peticion
        this.datosAgua = [];
      }else{ //peticion exitosa
        this.vaciardatosAgua();
        this.datosAgua = respuesta.mensaje;
        //console.log(this.datosSuciedad);
      }
    });
  }

  vaciardatosAgua(){
    if(this.datosAgua.length > 1000){
      this.datosAgua = [];
    }
  }

  onSelect(data:any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data:any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data:any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
