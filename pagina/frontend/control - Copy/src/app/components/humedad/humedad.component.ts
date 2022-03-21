import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';

@Component({
  selector: 'app-humedad',
  templateUrl: './humedad.component.html',
  styleUrls: ['./humedad.component.css']
})
export class HumedadComponent implements OnInit {

  datosHumedad:any = [];

  // options
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tiempo';
  yAxisLabel: string = 'Porcentaje Humedad';
  timeline: boolean = true;
  view:any = [500, 300]
  barChartcustomColors = 
 [
   { name: "2019", value: '#febb00' },
   { name: "2020", value: '#1dd068' },
   { name: "2021", value: '#1dd068' },
   { name: "2022", value: '#febb00' },
 ];

  constructor(private datosHumedadService:DatosService) { }

  ngOnInit(): void {
    this.getHumedadAntes();
    this.llenarHumedad_tiempoReal();
  }

  llenarHumedad_tiempoReal()
  {
    setInterval( () => {
      this.getHumedadAntes();
    }, 10000)
  }

  getHumedadAntes(){
    this.datosHumedadService.get_humedad_suelo().subscribe(res => {
      let respuesta = res;
      if (respuesta.codigo ==  "4"){ //fallo peticion
        this.datosHumedad = [];
      }else{ //peticion exitosa
        this.vaciarDatosHumedad();
        this.datosHumedad = respuesta.mensaje;
        //console.log(this.datosSuciedad);
      }
    });
  }

  vaciarDatosHumedad(){
    if(this.datosHumedad.length > 1000){
      this.datosHumedad = [];
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
