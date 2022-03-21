import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/services/datos.service';


@Component({
  selector: 'app-suciedad-antes',
  templateUrl: './suciedad-antes.component.html',
  styleUrls: ['./suciedad-antes.component.css']
})
export class SuciedadAntesComponent implements OnInit {
  datosSuciedad:any = [];

  // options
  legend: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Tiempo';
  yAxisLabel: string = 'Porcentaje Claridad';
  timeline: boolean = true;
  view:any = [500, 300];
  barChartcustomColors = 
 [
   { name: "2019", value: '#000000' },
   { name: "2020", value: '#000000' },
   { name: "2021", value: '#000000' },
   { name: "2022", value: '#000000' },
 ];

  constructor(private datosServicio: DatosService) { }

  ngOnInit(): void {
    this.getSuciedadAntes();
    this.llenarSuciedad_tiempoReal();
  }

  llenarSuciedad_tiempoReal()
  {
    setInterval( () => {
      this.getSuciedadAntes();
    }, 10000)
  }


  getSuciedadAntes(){
    this.datosServicio.get_suciedad_antes().subscribe(res => {
      let respuesta = res;
      if (respuesta.codigo ==  "4"){ //fallo peticion
        this.datosSuciedad = [];
      }else{ //peticion exitosa
        this.vaciarDatosSuciedad();
        this.datosSuciedad = respuesta.mensaje;
        //console.log(this.datosSuciedad);
      }
    });
  }

  vaciarDatosSuciedad(){
    if(this.datosSuciedad.length > 1000){
      this.datosSuciedad = [];
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
 