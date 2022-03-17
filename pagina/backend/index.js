//imports
const mysql = require("mysql2");
const cors = require("cors");
const { promisify } = require("util");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

//settings
var app = express();
var port = 9000;
var corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(morgan("dev"));
app.listen(port);
console.log("Listening on port", port);

//db settings
const db_credentials = require("./db_credentials");
var conn = mysql.createPool(db_credentials);
conn.query = promisify(conn.query);

//API
app.get("/suciedad/antes", async (req, res) => {
  conn.query(
    `select  filtro1 as value, date_format(fecha, "%d-%m-%Y %H:%i") as name from data 
         order by fecha asc `,
    function (err, result) {
      if (err) {
        res.send({
          codigo: "4",
          mensaje: [
            {
              name: "error",
              series: [
                {
                  value: 0,
                  name: "2022-03-15T19:45:58.000Z",
                },
              ],
            },
          ],
        });
      } else {
        res.send({
          codigo: "1",
          mensaje: [
            {
              name: "Suciedad Antes del Filtro",
              series: result,
            },
          ],
        });
      }
    }
  );
});

app.get("/humedad/suelo", async (req, res) => {
  conn.query(
    `select  humedad as value, date_format(fecha, "%d-%m-%Y %H:%i") as name from data 
        order by fecha asc `,
    function (err, result) {
      if (err) {
        res.send({
          codigo: "4",
          mensaje: [
            {
              name: "error",
              series: [
                {
                  value: 0,
                  name: "2022-03-15T19:45:58.000Z",
                },
              ],
            },
          ],
        });
      } else {
        res.send({
          codigo: "1",
          mensaje: [
            {
              name: "Humedad en el suelo",
              series: result,
            },
          ],
        });
      }
    }
  );
});

app.get("/cantidad/agua", async (req, res) => {
  conn.query(
    `select  cantidadAgua as value, date_format(fecha, "%d-%m-%Y %H:%i") as name from data 
        order by fecha asc `,
    function (err, result) {
      if (err) {
        res.send({
          codigo: "4",
          mensaje: [
            {
              name: "error",
              series: [
                {
                  value: 0,
                  name: "2022-03-15T19:45:58.000Z",
                },
              ],
            },
          ],
        });
      } else {
        res.send({
          codigo: "1",
          mensaje: [
            {
              name: "Cantidad Agua vs Tiempo",
              series: result,
            },
          ],
        });
      }
    }
  );
});

app.get("/suciedad/despues", async (req, res) => {
  conn.query(
    `select  filtro2 as value, date_format(fecha, "%d-%m-%Y %H:%i") as name from data 
        order by fecha asc `,
    function (err, result) {
      if (err) {
        res.send({
          codigo: "4",
          mensaje: [
            {
              name: "error",
              series: [
                {
                  value: 0,
                  name: "2022-03-15T19:45:58.000Z",
                },
              ],
            },
          ],
        });
      } else {
        res.send({
          codigo: "1",
          mensaje: [
            {
              name: "Suciedad Despues del Filtro",
              series: result,
            },
          ],
        });
      }
    }
  );
});

app.get("/tiempo/agua", async (req, res) => {
  conn.query(
    `
        select minimos.min, minimos.fecha_min, maximos.max, maximos.fecha_max, 
         TIMESTAMPDIFF(minute, minimos.fecha_min, maximos.fecha_max) as minutos 
         from (
                        (select min(cantidadAgua) min, fecha  fecha_min 
                        from data group by fecha order by fecha asc limit 1) minimos,
                        (select max(cantidadAgua) max , fecha fecha_max 
                        from data group by fecha order by fecha desc limit 1) maximos
                    ) `,
    function (err, result) {
      if (err) {
        res.send({
          codigo: "4",
          mensaje: [
            {
              name: "error",
              series: [
                {
                  value: 0,
                  name: "2022-03-15T19:45:58.000Z",
                },
              ],
            },
          ],
        });
      } else {
        res.send({
          codigo: "1",
          mensaje: result[0],
        });
      }
    }
  );
});

app.get("/datos/tiempo-real", async (req, res) => {
  conn.query(
    `
            select * from data order by fecha desc limit 1
         `,
    function (err, result) {
      if (err) {
        res.send({
          codigo: "4",
          mensaje: [
            {
              name: "error",
              series: [
                {
                  value: 0,
                  name: "2022-03-15T19:45:58.000Z",
                },
              ],
            },
          ],
        });
      } else {
        res.send({
          codigo: "1",
          mensaje: result[0],
        });
      }
    }
  );
});
