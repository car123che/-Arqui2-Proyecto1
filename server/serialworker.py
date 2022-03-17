
import serial
import time
import multiprocessing
from conexion import executeInsert

## Change this to match your local settings
# SERIAL_PORT = '/dev/ttyACM0'
SERIAL_PORT = '/dev/ttyACM0'
SERIAL_BAUDRATE = 9600


class SerialProcess(multiprocessing.Process):
 
    def __init__(self, input_queue, output_queue):
        multiprocessing.Process.__init__(self)
        self.input_queue = input_queue
        self.output_queue = output_queue
        self.sp = serial.Serial(SERIAL_PORT, SERIAL_BAUDRATE, timeout=1)
 
    def close(self):
        self.sp.close()
 
    def writeSerial(self, data):
        self.sp.write(data)
        # time.sleep(1)
        
    def readSerial(self):
        return self.sp.readline()
 
    def run(self):
        self.sp.flushInput()
        while True:
            # look for incoming tornado request
            if not self.input_queue.empty():
                data = self.input_queue.get()
 
                # send it to the serial device
                self.writeSerial(data)
                print ("writing to serial: " + data)
 
            # look for incoming serial data
            if (self.sp.inWaiting() > 0):
                data = self.readSerial()
                data = data.decode('utf-8')
                print (data)
                #split la entrada aqui y llamar a executeInsert
                datos = data.replace('\r', '').replace('\n', '').split(',')
                print(datos)
                
                
                query = f"INSERT INTO data(filtro1, filtro2, humedad, cantidadAgua) values({datos[0]}, {datos[1]}, {datos[2]}, {datos[3]})" # llenar el query
                result = executeInsert(query)
                # send it back to tornado
                self.output_queue.put(data)
