/* Photocell reading program */
#include "DHT.h"
#include "MQ135.h"
// Constants
#define DELAY 2000 // Delay between two measurements in ms
#define VIN 5 // V power voltage
#define R 10000 //ohm resistance value
  //co2
#define ANALOGPIN A2    // CO2
//#define RZERO 206.85
#define DHTTYPE DHT11


MQ135 gasSensor = MQ135(ANALOGPIN);

// PINES
const int pinSensorFiltroAgua1 = A0;//  SENSOR DE LUZ PASTILLAS
const int pinSensorFiltroAgua2 = A1;//  SENSOR DE LUZ PASTILLAS
const int pinSensorDHT = 5; //  CUADRITO CELESTE
const int pinSensorTemperaturaInterna = A1; //  TEMPERATURA CUADRITO NEGRO

//  VALORES DE SALIDA - SENSORES
float valorFinalFiltroAgua1;
float valorFinalFiltroAgua2;
float valorFinalHumedad;
float valorFinalCantidadAgua;




String buffer = "";
DHT dht(pinSensorDHT, DHTTYPE);


void setup(void) {
  Serial.begin(9600);
  dht.begin();

  
  float rzero = gasSensor.getRZero();
  delay(5000);
}


void loop(void) {
  delay(DELAY);
  buffer = "";
  
  valorFinalFiltroAgua1=sensorRawToPhys(analogRead(pinSensorFiltroAgua1));
  valorFinalFiltroAgua2=sensorRawToPhys(analogRead(pinSensorFiltroAgua2));
  valorFinalHumedad = dht.readHumidity();
  
  
    /*
     * filtro1 , filtro2 , humedad
    */
    buffer = String(valorFinalFiltroAgua1) + "," + String(valorFinalFiltroAgua2) +","+String(valorFinalHumedad, 2) + "," + String(valorFinalCantidadAgua,2);
    Serial.println(buffer);
  
  
}



int sensorRawToPhys(int raw){
  // Conversion rule
  float Vout = float(raw) * (VIN / float(1023));// Conversion analog to voltage
  float RLDR = (R * (VIN - Vout))/Vout; // Conversion voltage to resistance
  int phys=500/(RLDR/1000); // Conversion resitance to lumen
  return phys;
}
