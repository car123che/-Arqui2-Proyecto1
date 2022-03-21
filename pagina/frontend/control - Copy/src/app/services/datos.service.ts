import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  public path: String = 'http://34.125.166.156:9000';
  constructor(public httpClient: HttpClient) { 
  }

  get_suciedad_antes(): Observable<any> {
    return this.httpClient.get(this.path + '/suciedad/antes');
  }

  get_humedad_suelo(): Observable<any>{
    return this.httpClient.get(this.path + '/humedad/suelo');
  }

  get_cantidad_agua(): Observable<any>{
    return this.httpClient.get(this.path + '/cantidad/agua');
  }

  get_sueciedad_despues(): Observable<any>{
    return this.httpClient.get(this.path + '/suciedad/despues');
  }

  get_tiempo_agua(): Observable<any>{
    return this.httpClient.get(this.path + '/tiempo/agua');
  }

  get_datos_tiempo_real(): Observable<any>{
    return this.httpClient.get(this.path + '/datos/tiempo-real');
  }
}
