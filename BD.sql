

use sys


create table data(
	id integer not null auto_increment primary key,
	filtro1 float, 
	filtro2 float,
	humedad float,
	cantidadAgua float,
	fecha datetime default current_timestamp
)
drop table data


select * from data


insert into data(filtro1, filtro2, humedad, cantidadAgua) values('1','2','3','4');












select * from data order by fecha DESC 


