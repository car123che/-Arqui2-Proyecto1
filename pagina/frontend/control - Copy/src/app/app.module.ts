import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SuciedadAntesComponent } from './components/suciedad-antes/suciedad-antes.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HumedadComponent } from './components/humedad/humedad.component';
import { CantidadAguaComponent } from './components/cantidad-agua/cantidad-agua.component';
import { SuciedadDespuesComponent } from './components/suciedad-despues/suciedad-despues.component';
import { TiempoComponent } from './components/tiempo/tiempo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    ReportesComponent,
    DashboardComponent,
    SuciedadAntesComponent,
    NavbarComponent,
    HumedadComponent,
    CantidadAguaComponent,
    SuciedadDespuesComponent,
    TiempoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
